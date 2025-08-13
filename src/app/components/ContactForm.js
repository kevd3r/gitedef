'use client';
import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactForm = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('');
    const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

    // useEffect pour détecter quand reCAPTCHA est prêt
    useEffect(() => {
        if (executeRecaptcha) {
            setIsRecaptchaReady(true);
        }
    }, [executeRecaptcha]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Envoi en cours...');

        if (!isRecaptchaReady) {
            setStatus('Erreur: reCAPTCHA non chargé, veuillez réessayer.');
            return;
        }

        const gRecaptchaToken = await executeRecaptcha('contact_form');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, gRecaptchaToken }),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('E-mail envoyé avec succès ! Merci pour votre message.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus(`Erreur : ${result.message}`);
            }
        } catch (error) {
            console.error('Erreur réseau lors de l\'envoi :', error);
            setStatus('Erreur réseau. Veuillez réessayer plus tard.');
        }
    };

    return (
        <section className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">Envoyez-nous un message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-lg font-medium text-white mb-2">Votre Nom</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white" placeholder="Entrez votre nom" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-lg font-medium text-white mb-2">Votre Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white" placeholder="Entrez votre email" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-lg font-medium text-white mb-2">Votre Téléphone (optionnel)</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white" placeholder="Entrez votre numéro de téléphone" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-lg font-medium text-white mb-2">Votre Message</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white" placeholder="Tapez votre message ici..." required></textarea>
                </div>
                <button type="submit" disabled={!isRecaptchaReady} className="w-full bg-[#FECD31] text-[#0C1824] font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center text-lg cursor-pointer">
                    Envoyer le message <Send className="ml-2 w-5 h-5" />
                </button>
                {status && (
                    <p className={`text-center mt-4 ${status.includes('Erreur') ? 'text-red-500' : 'text-green-500'}`}>
                        {status}
                    </p>
                )}
            </form>
        </section>
    );
};

export default ContactForm;