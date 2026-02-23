import ContactForm from "../components/Form/Contact/ContactForm.jsx";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Titre */}
        <div className="pt-16 text-center">
          <h1 className="text-[38px] font-extrabold tracking-[0.35em] text-black dark:text-white">
            CONTACT
          </h1>
        </div>

        {/* Texte d'information */}
        <div className="mt-10 flex justify-center">
          <p className="w-full max-w-[820px] text-center text-[11px] leading-relaxed text-black/70 dark:text-white/70">
            ...
          </p>
        </div>

        {/* Formulaire */}
        <div className="mt-16 flex justify-center pb-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}