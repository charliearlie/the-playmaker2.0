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
      Category: {
        Row: {
          description: string
          group_id: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          description: string
          group_id?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          description?: string
          group_id?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Category_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "Group"
            referencedColumns: ["id"]
          }
        ]
      }
      ForgotPassword: {
        Row: {
          email: string
          expiration: string
          token: string
        }
        Insert: {
          email: string
          expiration: string
          token: string
        }
        Update: {
          email?: string
          expiration?: string
          token?: string
        }
        Relationships: []
      }
      Group: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      Post: {
        Row: {
          content: string
          createdAt: string
          id: string
          topic_id: string | null
          updatedAt: string
        }
        Insert: {
          content: string
          createdAt?: string
          id?: string
          topic_id?: string | null
          updatedAt: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          topic_id?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Post_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "Topic"
            referencedColumns: ["id"]
          }
        ]
      }
      PostLike: {
        Row: {
          id: string
          likeStatus: Database["public"]["Enums"]["LikeStatus"]
          post_id: string
          user_id: string
        }
        Insert: {
          id?: string
          likeStatus: Database["public"]["Enums"]["LikeStatus"]
          post_id: string
          user_id: string
        }
        Update: {
          id?: string
          likeStatus?: Database["public"]["Enums"]["LikeStatus"]
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "PostLike_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "Post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PostLike_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Topic: {
        Row: {
          category_id: string | null
          createdAt: string
          id: string
          slug: string
          title: string
          updatedAt: string
          views: number
        }
        Insert: {
          category_id?: string | null
          createdAt?: string
          id?: string
          slug: string
          title: string
          updatedAt: string
          views: number
        }
        Update: {
          category_id?: string | null
          createdAt?: string
          id?: string
          slug?: string
          title?: string
          updatedAt?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "Topic_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "Category"
            referencedColumns: ["id"]
          }
        ]
      }
      TopicLike: {
        Row: {
          id: string
          like_status: Database["public"]["Enums"]["LikeStatus"]
          topic_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          like_status: Database["public"]["Enums"]["LikeStatus"]
          topic_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          like_status?: Database["public"]["Enums"]["LikeStatus"]
          topic_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "TopicLike_topic_id_fkey"
            columns: ["topic_id"]
            referencedRelation: "Topic"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "TopicLike_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          active: boolean
          avatarUrl: string | null
          createdAt: string
          email: string
          feedbackScore: number | null
          id: string
          password: string
          role: Database["public"]["Enums"]["Role"]
          updatedAt: string
          username: string
        }
        Insert: {
          active?: boolean
          avatarUrl?: string | null
          createdAt?: string
          email: string
          feedbackScore?: number | null
          id?: string
          password: string
          role?: Database["public"]["Enums"]["Role"]
          updatedAt: string
          username: string
        }
        Update: {
          active?: boolean
          avatarUrl?: string | null
          createdAt?: string
          email?: string
          feedbackScore?: number | null
          id?: string
          password?: string
          role?: Database["public"]["Enums"]["Role"]
          updatedAt?: string
          username?: string
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
      LikeStatus: "UPVOTE" | "DOWNVOTE"
      Role: "USER" | "ADMIN" | "MODERATOR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
