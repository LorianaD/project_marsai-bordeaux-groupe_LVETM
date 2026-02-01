import { useState, useCallback } from "react";

/**
 * Hook générique pour gérer les formulaires
 * - Centralise les valeurs du formulaire dans un seul objet
 * - Fournit un handleChange universel pour tous les inputs
 * - Réutilisable pour Register, Login, Upload, etc.
 *
 * @param {Object} initialValues - valeurs initiales du formulaire
 * @returns {Object} values, handleChange, reset, setValues
*/

export function useForm(initialValues) {

    // État contenant TOUTES les valeurs du formulaire
    // Exemple : { email: "", password: "" }
    const [values, setValues] = useState(initialValues);

    /**
     * Fonction appelée à chaque onChange d’un input
     * Elle détecte automatiquement le type de champ :
     * - text, email, password, date → value
     * - checkbox → checked (true / false)
     * - file → premier fichier sélectionné
     *
     * Le "name" de l'input DOIT correspondre à une clé de values
    */
    const handleChange = useCallback((event) => {

        // event.target = l’input qui a déclenché le changement
        const { name, type, value, checked, files } = event.target;

        // On adapte la valeur selon le type du champ
        const nextValue = type === "checkbox" ? checked : type === "file" ? files?.[0] ?? null : value;

        // Mise à jour de l'état
        // - on conserve les anciennes valeurs (...prev)
        // - on met à jour uniquement le champ concerné
        setValues((prev) => ({
            ...prev,
            [name]: nextValue,
        }));
        
    }, []);

    /**
     * Réinitialise le formulaire à ses valeurs initiales
     * Utile après un submit réussi ou un bouton "Reset"
     */
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