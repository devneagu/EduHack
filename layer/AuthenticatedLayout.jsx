import ViewOtherEvents from "../views/otherEvents";
import HeroSection from "../views/HeroSection";
import TriggerActionHero from "../views/TriggerActionHero";
import StatsGridImage from "../views/StatsGridImage";
import Footer from "../views/footer";
import Testimonials from "../views/Testimonials";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "../recoil/userAtom";
import {useEffect, useState} from "react";
import {base} from "../utils/sClient";
import WithSubnavigation from "../components/Navigation";

export default function AuthenticatedLayout({children}) {
    const setUser = useSetRecoilState(userAtom);
    const user = useRecoilValue(userAtom);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        (async function(){
            setLoading(true)
            const usr = await base.auth.user();
            const {data,error} = await base.from('profiles').select('*').eq('id',usr.id).single();
            setUser(data);
            setLoading(false)
        })();
    },[])
    return (
        <>
            {loading === false &&
                <>
                    {user.onboarding === true && <WithSubnavigation/> }
                    {children}
                </>

            }
        </>
    )
}