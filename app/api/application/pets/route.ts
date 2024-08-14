// app/api/pets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPetsAction } from '@/app/application/pets/pets.actions';

// Error handling utility
const handleErrorResponse = (error: unknown, message: string) => {
  console.error(message, error instanceof Error ? error.message : String(error));
  return NextResponse.json({ error: message }, { status: 500 });
};

// export async function GET() {
//   try {
//     const [pets, error] = await getPetsAction();
//     console.log('pets', pets);
    
//     if (error) {
//       return NextResponse.json({ error: 'Error fetching pets' }, { status: 500 });
//     }
//     return NextResponse.json(pets);
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }


