import { db } from '@/lib/db';
import { features } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allFeatures = await db.query.features.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => asc(table.order),
    });
    return NextResponse.json(allFeatures);
  } catch (error) {
    console.error('Error fetching features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newFeature = await db.insert(features).values(body).returning();
    return NextResponse.json(newFeature[0], { status: 201 });
  } catch (error) {
    console.error('Error creating feature:', error);
    return NextResponse.json(
      { error: 'Failed to create feature' },
      { status: 500 }
    );
  }
}
