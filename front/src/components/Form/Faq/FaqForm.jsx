import { Field, TextInput, TextArea } from "../Participation/ui/Field";
import BtnSubmitForm from "../../Buttons/BtnSubmitForm";
import { useTranslation } from "react-i18next"

function FaqForm({ faq, onChange, onSubmit, onDelete, loading, isEdit = false, formErrors=[] }) {
    //paramétre i18n
    const { t, i18n } = useTranslation(["faq", "zodErrors"]);
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    //filtrer les erreurs par champ
    const getErrors = (field) =>
        formErrors.filter(e => e.field === field);

    //composant pour afficher les erreurs d'un champ
    const FieldError = ({ field }) => (
        <>
            {getErrors(field).map((e, i) => {
                //si le message ressemble a un clé i18n
                if(e.message.startsWith("faq.")) {
                    return <p key={i} className="text-red-700">{t(e.message, { ns: "zodErrors" })}</p>;
                }
                //sinon c'est une erreur backend
                return <p key={i} className="text-red-700">{e.message}</p>;
            })}
        </>
    );

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(faq);
            }}
            className={`m-2 w-full ${
                isEdit ? "m-2 w-full max-w-[650px] rounded-[32px]" : "max-w-[900px]"
            } rounded-[32px] border border-black/10 bg-white/5 shadow-[0_15px_25px_-12px_rgba(0,0,0,0.25)] flex flex-col justify-center gap-[20px] p-4 md:p-[40px]`}
        >
            <Field label={t("form.label.rank")}>
                <TextInput
                    name="rank"
                    type="number"
                    value={faq.rank}
                    onChange={(e) => onChange(faq.id, "rank", Number(e.target.value))}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FieldError field="rank" />

            <Field label={t("form.label.question_fr")}>
                <TextArea
                    name="question_fr"
                    value={faq.question_fr}
                    onChange={(e) => onChange(faq.id, "question_fr", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FieldError field="question_fr" />

            <Field label={t("form.label.question_en")}>
                <TextArea
                    name="question_en"
                    value={faq.question_en}
                    onChange={(e) => onChange(faq.id, "question_en", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FieldError field="question_en" />

            <Field label={t("form.label.answer_fr")}>
                <TextArea
                    name="answer_fr"
                    value={faq.answer_fr}
                    onChange={(e) => onChange(faq.id, "answer_fr", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FieldError field="answer_fr" />

            <Field label={t("form.label.answer_en")}>
                <TextArea
                    name="answer_en"
                    value={faq.answer_en}
                    onChange={(e) => onChange(faq.id, "answer_en", e.target.value)}
                    rows={4}
                />
            </Field>
            {/* Affichage de l erreur zod dans le back */}
            <FieldError field="answer_en" />


            <div className="flex gap-4 flex-wrap justify-center">
                <BtnSubmitForm loading={loading} disabled={loading} variant="submit">
                    {isEdit ? t("form.button.update") : t("form.button.add")}
                </BtnSubmitForm>

                {isEdit && onDelete && (
                    <BtnSubmitForm
                        loading={loading}
                        disabled={loading}
                        type="button"
                        variant="danger"
                        onClick={() => onDelete(faq.id)}
                    >
                        {t("form.button.delete")}
                    </BtnSubmitForm>
                )}
            </div>
        </form>
    );
}

export default FaqForm;
