
import { NextResponse } from 'next/server';
import { getPetsAction } from '@/actions/pets.actions';

export async function GET() {
    try {
        const [pets, error] = await getPetsAction();
        console.log('pets', pets);
        if (error) {
            return NextResponse.json({ error: 'Error fetching pets' }, { status: 500 });
        }
        return NextResponse.json(pets);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
