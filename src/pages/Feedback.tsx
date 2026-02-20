import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MessageSquare,
  Map,
  Sparkles,
  Send,
  Bug,
  Lightbulb,
  Heart,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateAppFeedback,
  useCreateDestinationReview,
  useCreateItineraryFeedback,
  useAppFeedback,
} from "@/hooks/useFeedback";

function StarRating({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-9 w-9" };
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}>
          <Star
            className={`${sizeMap[size]} transition-colors ${
              star <= value
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function AppFeedbackForm() {
  const { user } = useAuth();
  const createFeedback = useCreateAppFeedback();
  const { data: pastFeedback } = useAppFeedback();
  const [category, setCategory] = useState("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    { value: "bug", label: "Bug Report", icon: Bug },
    { value: "feature", label: "Feature Request", icon: Lightbulb },
    { value: "general", label: "General", icon: MessageSquare },
    { value: "appreciation", label: "Love it!", icon: Heart },
  ];

  const handleSubmit = () => {
    if (!user || !subject.trim() || !message.trim()) return;
    createFeedback.mutate(
      {
        user_id: user.id,
        category,
        subject: subject.trim(),
        message: message.trim(),
        rating: rating || null,
      },
      {
        onSuccess: () => {
          setSubject("");
          setMessage("");
          setRating(0);
          setCategory("general");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="space-y-2">
        <Label>Category</Label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                category === cat.value
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label>Overall Experience (optional)</Label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Brief summary..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us more..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!subject.trim() || !message.trim() || createFeedback.isPending}
        className="w-full"
      >
        {createFeedback.isPending ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Send className="h-4 w-4 mr-2" />
        )}
        Submit Feedback
      </Button>

      {/* Past Feedback */}
      {pastFeedback && pastFeedback.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground">Your Past Feedback</h3>
          {pastFeedback.map((fb) => (
            <div key={fb.id} className="p-3 rounded-xl border border-border bg-muted/30 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{fb.subject}</span>
                <Badge variant="outline" className="text-xs capitalize">{fb.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{fb.message}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(fb.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DestinationReviewForm() {
  const { user } = useAuth();
  const createReview = useCreateDestinationReview();
  const [destinationName, setDestinationName] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tips, setTips] = useState("");
  const [visitDate, setVisitDate] = useState("");

  const handleSubmit = () => {
    if (!user || !destinationName.trim() || rating === 0) return;
    createReview.mutate(
      {
        user_id: user.id,
        destination_name: destinationName.trim(),
        rating,
        title: title.trim() || null,
        content: content.trim() || null,
        tips: tips.trim() || null,
        visit_date: visitDate || null,
      },
      {
        onSuccess: () => {
          setDestinationName("");
          setRating(0);
          setTitle("");
          setContent("");
          setTips("");
          setVisitDate("");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="dest-name">Destination</Label>
        <Input
          id="dest-name"
          placeholder="e.g., Tokyo, Japan"
          value={destinationName}
          onChange={(e) => setDestinationName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-title">Review Title (optional)</Label>
        <Input
          id="review-title"
          placeholder="Sum up your experience..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-content">Your Review</Label>
        <Textarea
          id="review-content"
          placeholder="What was your experience like?"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tips">Travel Tips (optional)</Label>
        <Textarea
          id="tips"
          placeholder="Any tips for future travelers?"
          rows={2}
          value={tips}
          onChange={(e) => setTips(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visit-date">Visit Date (optional)</Label>
        <Input
          id="visit-date"
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!destinationName.trim() || rating === 0 || createReview.isPending}
        className="w-full"
      >
        {createReview.isPending ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Send className="h-4 w-4 mr-2" />
        )}
        Submit Review
      </Button>
    </div>
  );
}

function ItineraryFeedbackForm() {
  const { user } = useAuth();
  const createFeedback = useCreateItineraryFeedback();
  const [rating, setRating] = useState(0);
  const [accuracyRating, setAccuracyRating] = useState(0);
  const [helpfulnessRating, setHelpfulnessRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!user || rating === 0) return;
    createFeedback.mutate(
      {
        user_id: user.id,
        trip_id: null,
        rating,
        accuracy_rating: accuracyRating || null,
        helpfulness_rating: helpfulnessRating || null,
        comment: comment.trim() || null,
      },
      {
        onSuccess: () => {
          setRating(0);
          setAccuracyRating(0);
          setHelpfulnessRating(0);
          setComment("");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-sm text-muted-foreground">
          Help us improve our AI-generated itineraries by sharing your experience.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Overall AI Quality</Label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      <div className="space-y-2">
        <Label>Accuracy of Suggestions</Label>
        <StarRating value={accuracyRating} onChange={setAccuracyRating} />
      </div>

      <div className="space-y-2">
        <Label>Helpfulness</Label>
        <StarRating value={helpfulnessRating} onChange={setHelpfulnessRating} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ai-comment">Additional Comments</Label>
        <Textarea
          id="ai-comment"
          placeholder="What could be improved?"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || createFeedback.isPending}
        className="w-full"
      >
        {createFeedback.isPending ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4 mr-2" />
        )}
        Submit AI Feedback
      </Button>
    </div>
  );
}

export default function Feedback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-border pt-safe">
        <div className="flex items-center gap-4 h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display text-lg font-semibold">Feedback</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Tabs defaultValue="app" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="app" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              App
            </TabsTrigger>
            <TabsTrigger value="destination" className="text-xs">
              <Map className="h-3 w-3 mr-1" />
              Destinations
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Quality
            </TabsTrigger>
          </TabsList>

          <TabsContent value="app" className="mt-6">
            <AppFeedbackForm />
          </TabsContent>

          <TabsContent value="destination" className="mt-6">
            <DestinationReviewForm />
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <ItineraryFeedbackForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
