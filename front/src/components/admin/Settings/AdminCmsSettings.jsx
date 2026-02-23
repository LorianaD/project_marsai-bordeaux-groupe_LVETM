import { useEffect, useMemo, useState } from "react";
import CmsCentralization from "./CmsCentralization.js";

import CmsHeader from "./CmsHeader";
import CmsPanel from "./CmsPanel";
import CmsTopNav from "./CmsTopNav";
import CmsSectionTabs from "./CmsSectionTabs";

function AdminCmsSettings() {

    const registry = useMemo(()=> CmsCentralization(), []);

    // gere la langue
    const [forcedLocale, setForcedLocale] = useState("fr");
    console.log("ForcedLocale:", forcedLocale);

    // verifie et recupere la page, si elle existe
    const [activePageId, setActivePageId] = useState(registry[0]?.pageId ?? "home");

    // recupére la page dans le registry correspondant à l’ID sélectionné
    const activePage = registry.find((p) => p.pageId === activePageId) ?? registry[0];

    // recupere la section
    const [activeSectionId, setActiveSectionId] = useState(activePage?.sections?.[0]?.id ?? "");

    useEffect(() => {

        setActiveSectionId(activePage?.sections?.[0]?.id ?? "");

    }, [activePage]);

    // Cherche la section correspondant à l'ID
    const activeSection = activePage?.sections?.find((s) => s.id === activeSectionId) ?? activePage?.sections?.[0];

    // affiche dynamiquement le bon formulaire
    const ActiveForm = activeSection?.component ?? null;

    return(
        <div className="w-full mx-auto px-4 py-8 md:px-8">

            <CmsHeader activePageLabel={activePage?.label} activeSectionLabel={activeSection?.label} forcedLocale={forcedLocale} onLocaleChange={setForcedLocale} />

            <CmsTopNav registry={registry} activePageId={activePageId} onSelectPage={setActivePageId} forcedLocale={forcedLocale} onLocaleChange={setForcedLocale} />

            <CmsSectionTabs sections={activePage?.sections ?? []} activeSectionId={activeSectionId} onSelectSection={setActiveSectionId} />

            <CmsPanel pageLabel={activePage?.label} sectionLabel={activeSection?.label} forcedLocale={forcedLocale} >
                {ActiveForm ? <ActiveForm forcedLocale={forcedLocale} /> : <EmptyState />}
            </CmsPanel>

        </div>
    )
}

export default AdminCmsSettings