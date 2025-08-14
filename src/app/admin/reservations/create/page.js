// app/admin/reservations/create/page.jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeft } from 'lucide-react';

const CreateReservationPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', startDate: '', endDate: '', message: '',
    origin: 'PRIVATE', status: 'PENDING'
  });
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('Création en cours...');

    try {
      const payload = {
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      };
      
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitMessage('Réservation créée avec succès ! Redirection...');
        // Rediriger vers la page d'administration après 2 secondes
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erreur lors de la création.');
      }
    } catch (error) {
      setSubmitMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C1824] text-white pt-20 pb-12 flex flex-col items-center">
      <Head>
        <title>Créer une Réservation</title>
      </Head>

      <div className="w-full max-w-2xl px-4 md:px-8">
        <Link href="/admin">
          <button className=" cursor-pointer flex items-center text-gray-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </button>
        </Link>
        <div className="bg-[#14273A] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-[#FECD31]">Créer une nouvelle réservation</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" required className="bg-[#0C1824] p-3 rounded-md" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="bg-[#0C1824] p-3 rounded-md" />
            <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone (optionnel)" className="bg-[#0C1824] p-3 rounded-md" />
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className="bg-[#0C1824] p-3 rounded-md" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required className="bg-[#0C1824] p-3 rounded-md" />
            <select name="origin" value={form.origin} onChange={handleChange} className="bg-[#0C1824] p-3 rounded-md">
              <option value="PRIVATE">Privé</option>
              <option value="AIRBNB">Airbnb</option>
            </select>
            <select name="status" value={form.status} onChange={handleChange} className="bg-[#0C1824] p-3 rounded-md">
              <option value="PENDING">En attente</option>
              <option value="VALIDATED">Validée</option>
              <option value="CANCELED">Annulée</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message (optionnel)" className="bg-[#0C1824] p-3 rounded-md col-span-1 md:col-span-2"></textarea>
            
            <button type="submit" className="col-span-1 md:col-span-2 bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600 transition-colors">
              Créer la réservation
            </button>
          </form>
          {submitMessage && <p className="mt-4 text-center">{submitMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateReservationPage;