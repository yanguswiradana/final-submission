import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${query}&image_type=photo&per_page=12`
  );
  const data = await res.json();

  return NextResponse.json({ images: data.hits });
}
