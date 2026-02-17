import SectionHeroForm from "../../Form/CMS/Home/SectionHeroForm";
import SectionConceptForm from "../../Form/CMS/Home/SectionConceptForm";
import SectionAwardForm from "../../Form/CMS/Home/SectionAwardForm";
import SectionGoalForm from "../../Form/CMS/Home/SectionGoalForm";
import SectionEventsForm from "../../Form/CMS/Home/SectionEventsForm";
import SectionClosingEventForm from "../../Form/CMS/Home/SectionClosingEventForm";
import SectionLocalisationEventForm from "../../Form/CMS/Home/SectionLocalisationEventForm";
import SectionProjectedStatsForm from "../../Form/CMS/Home/SectionProjectedStatsForm";
import SectionPartners from "../../Form/CMS/Home/SectionPartners";
import PartnersSectionHeroForm from "../../Form/CMS/Partners/PartnerSectionHeroForm";

function CmsCentralization() {
    return [
        {
            pageId: "home",
            label: "Home",
            sections: [
                { id: "hero", label: "Hero", component: SectionHeroForm },
                { id: "concept", label: "Concept", component: SectionConceptForm },
                { id: "award", label: "Awards", component: SectionAwardForm },                
                { id: "goal", label: "Objectifs", component: SectionGoalForm },
                { id: "events", label: "Programme", component: SectionEventsForm },
                { id: "closingEvent", label: "Clôture", component: SectionClosingEventForm },
                { id:"localisationEvent", label: "Localisation de l'evenement", component: SectionLocalisationEventForm },
                { id:"projectedStats", label: "Chiffres Projetés", component: SectionProjectedStatsForm },
                { id:"partnersSection", label: "Partenaires", component: SectionPartners }
            ],
        },
        {
            pageId: "partner",
            label: "Partner",
            sections: [
                { id: "hero", label: "Hero", component: PartnersSectionHeroForm},
                // { id: "partner", label: "Partenaires", component: Partner },
                // { id: "partner-update", label: "Update partenaire", component: UpdatePartner },
            ],            
        },
        {
            pageId: "contact",
            label: "Contact",
            sections: [
                // { id: "hero", label: "Hero", component: ContactHeroForm },
                // { id: "form", label: "Formulaire", component: ContactFormSectionForm },
            ],
        },
        {
            pageId: "fag",
            label: "FAQ",
            sections: [
                // { id: "hero", label: "Hero", component: FaqHeroForm },
                // { id: "form", label: "Formulaire", component: ContactFormSectionForm },
            ],
        },        
    ];
}

export default CmsCentralization