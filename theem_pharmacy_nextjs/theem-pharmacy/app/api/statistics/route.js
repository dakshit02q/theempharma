import { db } from '@/lib/db/index.js';
import { statistics } from '@/lib/db/schema.js';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allStats = await db.query.statistics.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => asc(table.order),
    });
    return NextResponse.json(allStats);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newStat = await db.insert(statistics).values(body).returning();
    return NextResponse.json(newStat[0], { status: 201 });
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to create statistic' },
      { status: 500 }
    );
  }
}
