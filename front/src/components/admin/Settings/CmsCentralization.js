import SectionHeroForm from "../../Form/CMS/Home/SectionHeroForm";
import SectionConceptForm from "../../Form/CMS/Home/SectionConceptForm";
import SectionAwardForm from "../../Form/CMS/Home/SectionAwardForm";
import SectionGoalForm from "../../Form/CMS/Home/SectionGoalForm";

function CmsCentralization() {
    return [
        {
            pageId: "home",
            label: "Home",
            sections: [
                { id: "hero", label: "Hero", component: SectionHeroForm },
                { id: "concept", label: "Concept", component: SectionConceptForm },
                { id: "goal", label: "Objectifs", component: SectionGoalForm },
                { id: "award", label: "Awards", component: SectionAwardForm },
                // { id: "partner", label: "Partenaires", component: Partner },
                // { id: "partner-update", label: "Update partenaire", component: UpdatePartner },
            ],
        }, {
            pageId: "contact",
            label: "Contact",
            sections: [
                // { id: "hero", label: "Hero", component: ContactHeroForm },
                // { id: "form", label: "Formulaire", component: ContactFormSectionForm },
            ],
        },
    ];
}

export default CmsCentralization