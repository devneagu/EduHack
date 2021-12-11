import {Box, Button, Center, Flex, Heading, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {base} from "../../utils/sClient";
import CardWithContent from "../../components/Cards";
import GmapsRead from "../../components/GmapsRead";

export default function Event() {
    const [eventData, setEventData] = useState([]);
    const [dataMarkers,setDataMarkers] = useState([]);
    const [centerData,setCenterData] = useState({ lat: 45.6363010353717, lng: 25.2 })
    const router= useRouter();

    const goToInsertPage = () => {
        router.push('/event/insert');
    }

    useEffect(() => {
        (async function(){
            const {data,error} = await base.from('Events').select('*');
            console.log('events :', data)

            const d = data.map(ev => {
                    if(ev.mapPosition.length !== 0)
                        return ev.mapPosition
                    return undefined
                }
            ).filter(el => el !== undefined);
            setDataMarkers(d);
            setEventData(data);
        })();

    },[])

    const elementClickMap = (event) => {
        console.log(event)
    }
    return (
        <>
            <Flex minH={'100vh'}>
                <Box>
                    <Button colorScheme={'green'} onClick={goToInsertPage}>+</Button>
                    {
                        eventData.map(el => (
                            <div key={el.id}>
                                <Heading onClick={() => elementClickMap(el)}>{el.title}</Heading>
                            </div>
                        ))
                    }
                </Box>
                <Box flex='1' bg='tomato' h={'auto'}>
                    <GmapsRead clicks={dataMarkers}  rightLayout={false} center={centerData}/>
                </Box>
            </Flex>

        </>
    )
}