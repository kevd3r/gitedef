import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Fonction pour gérer les requêtes GET (READ)
export async function GET(request) {
  try {
    const reservations = await prisma.reservation.findMany();
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes POST (CREATE)
export async function POST(request) {
  try {
    const data = await request.json();
    const newReservation = await prisma.reservation.create({ data });
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}