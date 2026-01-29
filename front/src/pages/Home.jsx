import SectionConcept from "../components/Home/SectionConcept.jsx"
import SectionHero from "../components/Home/SectionHero.jsx"

function Home() {
    return(
        <div className="flex pb-[50px] flex-col items-center gap-[50px] self-stretch">
            < SectionHero />
            < SectionConcept />
        </div>
    )
}

export default Home