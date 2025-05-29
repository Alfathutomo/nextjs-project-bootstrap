import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const data = await prisma.user.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.username || !body.password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const created = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        role: body.role || "user",
      },
    });
    return NextResponse.json(created);
  } catch (error) {
    return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const dataToUpdate: any = {
      username: body.username,
      role: body.role,
    };
    if (body.password) {
      dataToUpdate.password = await bcrypt.hash(body.password, 10);
    }
    const updated = await prisma.user.update({
      where: { id: body.id },
      data: dataToUpdate,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const deleted = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
