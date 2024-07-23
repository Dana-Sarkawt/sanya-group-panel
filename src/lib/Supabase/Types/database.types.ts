export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      Capitals: {
        Row: {
          created_at: string;
          date: string;
          description: string | null;
          id: number;
          price: number;
        };
        Insert: {
          created_at?: string;
          date: string;
          description?: string | null;
          id?: number;
          price?: number;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: number;
          price?: number;
        };
        Relationships: [];
      };
      Deposits: {
        Row: {
          created_at: string;
          date: string;
          description: string | null;
          id: number;
          price: number;
          sale_id: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          description?: string | null;
          id?: number;
          price?: number;
          sale_id?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: number;
          price?: number;
          sale_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Deposits_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "Sales";
            referencedColumns: ["id"];
          },
        ];
      };
      "Financial Dues": {
        Row: {
          created_at: string;
          date: string;
          description: string | null;
          id: number;
          price: number;
          sale_id: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          description?: string | null;
          id?: number;
          price?: number;
          sale_id?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: number;
          price?: number;
          sale_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Financial Dues_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "Sales";
            referencedColumns: ["id"];
          },
        ];
      };
      Projects: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          status: Database["public"]["Enums"]["Project_Status"] | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          status?: Database["public"]["Enums"]["Project_Status"] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          status?: Database["public"]["Enums"]["Project_Status"] | null;
        };
        Relationships: [];
      };
      Roles: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Sales: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
        };
        Relationships: [];
      };
      Users: {
        Row: {
          created_at: string;
          email: string | null;
          id: number;
          name: string | null;
          phone: string;
          role: number | null;
          user_uid: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          phone: string;
          role?: number | null;
          user_uid: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: number;
          name?: string | null;
          phone?: string;
          role?: number | null;
          user_uid?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Users_role_fkey";
            columns: ["role"];
            isOneToOne: false;
            referencedRelation: "Roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Users_user_uid_fkey";
            columns: ["user_uid"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Project_Status: "Stopped" | "Failed" | "In Progress" | "Done";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;
