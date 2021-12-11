import CardProfile from "../../components/CardProfile";
import {useEffect, useState} from "react";
import {base} from "../../utils/sClient";

export default function Networking(){
    const [profiles,setProfiles] = useState([]);

    useEffect(() => {
        (async function() {
            const {data,error} = await base.from('profiles').select('*').eq('onboarding',true);
            setProfiles(data);
        })();
    },[])
    return (
        <>
            {profiles.map(el =>
                <CardProfile key={el.id} name={el.name} profession={el.profession} url={''} interests={el.interests} id={el.id}/>
            )}
        </>
    )
}