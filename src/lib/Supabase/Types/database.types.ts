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
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          price: number;
          project_id: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          price?: number;
          project_id?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          price?: number;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Capitals_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "Projects";
            referencedColumns: ["id"];
          },
        ];
      };
      Dailys: {
        Row: {
          created_at: string;
          date: string;
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          price: number;
          project_id: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          price?: number;
          project_id?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          price?: number;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Dailys_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "Projects";
            referencedColumns: ["id"];
          },
        ];
      };
      Deposits: {
        Row: {
          created_at: string;
          date: string;
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          preparation_id: number | null;
          price: number;
          sale_id: number | null;
          worker_id: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          preparation_id?: number | null;
          price?: number;
          sale_id?: number | null;
          worker_id?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          preparation_id?: number | null;
          price?: number;
          sale_id?: number | null;
          worker_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Deposits_preparation_id_fkey";
            columns: ["preparation_id"];
            isOneToOne: false;
            referencedRelation: "Preparations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Deposits_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "Sales";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Deposits_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "Workers";
            referencedColumns: ["id"];
          },
        ];
      };
      "Financial Dues": {
        Row: {
          created_at: string;
          date: string;
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          preparation_id: number | null;
          price: number;
          sale_id: number | null;
          worker_id: number | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          preparation_id?: number | null;
          price?: number;
          sale_id?: number | null;
          worker_id?: number | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          preparation_id?: number | null;
          price?: number;
          sale_id?: number | null;
          worker_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Financial Dues_preparation_id_fkey";
            columns: ["preparation_id"];
            isOneToOne: false;
            referencedRelation: "Preparations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Financial Dues_sale_id_fkey";
            columns: ["sale_id"];
            isOneToOne: false;
            referencedRelation: "Sales";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Financial Dues_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "Workers";
            referencedColumns: ["id"];
          },
        ]
      }
      Inbox: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      Income: {
        Row: {
          created_at: string
          date: string | null
          deleted_at: string | null
          id: number
          inbox: number | null
          overall_price: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          deleted_at?: string | null
          id?: number
          inbox?: number | null
          overall_price?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          deleted_at?: string | null
          id?: number
          inbox?: number | null
          overall_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Income_inbox_fkey"
            columns: ["inbox"]
            isOneToOne: false
            referencedRelation: "Inbox"
            referencedColumns: ["id"]
          },
        ];
      };
      Outcome: {
        Row: {
          created_at: string
          date: string | null
          deleted_at: string | null
          id: number
          inbox: number | null
          overall_price: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          deleted_at?: string | null
          id?: number
          inbox?: number | null
          overall_price?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          deleted_at?: string | null
          id?: number
          inbox?: number | null
          overall_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Outcome_inbox_fkey"
            columns: ["inbox"]
            isOneToOne: false
            referencedRelation: "Inbox"
            referencedColumns: ["id"]
          },
        ];
      };
      Preparations: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          project_id: number | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          project_id?: number | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Preparations_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "Projects";
            referencedColumns: ["id"];
          },
        ];
      };
      Projects: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          image: string | null;
          name: string | null;
          status: Database["public"]["Enums"]["Project_Status"] | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          status?: Database["public"]["Enums"]["Project_Status"] | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          image?: string | null;
          name?: string | null;
          status?: Database["public"]["Enums"]["Project_Status"] | null;
        };
        Relationships: [];
      };
      Revenues: {
        Row: {
          created_at: string;
          id: number;
          income: number | null;
          prior_income: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          income?: number | null;
          prior_income?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          income?: number | null;
          prior_income?: number | null;
        };
        Relationships: [];
      };
      Roles: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Sales: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          description: string | null;
          id: number;
          image: string | null;
          project_id: number | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          project_id?: number | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          description?: string | null;
          id?: number;
          image?: string | null;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Sales_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "Projects";
            referencedColumns: ["id"];
          },
        ];
      };
      Users: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          email: string | null;
          id: number;
          name: string | null;
          phone: string;
          role: number | null;
          user_uid: string | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string | null;
          phone: string;
          role?: number | null;
          user_uid?: string | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string | null;
          phone?: string;
          role?: number | null;
          user_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Users_role_fkey";
            columns: ["role"];
            isOneToOne: false;
            referencedRelation: "Roles";
            referencedColumns: ["id"];
          },
        ]
      }
      Workers: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          image: string | null;
          name: string;
          project_id: number | null;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          image?: string | null;
          name?: string;
          project_id?: number | null;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          image?: string | null;
          name?: string;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Workers_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "Projects";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_income: {
        Args: {
          project_id_input: number;
        };
        Returns: undefined;
      };
      calculate_outcome: {
        Args: {
          project_id_input: number;
        };
        Returns: undefined;
      };
      calculate_total_price: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      count_and_sum_financials_by_sales: {
        Args: {
          sale_ids: number[];
        };
        Returns: {
          sale_id: number;
          financial_count: number;
          total_price: number;
        }[];
      };
      count_deposits_by_preparations: {
        Args: {
          preparation_ids: number[];
        };
        Returns: {
          preparation_id: number;
          deposit_count: number;
          total_price: number;
        }[];
      };
      count_deposits_by_sales: {
        Args: {
          sale_ids: number[];
        };
        Returns: {
          sale_id: number;
          deposit_count: number;
          total_price: number;
        }[];
      };
      count_deposits_by_workers: {
        Args: {
          worker_ids: number[];
        };
        Returns: {
          worker_id: number;
          deposit_count: number;
          total_price: number;
        }[];
      };
      count_financials_by_preparations: {
        Args: {
          preparation_ids: number[];
        };
        Returns: {
          preparation_id: number;
          financial_count: number;
          total_price: number;
        }[];
      };
      count_financials_by_sales: {
        Args: {
          sale_ids: number[];
        };
        Returns: {
          sale_id: number;
          financial_count: number;
          total_price: number;
        }[];
      };
      count_financials_by_workers: {
        Args: {
          worker_ids: number[];
        };
        Returns: {
          worker_id: number;
          financial_count: number;
          total_price: number;
        }[];
      };
      overall_deposits_by_project_for_preparations: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
      overall_deposits_by_project_for_sales: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
      overall_deposits_by_project_for_workers: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
      overall_financials_by_project: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
      overall_financials_by_project_for_preparations: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
      overall_financials_by_project_for_sales: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
      overall_financials_by_project_for_workers: {
        Args: {
          p_project_id: number;
        };
        Returns: {
          overall_total_price: number;
          overall_count: number;
        }[];
      };
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
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
