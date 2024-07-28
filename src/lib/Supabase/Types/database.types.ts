export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Capitals: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          description: string | null
          id: number
          price: number
          project_id: number | null
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          price?: number
          project_id?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          price?: number
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Capitals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Dailys: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          description: string | null
          id: number
          price: number
          project_id: number | null
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          price?: number
          project_id?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          price?: number
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Dailys_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Deposits: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          description: string | null
          id: number
          preparation_id: number | null
          price: number
          sale_id: number | null
          worker_id: number | null
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          preparation_id?: number | null
          price?: number
          sale_id?: number | null
          worker_id?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          preparation_id?: number | null
          price?: number
          sale_id?: number | null
          worker_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Deposits_preparation_id_fkey"
            columns: ["preparation_id"]
            isOneToOne: false
            referencedRelation: "Preparations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Deposits_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "Sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Deposits_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "Workers"
            referencedColumns: ["id"]
          },
        ]
      }
      "Financial Dues": {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          description: string | null
          id: number
          preparation_id: number | null
          price: number
          sale_id: number | null
          worker_id: number | null
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          preparation_id?: number | null
          price?: number
          sale_id?: number | null
          worker_id?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          preparation_id?: number | null
          price?: number
          sale_id?: number | null
          worker_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Financial Dues_preparation_id_fkey"
            columns: ["preparation_id"]
            isOneToOne: false
            referencedRelation: "Preparations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Financial Dues_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "Sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Financial Dues_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "Workers"
            referencedColumns: ["id"]
          },
        ]
      }
      Preparations: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          project_id: number | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          project_id?: number | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Preparations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Projects: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string | null
          status: Database["public"]["Enums"]["Project_Status"] | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string | null
          status?: Database["public"]["Enums"]["Project_Status"] | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string | null
          status?: Database["public"]["Enums"]["Project_Status"] | null
        }
        Relationships: []
      }
      Roles: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      Sales: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          project_id: number | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          project_id?: number | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Sales_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          deleted_at: string | null
          email: string | null
          id: number
          name: string | null
          phone: string
          role: number | null
          user_uid: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone: string
          role?: number | null
          user_uid: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: number
          name?: string | null
          phone?: string
          role?: number | null
          user_uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "Users_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "Roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Users_user_uid_fkey"
            columns: ["user_uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Workers: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          name: string
          project_id: number | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
          project_id?: number | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
          project_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Workers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "Projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      count_deposits_by_sales: {
        Args: {
          sale_ids: number[]
        }
        Returns: {
          sale_id: number
          deposit_count: number
        }[]
      }
      count_financials_by_sales: {
        Args: {
          sale_ids: number[]
        }
        Returns: {
          sale_id: number
          financial_count: number
        }[]
      }
    }
    Enums: {
      Project_Status: "Stopped" | "Failed" | "In Progress" | "Done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
