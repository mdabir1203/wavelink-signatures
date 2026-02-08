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
      contracts: {
        Row: {
          access_token: string
          ambassador_email: string | null
          ambassador_gov_id: string | null
          ambassador_name: string | null
          ambassador_organization: string | null
          ambassador_signature_data: string | null
          ambassador_signed_at: string | null
          ambassador_tax_id: string | null
          ambassador_title: string | null
          company_email: string
          company_name: string
          company_organization: string
          company_signature_data: string | null
          company_signed_at: string | null
          company_title: string
          contract_id: string
          created_at: string
          id: string
          ip_address: string | null
          status: Database["public"]["Enums"]["contract_status"]
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          access_token?: string
          ambassador_email?: string | null
          ambassador_gov_id?: string | null
          ambassador_name?: string | null
          ambassador_organization?: string | null
          ambassador_signature_data?: string | null
          ambassador_signed_at?: string | null
          ambassador_tax_id?: string | null
          ambassador_title?: string | null
          company_email?: string
          company_name?: string
          company_organization?: string
          company_signature_data?: string | null
          company_signed_at?: string | null
          company_title?: string
          contract_id: string
          created_at?: string
          id?: string
          ip_address?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          access_token?: string
          ambassador_email?: string | null
          ambassador_gov_id?: string | null
          ambassador_name?: string | null
          ambassador_organization?: string | null
          ambassador_signature_data?: string | null
          ambassador_signed_at?: string | null
          ambassador_tax_id?: string | null
          ambassador_title?: string | null
          company_email?: string
          company_name?: string
          company_organization?: string
          company_signature_data?: string | null
          company_signed_at?: string | null
          company_title?: string
          contract_id?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          status?: Database["public"]["Enums"]["contract_status"]
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      contracts_public: {
        Row: {
          access_token: string | null
          ambassador_email: string | null
          ambassador_name: string | null
          ambassador_organization: string | null
          ambassador_signed_at: string | null
          ambassador_title: string | null
          company_email: string | null
          company_name: string | null
          company_organization: string | null
          company_signed_at: string | null
          company_title: string | null
          contract_id: string | null
          created_at: string | null
          id: string | null
          status: Database["public"]["Enums"]["contract_status"] | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          ambassador_email?: string | null
          ambassador_name?: string | null
          ambassador_organization?: string | null
          ambassador_signed_at?: string | null
          ambassador_title?: string | null
          company_email?: string | null
          company_name?: string | null
          company_organization?: string | null
          company_signed_at?: string | null
          company_title?: string | null
          contract_id?: string | null
          created_at?: string | null
          id?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          ambassador_email?: string | null
          ambassador_name?: string | null
          ambassador_organization?: string | null
          ambassador_signed_at?: string | null
          ambassador_title?: string | null
          company_email?: string | null
          company_name?: string | null
          company_organization?: string | null
          company_signed_at?: string | null
          company_title?: string | null
          contract_id?: string | null
          created_at?: string | null
          id?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contract_status: "draft" | "pending" | "signed" | "terminated"
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
      contract_status: ["draft", "pending", "signed", "terminated"],
    },
  },
} as const
