"use server";
import { Pet, PetForm } from '@/types/Pets';
import { endpoints, methods } from '@/config/api-config';
import { fetchTokens } from '@/utils/tokens';

export async function fetchPets(): Promise<Pet[]> {
  const { userId } = await fetchTokens();
  const response = await fetch(endpoints.pets.list, {
    method: methods.get,
    headers: {
      'Content-Type': 'application/json',
      "X-User-Id": userId || '',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching pets: ${response.statusText}`);
  }

  return response.json();
}

export async function createPet(data: PetForm): Promise<void> {
    const { userId } = await fetchTokens();
  const response = await fetch(endpoints.pets.create, {
    method: methods.post,
    headers: {
      'Content-Type': 'application/json',
            "X-User-Id": userId || '',

    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error creating pet: ${response.statusText}`);
  }
}
