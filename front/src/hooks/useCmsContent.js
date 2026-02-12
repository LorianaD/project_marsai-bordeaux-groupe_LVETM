import { useEffect, useState } from "react";
import GetAllContentApi from "../services/CMS/GetAllContentApi";
import { buildCmsMap } from "../utils/cms";


function useCmsContent(locale) {
    // console.log("Fonction useCmsContent OK");

    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");


    useEffect(()=>{

        async function load() {
            // console.log("fonction load OK");

            // Recupération des données
            try {
                // console.log("try in the function useCmsContent OK");

                setLoading(true);
                setMessage("");

                const json = await GetAllContentApi();
                // console.log(json);

                const rows = json.data || [];
                // console.log("rows:",rows);
                // console.log("rows concept fr:", rows.filter(r => r.section === "hero" && r.locale === locale));

                const cms = buildCmsMap(rows, locale);
                // console.log("CMS finale:", cms);
                
                setContent(cms);

            } catch (error) {

                console.error(error);
                setMessage("Erreur lors du chargement du contenu CMS.");
                
            } finally {

                setLoading(false);

            }
        }

        load();

    }, [locale]);

    return { content, loading, message };    

}

export default useCmsContent