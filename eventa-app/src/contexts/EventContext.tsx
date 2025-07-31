import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../config/supabase';
import { Database } from '../config/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type Ticket = Database['public']['Tables']['tickets']['Row'];
type Purchase = Database['public']['Tables']['purchases']['Row'];

interface EventContextType {
  events: Event[];
  loading: boolean;
  fetchEvents: (filters?: any) => Promise<void>;
  fetchEventById: (id: string) => Promise<Event | null>;
  createEvent: (event: any) => Promise<any>;
  updateEvent: (id: string, updates: any) => Promise<any>;
  deleteEvent: (id: string) => Promise<any>;
  purchaseTicket: (ticketId: string, quantity: number) => Promise<any>;
  fetchUserTickets: (userId: string) => Promise<Purchase[]>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (filters?: any) => {
    setLoading(true);
    try {
      let query = supabase
        .from('events')
        .select(`
          *,
          users!events_organizer_id_fkey(name, profile_pic),
          tickets(*)
        `)
        .eq('is_published', true)
        .order('start_date', { ascending: true });

      if (filters) {
        if (filters.category) {
          query = query.eq('category', filters.category);
        }
        if (filters.location) {
          query = query.ilike('location', `%${filters.location}%`);
        }
        if (filters.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          users!events_organizer_id_fkey(name, profile_pic, email),
          tickets(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching event:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  };

  const createEvent = async (eventData: any) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) {
        return { error };
      }

      return { data };
    } catch (error) {
      return { error };
    }
  };

  const updateEvent = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      // Update local state
      setEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...data } : event
      ));

      return { data };
    } catch (error) {
      return { error };
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        return { error };
      }

      // Update local state
      setEvents(prev => prev.filter(event => event.id !== id));

      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const purchaseTicket = async (ticketId: string, quantity: number) => {
    try {
      // Generate QR code data
      const qrCode = `ticket_${ticketId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Get ticket info for total amount calculation
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .select('price')
        .eq('id', ticketId)
        .single();

      if (ticketError) {
        return { error: ticketError };
      }

      const totalAmount = ticket.price * quantity;

      const { data, error } = await supabase
        .from('purchases')
        .insert({
          ticket_id: ticketId,
          quantity,
          qr_code: qrCode,
          total_amount: totalAmount,
          payment_status: 'pending',
        })
        .select()
        .single();

      if (error) {
        return { error };
      }

      return { data };
    } catch (error) {
      return { error };
    }
  };

  const fetchUserTickets = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          tickets(*),
          events(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user tickets:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      return [];
    }
  };

  const value = {
    events,
    loading,
    fetchEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    purchaseTicket,
    fetchUserTickets,
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}