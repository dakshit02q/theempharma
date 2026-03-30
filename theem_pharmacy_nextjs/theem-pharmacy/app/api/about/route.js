import { db } from '@/lib/db';
import { aboutContent } from '@/lib/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const content = await db.query.aboutContent.findMany({
      where: (table, { eq }) => eq(table.isActive, true),
      orderBy: (table, { asc }) => asc(table.order),
    });
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newContent = await db.insert(aboutContent).values(body).returning();
    return NextResponse.json(newContent[0], { status: 201 });
  } catch (error) {
    console.error('Error creating about content:', error);
    return NextResponse.json(
      { error: 'Failed to create about content' },
      { status: 500 }
    );
  }
}
