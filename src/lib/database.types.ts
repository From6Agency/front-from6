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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      advisory_services: {
        Row: {
          created_at: string
          description: string
          description_fr: string
          display_order: number
          id: string
          published: boolean
          title: string
          title_fr: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_fr: string
          display_order?: number
          id?: string
          published?: boolean
          title: string
          title_fr: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_fr?: string
          display_order?: number
          id?: string
          published?: boolean
          title?: string
          title_fr?: string
          updated_at?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          category: Database["public"]["Enums"]["article_category"]
          content: string
          content_fr: string
          created_at: string | null
          excerpt: string
          excerpt_fr: string
          featured_image: string | null
          id: string
          published: boolean | null
          slug: string
          title: string
          title_fr: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["article_category"]
          content: string
          content_fr: string
          created_at?: string | null
          excerpt: string
          excerpt_fr: string
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug: string
          title: string
          title_fr: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["article_category"]
          content?: string
          content_fr?: string
          created_at?: string | null
          excerpt?: string
          excerpt_fr?: string
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug?: string
          title?: string
          title_fr?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          document_url: string | null
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          document_url?: string | null
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          company?: string | null
          created_at?: string
          document_url?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      featured_videos: {
        Row: {
          created_at: string
          description: string
          description_fr: string
          display_order: number | null
          id: string
          published: boolean
          start_seconds: number | null
          title: string
          title_fr: string
          updated_at: string
          youtube_url: string
        }
        Insert: {
          created_at?: string
          description?: string
          description_fr?: string
          display_order?: number | null
          id?: string
          published?: boolean
          start_seconds?: number | null
          title: string
          title_fr: string
          updated_at?: string
          youtube_url: string
        }
        Update: {
          created_at?: string
          description?: string
          description_fr?: string
          display_order?: number | null
          id?: string
          published?: boolean
          start_seconds?: number | null
          title?: string
          title_fr?: string
          updated_at?: string
          youtube_url?: string
        }
        Relationships: []
      }
      media_opportunities: {
        Row: {
          created_at: string
          date: string | null
          description: string
          description_fr: string
          id: string
          organization: string | null
          organization_fr: string | null
          published: boolean
          title: string
          title_fr: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          description: string
          description_fr: string
          id?: string
          organization?: string | null
          organization_fr?: string | null
          published?: boolean
          title: string
          title_fr: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string
          description_fr?: string
          id?: string
          organization?: string | null
          organization_fr?: string | null
          published?: boolean
          title?: string
          title_fr?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_companies: {
        Row: {
          created_at: string | null
          description: string
          description_fr: string
          display_order: number | null
          id: string
          logo_url: string | null
          my_role: string | null
          name: string
          project_video_url: string | null
          published: boolean | null
          role: string | null
          stage_year: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          description_fr: string
          display_order?: number | null
          id?: string
          logo_url?: string | null
          my_role?: string | null
          name: string
          project_video_url?: string | null
          published?: boolean | null
          role?: string | null
          stage_year?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          description_fr?: string
          display_order?: number | null
          id?: string
          logo_url?: string | null
          my_role?: string | null
          name?: string
          project_video_url?: string | null
          published?: boolean | null
          role?: string | null
          stage_year?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_en: string
          content_fr: string
          created_at: string
          id: string
          image_settings: Json | null
          image_url: string | null
          key: string
          published: boolean
          section: string
          updated_at: string
        }
        Insert: {
          content_en: string
          content_fr: string
          created_at?: string
          id?: string
          image_settings?: Json | null
          image_url?: string | null
          key: string
          published?: boolean
          section: string
          updated_at?: string
        }
        Update: {
          content_en?: string
          content_fr?: string
          created_at?: string
          id?: string
          image_settings?: Json | null
          image_url?: string | null
          key?: string
          published?: boolean
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_secrets: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "editor"
      article_category: "insights" | "case_studies" | "founder_notes"
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
    Enums: {
      app_role: ["admin", "editor"],
      article_category: ["insights", "case_studies", "founder_notes"],
    },
  },
} as const
