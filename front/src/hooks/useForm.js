import { useState, useCallback } from "react";

export function useForm(initialValues) {

    // État contenant TOUTES les valeurs du formulaire
    const [values, setValues] = useState(initialValues);

    const handleChange = useCallback((event) => {

        // event.target = l’input qui a déclenché le changement
        const { name, type, value, checked, files } = event.target;

        // On adapte la valeur selon le type du champ
        const nextValue = type === "checkbox" ? checked : type === "file" ? files?.[0] ?? null : value;

        // Mise à jour de l'état : - on conserve les anciennes valeurs (...prev) - on met à jour uniquement le champ concerné
        setValues((prev) => ({
            ...prev,
            [name]: nextValue,
        }));
        
    }, []);

    // Réinitialise le formulaire à ses valeurs initiales
    const reset = useCallback(() => {
        setValues(initialValues);
    }, [initialValues]);

    // Ce que le hook expose au composant
    return {
        values,      // valeurs actuelles du formulaire
        setValues,   // permet une mise à jour manuelle si besoin
        handleChange,// à brancher sur onChange
        reset,       // pour remettre le formulaire à zéro
    };
}