// src/pages/api/reservations.ts
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { z } from 'zod';

const reservationSchema = z.object({
  customerName: z.string().min(2),
  phoneNumber: z.string().min(10),
  email: z.string().email(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  duration: z.enum(['30', '60']).transform(Number),
  numberOfPeople: z.number().min(1).max(4),
  spaceType: z.enum(['box', 'vr']),
  boxNumbers: z.array(z.number()).optional()
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const validatedData = reservationSchema.parse(data);

    // Vérifier la disponibilité
    const isAvailable = await checkAvailability(validatedData);
    if (!isAvailable) {
      throw new Error('Ce créneau n\'est plus disponible');
    }

    // Calculer le prix
    const price = calculatePrice(validatedData.duration, validatedData.numberOfPeople);

    // Créer la réservation
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert([
        {
          ...validatedData,
          price,
          status: 'confirmed'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(reservation), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
