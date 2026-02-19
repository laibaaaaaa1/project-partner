import { useState, useCallback } from "react";
import { toast } from "sonner";
import { EDGE_FUNCTIONS, SUPABASE_ANON_KEY } from "@/lib/supabase-config";

export type ActivityType = "activity" | "meal" | "transport" | "accommodation";

export interface TripActivity {
  time: string;
  title: string;
  description: string;
  duration: string;
  cost?: string;
  location?: string;
  type: ActivityType;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: TripActivity[];
}

export interface GeneratedItinerary {
  destination: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  travelers: number;
  budget: number;
  travelStyle: string;
  days: ItineraryDay[];
  packingList: string[];
  tips: string[];
}

export interface TripParams {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  currency?: string;
  travelStyle: string;
}

function calculateTripDays(startDate: string, endDate: string): number {
  return Math.ceil(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  ) + 1;
}

function createItineraryPrompt(params: TripParams): string {
  const days = calculateTripDays(params.startDate, params.endDate);

  const currencyCode = params.currency || 'USD';

  return `Generate a detailed ${days}-day travel itinerary for ${params.destination}.

Trip Details:
- Dates: ${params.startDate} to ${params.endDate} (${days} days)
- Travelers: ${params.travelers} people
- Budget: ${currencyCode} ${params.budget} total
- Currency: ${currencyCode}
- Travel Style: ${params.travelStyle}

Please respond ONLY with valid JSON in this exact format (no markdown, no code blocks, just raw JSON):
{
  "days": [
    {
      "day": 1,
      "date": "${params.startDate}",
      "title": "Arrival & First Impressions",
      "activities": [
        {
          "time": "09:00",
          "title": "Activity Name",
          "description": "Brief description of the activity",
          "duration": "2 hours",
          "cost": "$50",
          "location": "Location name",
          "type": "activity"
        }
      ]
    }
  ],
  "packingList": ["Item 1", "Item 2"],
  "tips": ["Tip 1", "Tip 2"]
}

Types for activities: "activity", "meal", "transport", "accommodation"

Make the itinerary realistic with proper timing. Include meals, key attractions, local experiences, and rest time. Ensure costs are shown in ${currencyCode} and roughly align with the total budget of ${currencyCode} ${params.budget} for ${params.travelers} travelers.`;
}

function parseAIResponse(content: string): { days: ItineraryDay[]; packingList: string[]; tips: string[] } {
  let cleanedContent = content.trim();
  
  // Remove markdown code blocks if present
  if (cleanedContent.startsWith("```json")) {
    cleanedContent = cleanedContent.slice(7);
  } else if (cleanedContent.startsWith("```")) {
    cleanedContent = cleanedContent.slice(3);
  }
  if (cleanedContent.endsWith("```")) {
    cleanedContent = cleanedContent.slice(0, -3);
  }
  cleanedContent = cleanedContent.trim();

  // Find JSON object bounds
  const jsonStart = cleanedContent.indexOf("{");
  const jsonEnd = cleanedContent.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    cleanedContent = cleanedContent.slice(jsonStart, jsonEnd + 1);
  }

  return JSON.parse(cleanedContent);
}

export function useItineraryGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);

  const generateItinerary = useCallback(async (params: TripParams): Promise<GeneratedItinerary | null> => {
    setIsGenerating(true);
    setProgress(10);

    try {
      const prompt = createItineraryPrompt(params);
      
      setProgress(20);

      const response = await fetch(EDGE_FUNCTIONS.travelChat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        }
        if (response.status === 402) {
          throw new Error("AI service quota exceeded. Please try again later.");
        }
        throw new Error(errorData.error || "Failed to generate itinerary");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      setProgress(40);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        // Process line-by-line
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              // Update progress based on content length
              setProgress(Math.min(40 + Math.floor(fullContent.length / 50), 85));
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Handle remaining buffer
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) fullContent += content;
          } catch { /* ignore */ }
        }
      }

      setProgress(90);

      const parsedItinerary = parseAIResponse(fullContent);
      const totalDays = calculateTripDays(params.startDate, params.endDate);

      const result: GeneratedItinerary = {
        destination: params.destination,
        startDate: params.startDate,
        endDate: params.endDate,
        totalDays,
        travelers: params.travelers,
        budget: params.budget,
        travelStyle: params.travelStyle,
        days: parsedItinerary.days || [],
        packingList: parsedItinerary.packingList || [],
        tips: parsedItinerary.tips || [],
      };

      setProgress(100);
      setItinerary(result);
      return result;
    } catch (error) {
      console.error("Itinerary generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate itinerary");
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearItinerary = useCallback(() => {
    setItinerary(null);
    setProgress(0);
  }, []);

  return {
    isGenerating,
    progress,
    itinerary,
    generateItinerary,
    clearItinerary,
  };
}
