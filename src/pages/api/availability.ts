// src/pages/api/availability.ts
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { z } from 'zod';

const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  spaceType: z.enum(['box', 'vr']),
  duration: z.enum(['30', '60']).transform(Number)
});

export const GET: APIRoute = async ({ url }) => {
  try {
    // Parse and validate query parameters
    const params = availabilitySchema.parse({
      date: url.searchParams.get('date'),
      spaceType: url.searchParams.get('spaceType'),
      duration: url.searchParams.get('duration')
    });

    // Récupérer les réservations existantes pour la date
    const { data: existingReservations, error: reservationsError } = await supabase
      .from('reservations')
      .select('*')
      .eq('date', params.date)
      .eq('space_type', params.spaceType)
      .neq('status', 'cancelled');

    if (reservationsError) throw reservationsError;

    // Générer tous les créneaux possibles pour la journée
    const slots = generateTimeSlots(params.duration);

    // Filtrer les créneaux déjà réservés
    const availableSlots = filterAvailableSlots(slots, existingReservations, params.spaceType);

    return new Response(JSON.stringify({ slots: availableSlots }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};