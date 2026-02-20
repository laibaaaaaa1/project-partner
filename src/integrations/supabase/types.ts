export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          address: string | null
          booking_reference: string | null
          booking_url: string | null
          category: string
          cost: number | null
          created_at: string
          currency: string
          description: string | null
          destination_id: string
          duration_minutes: number | null
          end_time: string | null
          id: string
          is_booked: boolean
          latitude: number | null
          location_name: string | null
          longitude: number | null
          notes: string | null
          order_index: number
          start_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          booking_reference?: string | null
          booking_url?: string | null
          category?: string
          cost?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          destination_id: string
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          is_booked?: boolean
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          notes?: string | null
          order_index?: number
          start_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          booking_reference?: string | null
          booking_url?: string | null
          category?: string
          cost?: number | null
          created_at?: string
          currency?: string
          description?: string | null
          destination_id?: string
          duration_minutes?: number | null
          end_time?: string | null
          id?: string
          is_booked?: boolean
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          notes?: string | null
          order_index?: number
          start_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          address: string | null
          country: string | null
          created_at: string
          end_date: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          notes: string | null
          order_index: number
          start_date: string | null
          trip_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          country?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          notes?: string | null
          order_index?: number
          start_date?: string | null
          trip_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          country?: string | null
          created_at?: string
          end_date?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          notes?: string | null
          order_index?: number
          start_date?: string | null
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "destinations_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          activity_id: string | null
          amount: number
          category: string
          created_at: string
          currency: string
          date: string
          description: string | null
          id: string
          receipt_url: string | null
          trip_id: string
          updated_at: string
        }
        Insert: {
          activity_id?: string | null
          amount: number
          category?: string
          created_at?: string
          currency?: string
          date: string
          description?: string | null
          id?: string
          receipt_url?: string | null
          trip_id: string
          updated_at?: string
        }
        Update: {
          activity_id?: string | null
          amount?: number
          category?: string
          created_at?: string
          currency?: string
          date?: string
          description?: string | null
          id?: string
          receipt_url?: string | null
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_feedback: {
        Row: {
          accuracy_rating: number | null
          comment: string | null
          created_at: string
          helpfulness_rating: number | null
          id: string
          rating: number
          trip_id: string | null
          user_id: string
        }
        Insert: {
          accuracy_rating?: number | null
          comment?: string | null
          created_at?: string
          helpfulness_rating?: number | null
          id?: string
          rating: number
          trip_id?: string | null
          user_id: string
        }
        Update: {
          accuracy_rating?: number | null
          comment?: string | null
          created_at?: string
          helpfulness_rating?: number | null
          id?: string
          rating?: number
          trip_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_feedback_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      packing_items: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_essential: boolean
          is_packed: boolean
          name: string
          order_index: number
          packing_list_id: string
          quantity: number
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_essential?: boolean
          is_packed?: boolean
          name: string
          order_index?: number
          packing_list_id: string
          quantity?: number
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_essential?: boolean
          is_packed?: boolean
          name?: string
          order_index?: number
          packing_list_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "packing_items_packing_list_id_fkey"
            columns: ["packing_list_id"]
            isOneToOne: false
            referencedRelation: "packing_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      packing_lists: {
        Row: {
          created_at: string
          id: string
          name: string
          trip_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          trip_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "packing_lists_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trip_collaborators: {
        Row: {
          accepted_at: string | null
          email: string
          id: string
          invitation_status: string
          invited_at: string
          invited_by: string | null
          role: string
          trip_id: string
          user_id: string | null
        }
        Insert: {
          accepted_at?: string | null
          email: string
          id?: string
          invitation_status?: string
          invited_at?: string
          invited_by?: string | null
          role?: string
          trip_id: string
          user_id?: string | null
        }
        Update: {
          accepted_at?: string | null
          email?: string
          id?: string
          invitation_status?: string
          invited_at?: string
          invited_by?: string | null
          role?: string
          trip_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trip_collaborators_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_collaborators_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_comments: {
        Row: {
          activity_id: string | null
          content: string
          created_at: string
          destination_id: string | null
          id: string
          parent_comment_id: string | null
          trip_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_id?: string | null
          content: string
          created_at?: string
          destination_id?: string | null
          id?: string
          parent_comment_id?: string | null
          trip_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_id?: string | null
          content?: string
          created_at?: string
          destination_id?: string | null
          id?: string
          parent_comment_id?: string | null
          trip_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_comments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_comments_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "trip_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_comments_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          budget: number | null
          cover_image_url: string | null
          created_at: string
          currency: string
          description: string | null
          end_date: string
          id: string
          privacy: string
          start_date: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: number | null
          cover_image_url?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          end_date: string
          id?: string
          privacy?: string
          start_date: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: number | null
          cover_image_url?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          end_date?: string
          id?: string
          privacy?: string
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          accommodation_preferences: string[] | null
          activity_preferences: string[] | null
          budget_range: string | null
          created_at: string
          id: string
          travel_frequency: string | null
          travel_styles: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          accommodation_preferences?: string[] | null
          activity_preferences?: string[] | null
          budget_range?: string | null
          created_at?: string
          id?: string
          travel_frequency?: string | null
          travel_styles?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          accommodation_preferences?: string[] | null
          activity_preferences?: string[] | null
          budget_range?: string | null
          created_at?: string
          id?: string
          travel_frequency?: string | null
          travel_styles?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_trip_access: {
        Args: { _trip_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
