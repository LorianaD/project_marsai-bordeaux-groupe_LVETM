import CmsInput from "../CMS/Fields/CmsInput";
import CmsTextarea from "../CMS/Fields/CmsTextarea";
import BtnSubmitForm from "../../Buttons/BtnSubmitForm";

function FaqForm({ faq, onChange, onSubmit, onDelete, loading, isEdit = false }) {
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
            <CmsInput
                name="rank"
                label="Rank"
                type="number"
                value={faq.rank}
                onChange={(e) => onChange(faq.id, "rank", Number(e.target.value))}
            />
            <CmsTextarea
                name="question_fr"
                label="Question FR"
                value={faq.question_fr}
                onChange={(e) => onChange(faq.id, "question_fr", e.target.value)}
            />
            <CmsTextarea
                name="question_en"
                label="Question EN"
                value={faq.question_en}
                onChange={(e) => onChange(faq.id, "question_en", e.target.value)}
            />
            <CmsTextarea
                name="answer_fr"
                label="Réponse FR"
                value={faq.answer_fr}
                onChange={(e) => onChange(faq.id, "answer_fr", e.target.value)}
            />
            <CmsTextarea
                name="answer_en"
                label="Réponse EN"
                value={faq.answer_en}
                onChange={(e) => onChange(faq.id, "answer_en", e.target.value)}
            />

            <div className="flex gap-4 flex-wrap justify-center">
                <BtnSubmitForm loading={loading} disabled={loading} variant="submit">
                    {isEdit ? "Mettre à jour" : "Ajouter"}
                </BtnSubmitForm>

                {isEdit && onDelete && (
                    <BtnSubmitForm
                        loading={loading}
                        disabled={loading}
                        type="button"
                        variant="danger"
                        onClick={() => onDelete(faq.id)}
                    >
                        Supprimer
                    </BtnSubmitForm>
                )}
            </div>
        </form>
    );
}

export default FaqForm;
