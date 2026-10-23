import React from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck, Package } from 'lucide-react';

export const PurchaseView: React.FC<{ onOpenWhatsApp: (source: string) => void }> = ({ onOpenWhatsApp }) => {
  const order = () => {
    const message = encodeURIComponent('Assalam-o-Alaikum MyGlucoGuide, mujhe EvoCheck Premium LinX CGM order karna hai. Price PKR 12,900 hai. Free doorstep delivery aur installation included hain.\n\nPatient Name: \nAge: \nDiabetes Type: \nMedication: \nMobile: \nAddress: \nCity / Location: \n\nPlease order process guide kar dein.');
    window.open(`https://wa.me/923083280568?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Purchase & Availability</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg">EvoCheck Premium LinX CGM</h1>
          <p className="text-fg-2 leading-relaxed">Continuous glucose monitoring to help you understand glucose trends and patterns. Available with free doorstep delivery and installation. Contact us on WhatsApp to place your order.</p>
          <div className="inline-flex flex-col gap-1 rounded-2xl border-2 border-sky-500 bg-sky-50 dark:bg-sky-950/40 px-5 py-4 shadow-sm"><span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300">Price</span><span className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white">PKR 12,900</span><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Free doorstep delivery + installation</span></div>
          <div className="flex flex-wrap gap-2"><div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-400/10 text-emerald-800 dark:text-emerald-200 px-3 py-2 text-sm font-semibold"><CheckCircle2 className="w-4 h-4"/> Available</div><div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-400/10 text-sky-800 dark:text-sky-200 px-3 py-2 text-sm font-semibold"><Package className="w-4 h-4"/> Free Doorstep Delivery</div><div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-400/10 text-sky-800 dark:text-sky-200 px-3 py-2 text-sm font-semibold"><CheckCircle2 className="w-4 h-4"/> Free Installation</div></div>
          <button onClick={order} className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 font-semibold shadow-sm"><MessageCircle className="w-5 h-5"/> Order on WhatsApp</button>
        </div>
        <div className="rounded-3xl overflow-hidden border border-line bg-surface aspect-[4/3]">
          <img src="/assets/images/cgm_upper_arm_sensor_1790517820663.webp" alt="CGM sensor on upper arm" className="w-full h-full object-cover"/>
        </div>
      </section>
      <section className="grid sm:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3"><Package className="w-6 h-6 text-sky-600"/><h2 className="font-bold text-lg text-fg">Order & Delivery</h2><p className="text-sm text-fg-3 leading-relaxed">Free doorstep delivery and installation are included. WhatsApp us to place your order; our team will confirm your details and payment information before finalizing.</p></div>
        <div className="rounded-2xl border border-line bg-surface p-6 space-y-3"><ShieldCheck className="w-6 h-6 text-sky-600"/><h2 className="font-bold text-lg text-fg">Important Information</h2><p className="text-sm text-fg-3 leading-relaxed">CGM is a glucose monitoring tool, not a diagnostic test or treatment. Please consult your healthcare professional for personal medical decisions and follow product instructions.</p></div>
      </section>
      <section className="rounded-2xl bg-surface-2 border border-line p-6 sm:p-8"><h2 className="text-xl font-bold text-fg mb-2">Ready to Order?</h2><p className="text-sm text-fg-3 mb-5">Free doorstep delivery and installation included. Send your order on WhatsApp and we will confirm the next steps.</p><button onClick={order} className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 font-semibold"><MessageCircle className="w-4 h-4"/> Order on WhatsApp</button></section>
    </div>
  );
};
