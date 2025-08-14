// src/app/api/reservations/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// Fonction pour gérer les requêtes GET (READ by ID)
export async function GET(request, { params }) {
  try {
    const { id } = await params; // <-- La correction est ici
    const reservation = await prisma.reservation.findUnique({
      where: { id: parseInt(id) },
    });

    if (!reservation) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }

    return NextResponse.json(reservation, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de la réservation:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes PUT (UPDATE)
export async function PUT(request, { params }) {
  try {
    const { id } = await params; // <-- La correction est ici
    const body = await request.json();
    const { name, email, phone, startDate, endDate, message, status, origin } = body;

    const updatedReservation = await prisma.reservation.update({
      where: { id: parseInt(id) },
      data: { name, email, phone, startDate, endDate, message, status, origin },
    });

    return NextResponse.json(updatedReservation, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}

// Fonction pour gérer les requêtes DELETE
export async function DELETE(request, { params }) {
  try {
    const { id } = await params; // <-- La correction est ici
    await prisma.reservation.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Réservation supprimée' }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}