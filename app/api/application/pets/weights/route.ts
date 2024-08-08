// app/api/pets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createPet, getPetsByUser } from '@/services/firebase/pet/pet_service';
import { PetForm } from '@/types/Pets';
import { fetchTokens } from '@/utils/tokens';
import { addPetWeight, getPetWeights } from '@/services/firebase/pet/weight_service';
import { Weight } from '@/types/Weight';
import { sortByDate } from '@/utils/convert';

// Error handling utility
const handleErrorResponse = (error: unknown, message: string) => {
  console.error(message, error instanceof Error ? error.message : String(error));
  return NextResponse.json({ error: message }, { status: 500 });
};

// POST handler
export async function POST(request: NextRequest) {
  try {
      const { userId } = await fetchTokens();
            const petId = request.headers.get('X-Pet-Id') || '';


    if (!userId) return Response.json({ error: 'User ID is missing' }, { status: 400 });
    
    const data = await request.json();
    
    await addPetWeight(userId,petId, data);
    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    return handleErrorResponse(error, 'Error creating pet');
  }
}

// // GET handler
export async function GET(request: NextRequest) {
  try {
    const { userId } = await fetchTokens();      
    const petId = request.headers.get('X-Pet-Id') || '';

    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const weights = await getPetWeights(userId, petId);

    const selectedProperties: Weight[] = weights.map(weight => ({
      date: weight.date,
      value: weight.weight,
      unit: weight.unit  
     }));

    return NextResponse.json(sortByDate(selectedProperties, "date"));
  } catch (error: unknown) {
    return handleErrorResponse(error, 'Error fetching pets');
  }
}


