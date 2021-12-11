import ViewOtherEvents from "../views/otherEvents";
import HeroSection from "../views/HeroSection";
import TriggerActionHero from "../views/TriggerActionHero";
import StatsGridImage from "../views/StatsGridImage";
import Footer from "../views/footer";
import Testimonials from "../views/Testimonials";

export default function Home() {
    // <ViewOtherEvents size={8}/>
    return (
        <>
            <TriggerActionHero />
            <HeroSection />
<StatsGridImage />
            <Testimonials />
<Footer/>
        </>
    )
}