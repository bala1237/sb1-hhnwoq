import { NextResponse } from 'next/server';

export async function GET() {
  const popularTopics = [
    {
      id: "error-handling",
      title: "Error Handling",
      views: 1250,
      category: "Development",
    },
    {
      id: "pagination",
      title: "Pagination",
      views: 980,
      category: "Development",
    },
    {
      id: "data-models",
      title: "Data Models",
      views: 850,
      category: "Reference",
    },
    {
      id: "best-practices",
      title: "Best Practices",
      views: 1100,
      category: "Development",
    },
  ];

  return NextResponse.json(popularTopics);
}