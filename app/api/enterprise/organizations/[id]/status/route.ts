import { NextResponse } from 'next/server';
import { organizations } from '@/mocks/data/organizations';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const index = organizations.findIndex(org => org.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }
  organizations[index] = {
    ...organizations[index],
    status: data.status,
    updatedAt: new Date().toISOString()
  };
  return NextResponse.json(organizations[index]);
}