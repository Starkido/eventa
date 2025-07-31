export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'attendee' | 'organizer' | 'admin';
          profile_pic?: string;
          is_verified: boolean;
          status: 'active' | 'suspended' | 'pending';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: 'attendee' | 'organizer' | 'admin';
          profile_pic?: string;
          is_verified?: boolean;
          status?: 'active' | 'suspended' | 'pending';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: 'attendee' | 'organizer' | 'admin';
          profile_pic?: string;
          is_verified?: boolean;
          status?: 'active' | 'suspended' | 'pending';
          updated_at?: string;
        };
      };
      organizer_applications: {
        Row: {
          id: string;
          user_id: string;
          org_name: string;
          bio: string;
          gov_id_url?: string;
          status: 'pending' | 'approved' | 'rejected';
          reviewed_at?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          org_name: string;
          bio: string;
          gov_id_url?: string;
          status?: 'pending' | 'approved' | 'rejected';
          reviewed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          org_name?: string;
          bio?: string;
          gov_id_url?: string;
          status?: 'pending' | 'approved' | 'rejected';
          reviewed_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          organizer_id: string;
          title: string;
          description: string;
          category: string;
          location: string;
          map_lat?: number;
          map_long?: number;
          start_date: string;
          end_date: string;
          banner_url?: string;
          tickets_available: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organizer_id: string;
          title: string;
          description: string;
          category: string;
          location: string;
          map_lat?: number;
          map_long?: number;
          start_date: string;
          end_date: string;
          banner_url?: string;
          tickets_available?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organizer_id?: string;
          title?: string;
          description?: string;
          category?: string;
          location?: string;
          map_lat?: number;
          map_long?: number;
          start_date?: string;
          end_date?: string;
          banner_url?: string;
          tickets_available?: number;
          is_published?: boolean;
          updated_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          event_id: string;
          name: string;
          price: number;
          total_quantity: number;
          sold_quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          name: string;
          price: number;
          total_quantity: number;
          sold_quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          name?: string;
          price?: number;
          total_quantity?: number;
          sold_quantity?: number;
        };
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          ticket_id: string;
          quantity: number;
          payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
          qr_code: string;
          total_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          ticket_id: string;
          quantity: number;
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
          qr_code: string;
          total_amount: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          ticket_id?: string;
          quantity?: number;
          payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
          qr_code?: string;
          total_amount?: number;
        };
      };
      checkins: {
        Row: {
          id: string;
          purchase_id: string;
          event_id: string;
          checked_in_time: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          purchase_id: string;
          event_id: string;
          checked_in_time?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          purchase_id?: string;
          event_id?: string;
          checked_in_time?: string;
        };
      };
      analytics: {
        Row: {
          id: string;
          event_id: string;
          views: number;
          clicks: number;
          checkins: number;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          views?: number;
          clicks?: number;
          checkins?: number;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          views?: number;
          clicks?: number;
          checkins?: number;
          date?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}