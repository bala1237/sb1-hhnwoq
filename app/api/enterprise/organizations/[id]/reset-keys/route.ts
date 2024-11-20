import { NextResponse } from 'next/server';
import { organizations } from '@/mocks/data/organizations';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = organizations.findIndex(org => org.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }
  organizations[index] = {
    ...organizations[index],
    apiKeys: [],
    updatedAt: new Date().toISOString()
  };
  return NextResponse.json(organizations[index]);
}