import { db } from '@/lib/db';
import { admissions } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allAdmissions = await db.query.admissions.findMany();
    return NextResponse.json(allAdmissions);
  } catch (error) {
    console.error('Error fetching admissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admissions' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newAdmission = await db.insert(admissions).values(body).returning();
    return NextResponse.json(newAdmission[0], { status: 201 });
  } catch (error) {
    console.error('Error creating admission:', error);
    return NextResponse.json(
      { error: 'Failed to create admission' },
      { status: 500 }
    );
  }
}
