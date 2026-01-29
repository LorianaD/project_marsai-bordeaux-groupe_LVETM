import SectionAward from "../components/Home/SectionAward.jsx"
import SectionConcept from "../components/Home/SectionConcept.jsx"
import SectionEvent from "../components/Home/SectionEvent.jsx"
import SectionGoal from "../components/Home/SectionGoal.jsx"
import SectionHero from "../components/Home/SectionHero.jsx"

function Home() {
    return(
        <div className="flex pb-[50px] flex-col items-center gap-[50px] self-stretch">
            < SectionHero />
            < SectionConcept />
            < SectionAward />
            < SectionGoal />
            < SectionEvent />
        </div>
    )
}

export default Home