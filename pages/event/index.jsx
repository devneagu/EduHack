import {Box, Button, Center, Flex, Heading, Tag, Text} from "@chakra-ui/react";
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
        if(event.mapPosition.length == undefined){
            setCenterData(event.mapPosition);
        }
    }
    return (
        <>
            <Flex minH={'100vh'}>
                <Box w={'400px'}>
                    <Button m={'0.5em'} colorScheme={'green'} onClick={goToInsertPage}>Adauga Eveniment</Button>
                    {
                        eventData.map(el => (
                            <div key={el.id} style={{border:'1px solid black',padding:'0.5em', borderRadius:'0.5em', margin:'0.5em', marginTop : '0'}}>
                                <Heading fontSize={'xl'} onClick={() => elementClickMap(el)}>{el.title}</Heading>
                                <Text>{el.description.substring(0,35) + '...'}</Text>
                                <Tag colorScheme={"red"} marginRight={'0.5em'}>{el.payable ? 'Cu plata' : 'Gratis'}</Tag>
                                <Tag colorScheme={"purple"}>{el.eventType ? 'Fizic' : 'Online'}</Tag>
                            </div>
                        ))
                    }
                </Box>
                <Box flex='1' bg='gray' h={'auto'}>
                    <GmapsRead clicks={dataMarkers}  rightLayout={false} center={centerData}/>
                </Box>
            </Flex>

        </>
    )
}