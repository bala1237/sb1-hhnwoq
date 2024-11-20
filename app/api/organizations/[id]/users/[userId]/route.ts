import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    // In production, fetch specific user from database
    const users = organizationUsers[params.id] || [];
    const user = users.find(u => u.id === params.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching organization user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization user' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const data = await request.json();
    const users = organizationUsers[params.id] || [];
    const userIndex = users.findIndex(u => u.id === params.userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = {
      ...users[userIndex],
      ...data,
      id: params.userId // Prevent ID from being changed
    };

    users[userIndex] = updatedUser;
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating organization user:', error);
    return NextResponse.json(
      { error: 'Failed to update organization user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; userId: string } }
) {
  try {
    const users = organizationUsers[params.id] || [];
    const userIndex = users.findIndex(u => u.id === params.userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    users.splice(userIndex, 1);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting organization user:', error);
    return NextResponse.json(
      { error: 'Failed to delete organization user' },
      { status: 500 }
    );
  }
}