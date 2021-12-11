import ViewOtherEvents from "../views/otherEvents";
import HeroSection from "../views/HeroSection";
import TriggerActionHero from "../views/TriggerActionHero";
import StatsGridImage from "../views/StatsGridImage";
import Footer from "../views/footer";

export default function Home() {
    // <ViewOtherEvents size={8}/>
    return (
        <>
            <TriggerActionHero />
            <HeroSection />
<StatsGridImage />
<Footer/>
        </>
    )
}