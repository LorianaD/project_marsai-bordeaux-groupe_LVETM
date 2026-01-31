import SectionAward from "../components/Home/SectionAward.jsx"
import SectionClosingEvent from "../components/Home/SectionClosingEvent.jsx"
import SectionConcept from "../components/Home/SectionConcept.jsx"
import SectionEvent from "../components/Home/SectionEvent.jsx"
import SectionGoal from "../components/Home/SectionGoal.jsx"
import SectionHero from "../components/Home/SectionHero.jsx"
import SectionLocalisation from "../components/Home/SectionLocalisation.jsx"
import SectionPartner from "../components/Home/SectionPartner.jsx"
import SectionProjected from "../components/Home/SectionProjected.jsx"

function Home() {
    return(
        <div className="flex pb-[50px] flex-col items-center gap-[50px] self-stretch dark:text-[#FFFFFF]">
            < SectionHero />
            < SectionConcept />
            < SectionAward />
            < SectionGoal />
            < SectionEvent />
            < SectionClosingEvent />
            < SectionLocalisation />
            < SectionProjected />
            < SectionPartner />
        </div>
    )
}

export default Home