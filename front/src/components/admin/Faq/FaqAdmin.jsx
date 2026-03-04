 /************************************************
 ****** FAQ ADMIN COMPONENT *********************
************************************************/

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getAllFaq from "../../../services/Faq/getFaqApi.js";
import deleteFaq from "../../../services/Faq/deleteFaqApi.js";
import updateFaq from "../../../services/Faq/updateFaqApi.js";
import addFaq from "../../../services/Faq/addFaqApi.js";
import FaqForm from "../../../components/Form/Faq/FaqForm.jsx";
import { validate } from "../../../utils/zod/zodValidator.js";
import { createFaqSchema } from "../../../utils/zod/zodSchema/zodIndex.js";

function FaqAdmin() {
    //paramétre i18n
    const { t } = useTranslation("faq");
    //usestate pour le fetch (***********************commun mais avec une variation a public et admin******************************)
    const [faqs, setFaqs] = useState([]);
    const [error, setError] = useState(null);
    //useState pour les erreurs (***********************commun a public et admin******************************)
    const [formErrorsAdd, setFormErrorsAdd] = useState([]); //zod errors
    const [formErrorsEdit, setFormErrorsEdit] = useState ({}) //id + zod errors.
    //usestate pour les inputs (***********************commun a public et admin******************************)
    const [loading, setLoading] = useState(false);
    const [faqsEdit, setFaqsEdit] = useState([]);
    const [newFaq, setNewFaq] = useState({
        rank: 1,
        question_fr: "",
        question_en: "",
        answer_fr: "",
        answer_en: ""
    });

    //fetch des faqs (***********************commun a public et admin******************************)
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                setLoading(true); 
                const res = await getAllFaq();
                setFaqs(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            };
        };  
        fetchFaqs();
    },[]); 

    //initialisation du state
    useEffect(() => {
        setFaqsEdit(faqs.map(faq => ({ ...faq })));
    },[faqs]);

    //fonction d'ajout d'une faq
    const handleAdd = async () => {
        try{
            setLoading(true);
            //remise à zéro des erreurs
            setFormErrorsAdd([]);
            //zod front
            const validation = validate(createFaqSchema, newFaq);

            if (!validation.success) {
                setFormErrorsAdd(validation.errors);
                setLoading(false);
                return;
            }
            const addedFaq = await addFaq(validation.data);
            //mise à jour des states
            setFaqs((prev => [...prev, addedFaq]));
            setFaqsEdit(prev => [...prev, addedFaq]);

            alert("FAQ added !");
        }catch (error){
            if (error.details) {
                setFormErrorsAdd(error.details);
            }
            console.error(error);
            alert("Error while adding FAQ");
        } finally {
            setNewFaq({
                rank: 1,
                question_fr: "",
                question_en: "",
                answer_fr: "",
                answer_en: ""
            });
            setLoading(false);
        }
    };

    //fonction de suppresion d'une faq
    const handleDelete = async (id) => {
        try{
            setLoading(true);
            await deleteFaq(id);
            //mise à jour des states
            setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
            setFaqsEdit(prev => prev.filter(faq => faq.id !== id));

            alert("FAQ deleted !");
        }catch(error){
            console.error(error);
            
            alert("Error while deleting FAQ");
        }finally{
            setLoading(false);
        }
    };

    //fonction de mise a jour d'un faq
    const handleUpdate = async (faq) => {
        try{
            setLoading(true);
            //remise à zéro des erreurs
            setFormErrorsEdit(prev => ({ ...prev, [faq.id]: [] }));

            //zod front
            const validation = validate(createFaqSchema, faq);

            if (!validation.success) {
                setFormErrorsEdit(prev =>  ({
                    ...prev,
                    [faq.id]: validation.errors
                }));
                setLoading(false);
                return;
            }

            const dataToUpdate = { ...validation.data, id: faq.id };
            const updatedFaq = await updateFaq(dataToUpdate);
            //mise à jour du state avec le return du backend
            setFaqs(prevFaqs => prevFaqs.map(item => item.id === faq.id ? updatedFaq : item))//verif pour prevfaq
            //mise à jour du state pour les inputs
            setFaqsEdit(prevFaqs => prevFaqs.map(item => item.id === faq.id ? updatedFaq : item))//verif pour prevfaq

            alert("FAQ updated !")
        }catch (error){
            if (error.details) {
                setFormErrorsEdit(prev => ({ ...prev, [faq.id]: error.details }));;
            }
            console.error(error);
            alert("Error while updating the FAQ");
        }finally{
            setLoading(false);
        }
    };

    //fonction pour mettre à jour un champ spécifique d'une FAQ dans le state faqsEdit
    const handleEditChange = (id, field, value) => {
        setFaqsEdit(current =>
            current.map(faq =>
                faq.id === id ? { ...faq, [field]: value } : faq
            )
        );
    };

    return (
        <>
            {/* Affichage des erreurs si il y en a */}
			{error && <p className="text-red-500 text-center">{t(error)}</p>}

            {/* Affichage du loading pendant le fetch initial */}
            {loading && faqsEdit.length === 0 && (
                <p className="text-gray-500 text-center">Loading…</p>
            )}

            {/* Formulaire d'ajout d'une faq */}
            <div className="flex justify-center">
                <FaqForm
                    faq={newFaq}
                    onChange={(id, field, value) =>
                        setNewFaq(prev => ({ ...prev, [field]: value }))
                    }
                    onSubmit={handleAdd}
                    loading={loading}
                    formErrors={formErrorsAdd}
                />
            </div>

            {/* formulaire de modification d'une faq */}
            <div className="flex flex-wrap gap-4 justify-center min-w-[320px]">
                {faqsEdit.map(faq => (
                    <FaqForm
                        key={faq.id}
                        faq={faq}
                        onChange={handleEditChange}
                        onSubmit={handleUpdate}
                        onDelete={handleDelete}
                        loading={loading}
                        isEdit={true}
                        formErrors={formErrorsEdit[faq.id] || []} 
                    />
                ))}
            </div>
        </>
    );
}

export default FaqAdmin;