// src/lib/utils/time.ts
import { supabase } from '../../lib/supabase';

export function generateTimeSlots(duration: number) {
    const slots = [];
    const start = new Date();
    start.setHours(14, 0, 0, 0); // 14:00
    const end = new Date();
    end.setHours(22, 0, 0, 0);   // 22:00
  
    while (start < end) {
      slots.push(start.toTimeString().slice(0, 5));
      start.setMinutes(start.getMinutes() + duration + 15); // +15min de battement
    }
  
    return slots;
  }
  
  export function filterAvailableSlots(slots: string[], existingReservations: any[], spaceType: string) {
    return slots.filter(slot => {
      const conflictingReservations = existingReservations.filter(reservation => {
        return reservation.start_time === slot;
      });
  
      if (spaceType === 'box') {
        return conflictingReservations.length < 6; // 6 boxes disponibles
      } else {
        return conflictingReservations.length === 0; // Espace VR : une seule réservation à la fois
      }
    });
  }
  
  export function calculatePrice(duration: number, numberOfPeople: number): number {
    if (duration === 30) {
      return 18 * numberOfPeople;
    }
  
    // Pour 1h
    if (numberOfPeople <= 2) return 29 * numberOfPeople;
    if (numberOfPeople <= 4) return 27 * numberOfPeople;
    return 25 * numberOfPeople;
  }
  
  // Fonction utilitaire pour vérifier la disponibilité
  async function checkAvailability(data: any) {
    const { data: conflictingReservations, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('date', data.date)
      .eq('start_time', data.startTime)
      .eq('space_type', data.spaceType)
      .neq('status', 'cancelled');
  
    if (error) throw error;
  
    if (data.spaceType === 'box') {
      return conflictingReservations.length < 6;
    } else {
      return conflictingReservations.length === 0;
    }
  }