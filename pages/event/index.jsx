import {Button} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {base} from "../../utils/sClient";

export default function Event() {

    const router= useRouter();

    const goToInsertPage = () => {
        router.push('/event/insert');
    }

    useEffect(() => {
        (async function(){
            const {data,error} = await base.from('Events').select('*');
            console.log('events :', data)
        })();

    },[])
    return (
        <Button colorScheme={'green'} onClick={goToInsertPage}>+</Button>
    )
}