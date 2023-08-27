export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      recipe: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          ingredients: string[] | null
          instructions: string[] | null
          name: string | null
          recipe_yield: string | null
          total_time: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          instructions?: string[] | null
          name?: string | null
          recipe_yield?: string | null
          total_time?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          instructions?: string[] | null
          name?: string | null
          recipe_yield?: string | null
          total_time?: string | null
        }
        Relationships: []
      }
      recipe_category: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          recipe_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          recipe_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_category_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_category_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
