import ContactForm from "../components/Form/Contact/ContactForm.jsx";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        // Titre de la page contact
        <div className="pt-16 text-center">
          <h1 className="text-[38px] font-extrabold tracking-[0.35em] text-black dark:text-white">
            CONTACT
          </h1>
        </div>
        // Texte explicatif avant le formulaire
        <div className="mt-10 flex justify-center">
          <p className="w-full max-w-[820px] text-center text-[11px] leading-relaxed text-black/70 dark:text-white/70">
            You might find the answer to your question in our{" "}
            <span className="underline underline-offset-2 text-black/85 dark:text-white/85">
              FAQs!
            </span>{" "}
            If you still can’t find the answer you’re looking for, please
            contact our team. We speak French, English, Spanish, Italian!
            <br />
            When contacting us, don’t forget to leave:
            <br />- your first and last name, along with a telephone number.
            <br />- if you encounter a problem when completing the form:
            <br />
            please give us the details of any error messages and specify which
            web browser(s) you’re using.
            <br />- if your question relates to a film that has already been
            entered:
            <br />
            please specify the film’s title, as well as the username and email
            address you signed up with.
          </p>
        </div>
        // Affichage du formulaire de contact
        <div className="mt-16 flex justify-center pb-16">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
