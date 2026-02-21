// Import formulaire CMS Layout
import HeaderForm from "../../Form/CMS/Layout/HeaderForm";

// Import formulaires CMS HomePage
import SectionHeroForm from "../../Form/CMS/Home/SectionHeroForm.jsx";
import SectionConceptForm from "../../Form/CMS/Home/SectionConceptForm.jsx";
import SectionAwardForm from "../../Form/CMS/Home/SectionAwardForm.jsx";
import SectionGoalForm from "../../Form/CMS/Home/SectionGoalForm.jsx";
import SectionEventsForm from "../../Form/CMS/Home/SectionEventsForm.jsx";
import SectionClosingEventForm from "../../Form/CMS/Home/SectionClosingEventForm.jsx";
import SectionLocalisationEventForm from "../../Form/CMS/Home/SectionLocalisationEventForm.jsx";
import SectionProjectedStatsForm from "../../Form/CMS/Home/SectionProjectedStatsForm.jsx";
import SectionPartners from "../../Form/CMS/Home/SectionPartners";

// Import formulaire CMS GalleryPage
import GallerySectionHeroForm from "../../Form/CMS/Gallery/GallerySectionHeroForm";

// Import formulaires CMS JuryPage
import JurySectionHeroForm from "../../Form/CMS/Jury/JurySectionHeroForm";

// Import formulaire CMS PartnersPage
import PartnersSectionHeroForm from "../../Form/CMS/Partners/PartnerSectionHeroForm";

// Import formulaire CMS ContactPage
import ContactSectionHeroForm from "../../Form/CMS/Contact/PartnerSectionHeroForm";

// Import formulaire CMS FaqPage
import FaqSectionHeroForm from "../../Form/CMS/Faq/FaqSectionHeroForm";

// Import formulaire CMS LegalPage
import LegalSectionHeroForm from "../../Form/CMS/Legal/LegalSectionHeroForm";


function CmsCentralization() {
    return [
        {
            pageId: "layout",
            label: "Layout",
            sections: [
                { id: "header", label: "En-tête du site", component: HeaderForm },
            ]
        },
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
            pageId: "gallery",
            label: "Gallerie",
            sections: [
                { id: "hero", label: "Hero", component: GallerySectionHeroForm},
            ],            
        },
        {
            pageId: "jury",
            label: "Jury",
            sections: [
                { id: "hero", label: "Hero", component: JurySectionHeroForm},
            ],
        },        
        {
            pageId: "partner",
            label: "Partner",
            sections: [
                { id: "hero", label: "Hero", component: PartnersSectionHeroForm},
            ],            
        },
        {
            pageId: "fag",
            label: "FAQ",
            sections: [
                { id: "hero", label: "Hero", component: FaqSectionHeroForm },
            ],
        },
        {
            pageId: "contact",
            label: "Contact",
            sections: [
                { id: "hero", label: "Hero", component: ContactSectionHeroForm },

            ],
        },
        {
            pageId: "legal",
            label: "Mentions légales",
            sections: [
                { id: "hero", label: "Hero", component: LegalSectionHeroForm },
            ],
        },
    ];
}

export default CmsCentralization