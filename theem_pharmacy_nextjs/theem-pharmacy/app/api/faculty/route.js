import { db } from '@/lib/db';
import { faculty } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allFaculty = await db.query.faculty.findMany();
    return NextResponse.json(allFaculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newFacultyMember = await db.insert(faculty).values(body).returning();
    return NextResponse.json(newFacultyMember[0], { status: 201 });
  } catch (error) {
    console.error('Error creating faculty member:', error);
    return NextResponse.json(
      { error: 'Failed to create faculty member' },
      { status: 500 }
    );
  }
}
