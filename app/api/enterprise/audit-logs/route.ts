import { NextResponse } from 'next/server';

// Mock audit logs data - in production this would come from your database
const auditLogs = [
  {
    id: "1",
    action: "Role Created",
    actor: "John Doe",
    target: "Support Manager Role",
    timestamp: "2024-02-20 15:30:00",
    status: "success",
  },
  {
    id: "2",
    action: "Policy Modified",
    actor: "Jane Smith",
    target: "API Rate Limiting Policy",
    timestamp: "2024-02-20 14:45:00",
    status: "success",
  },
  {
    id: "3",
    action: "Permission Added",
    actor: "Mike Johnson",
    target: "Security Auditor Role",
    timestamp: "2024-02-20 13:15:00",
    status: "success",
  },
];

export async function GET() {
  try {
    return NextResponse.json(auditLogs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...data
    };

    auditLogs.push(newLog);
    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { error: 'Failed to create audit log' },
      { status: 500 }
    );
  }
}