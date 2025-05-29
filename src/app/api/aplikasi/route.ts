import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.dataAplikasiWebsite.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const created = await prisma.dataAplikasiWebsite.create({
      data: {
        name: body.name,
        description: body.description,
        url: body.url,
      },
    });
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json({ message: "Failed to create data" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const updated = await prisma.dataAplikasiWebsite.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description,
        url: body.url,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update data" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const deleted = await prisma.dataAplikasiWebsite.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete data" }, { status: 500 });
  }
}
