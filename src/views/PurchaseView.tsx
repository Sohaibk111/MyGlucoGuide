import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck, Package } from 'lucide-react';
import { trackEvent, trackWhatsAppClick } from '../services/analytics';

export const PurchaseView: React.FC<{ onOpenWhatsApp: (source: string) => void }> = ({ onOpenWhatsApp }) => {
  const [form, setForm] = useState({ name: '', mobile: '', address: '', city: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = (field: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const order = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isSubmitting) return;
    // The form is HTML-validated before submit. This is COD order intent, not confirmed payment.
    setIsSubmitting(true);
    const message = encodeURIComponent(`Assalam-o-Alaikum! 👋

Welcome to MyGlucoGuide.

I would like to order EvoCheck Premium LinX CGM.

💰 Price: PKR 12,900
🚚 Free Doorstep Delivery
🩺 Free Installation

Order Details:
1. Patient Name: ${form.name}
2. Mobile Number: ${form.mobile}
3. Complete Address: ${form.address}
4. City / Location: ${form.city}

Once we receive your details, we will guide you through the order process and next steps.

Thank you! ❤️
MyGlucoGuide`);
    // Track only generic order metadata. Never send form fields or health information to Meta.
    trackEvent('purchase_order_submitted', {
      value: 12900,
      currency: 'PKR',
      content_name: 'EvoCheck Premium LinX CGM',
      content_type: 'product',
    });
    // Keep WhatsApp inquiry separate from Purchase and exclude patient data from event params.
    trackWhatsAppClick({
      sourceLocation: 'purchase_order_form',
      page: 'purchase',
      ctaIdentifier: 'submit-order-whatsapp',
    });
    const configuredNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').trim();
    if (/^\\d{8,15}$/.test(configuredNumber)) {
      window.open(`https://wa.me/${configuredNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
    } else {
      onOpenWhatsApp('purchase_order_form');
    }
    window.setTimeout(() => setIsSubmitting(false), 1500);
  };

  const fieldClass = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-fg placeholder:text-fg-3 focus:outline-none focus:ring-2 focus:ring-sky-500";
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Purchase & Availability</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">EvoCheck Premium LinX CGM</h1>
          <p className="text-fg-2 leading-relaxed">Continuous glucose monitoring to help you understand glucose trends and patterns. Available with free doorstep delivery and installation. Fill in the order form below to continue on WhatsApp.</p>
          <div className="inline-flex flex-col gap-1 rounded-2xl border-2 border-sky-500 bg-sky-50 dark:bg-sky-950/40 px-5 py-4 shadow-sm"><span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Price</span><span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white">PKR 12,900</span><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Free doorstep delivery + installation</span></div>
          <div className="flex flex-wrap gap-2"><div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-400/10 text-emerald-800 dark:text-emerald-200 px-3 py-2 text-sm font-semibold"><CheckCircle2 className="w-4 h-4"/> Available</div><div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-400/10 text-sky-800 dark:text-sky-200 px-3 py-2 text-sm font-semibold"><Package className="w-4 h-4"/> Free Doorstep Delivery</div><div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-400/10 text-sky-800 dark:text-sky-200 px-3 py-2 text-sm font-semibold"><CheckCircle2 className="w-4 h-4"/> Free Installation</div></div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-line bg-surface aspect-[4/3]">
          <img src="/assets/images/EVOcheck%20CGM%20Product%20Hero%20Scene.png" alt="EvoCheck Premium LinX CGM product box and sensor" className="w-full h-full object-contain"/>
        </div>
      </section>
      <section id="order-form" className="rounded-3xl border border-line bg-surface p-5 sm:p-8 space-y-5">
        <div><p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Direct Order</p><h2 className="text-2xl sm:text-3xl font-extrabold text-fg mt-1">Order EvoCheck CGM</h2><p className="text-sm text-fg-3 mt-2">Enter your details below. Your order message will open on WhatsApp when you submit the form.</p></div>
        <form onSubmit={order} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="space-y-1 text-sm font-semibold text-fg">Patient Name *<input className={fieldClass} value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Patient name" required /></label>
          <label className="space-y-1 text-sm font-semibold text-fg">Mobile Number *<input type="tel" className={fieldClass} value={form.mobile} onChange={e=>update('mobile',e.target.value)} placeholder="03XXXXXXXXX" required /></label>
          <label className="space-y-1 text-sm font-semibold text-fg">City / Location *<input className={fieldClass} value={form.city} onChange={e=>update('city',e.target.value)} placeholder="City" required /></label>
          <label className="space-y-1 text-sm font-semibold text-fg sm:col-span-2">Complete Address *<textarea className={fieldClass} rows={3} value={form.address} onChange={e=>update('address',e.target.value)} placeholder="House, street, area..." required /></label>
          <div className="sm:col-span-2 rounded-xl border border-sky-200 dark:border-sky-400/20 bg-sky-50/70 dark:bg-sky-400/5 p-4">
            <p className="text-sm font-semibold text-fg">Your privacy</p>
            <p className="text-xs text-fg-3 mt-1 leading-relaxed">Submitting opens WhatsApp with the details you entered. This website does not store these form details. Please do not include medical history or other sensitive health information in your order message. Review the message before choosing to send it.</p>
          </div>
          <div className="sm:col-span-2"><button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 font-semibold shadow-sm"><MessageCircle className="w-5 h-5"/> {isSubmitting ? 'Opening WhatsApp…' : 'Continue on WhatsApp'}</button><p className="text-xs text-fg-3 mt-2">No order is confirmed until our team confirms availability, delivery, and payment details.</p></div>
        </form>
      </section>
      <section className="grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3"><Package className="w-6 h-6 text-sky-600"/><h2 className="font-bold text-lg text-fg">Order & Delivery</h2><p className="text-sm text-fg-3 leading-relaxed">Free doorstep delivery and installation are included. Our team will confirm your details and payment information before finalizing.</p></div>
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3"><ShieldCheck className="w-6 h-6 text-sky-600"/><h2 className="font-bold text-lg text-fg">Important Information</h2><p className="text-sm text-fg-3 leading-relaxed">CGM is a glucose monitoring tool, not a diagnostic test or treatment. Please consult your healthcare professional for personal medical decisions and follow product instructions.</p></div>
      </section>
    </div>
  );
};
