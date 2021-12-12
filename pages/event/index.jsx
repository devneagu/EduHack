import {Box, Button, Center, Flex, Heading, Spacer, Tag, Text, useColorModeValue} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {base} from "../../utils/sClient";
import CardWithContent from "../../components/Cards";
import GmapsRead from "../../components/GmapsRead";

export default function Event() {
    const [eventData, setEventData] = useState([]);
    const [dataMarkers,setDataMarkers] = useState([]);
    const [centerData,setCenterData] = useState({ lat: 45.1855, lng: 25.191112 })
    const [zoom,setZoom] = useState(7);
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
        setTimeout(() => {
            if(event.mapPosition.length == undefined){
                setCenterData(event.mapPosition);
                setZoom(16)
            }
        },200)
    }
    const routeToElement = (id) => {
        router.push(`/event/${id}`)
    }
    return (
        <>
            <Flex minH={'calc(100vh - 60px)'}>
                <Box w={'400px'}>
                    <div style={{height : 'calc(100vh - 60px - 4em'}}>
                    <Button m={'0.5em'} w={'95%'} colorScheme={'gray'} onClick={goToInsertPage}>Adauga Eveniment</Button>
                        <div style={{overflow:'auto',height:'100%'}}>
                    {
                        eventData.map(el => (
                            <Box bg={useColorModeValue('white', 'gray.700')}
                                 p={5} boxShadow={'lg'} key={el.id} style={{padding:'1.5em',  borderRadius:'0.5em', margin:'0.5em', marginTop : '0'}} onClick={() => elementClickMap(el)}>
                                <Flex direction={'column'} minH={'100px'} verticalAlign={'center'} justifyContent={'center'} justifyItems={'center'}>
                                    <Heading fontSize={'md'}>{el.title}</Heading>
                                    <Text>{el.description.substring(0,50) + '...'}</Text>
                                    <Flex>
                                        <Box p='2'>
                                            <Tag colorScheme={"gray"} marginRight={'0.5em'}>{el.payable ? 'Cu plata' : 'Gratis'}</Tag>
                                            <Tag colorScheme={"purple"}>{el.eventType ? 'Fizic' : 'Online'}</Tag>
                                        </Box>
                                        <Spacer />
                                        <Box position={'relative'}>
                                            <Button onClick={() => routeToElement(el.id)} size={'xs'} colorScheme='teal' position={'absolute'} style={{top:'6px',right:0}}>Detalii</Button>
                                        </Box>
                                    </Flex>
                                </Flex>
                            </Box>
                        ))
                    }
                        </div>
                    </div>
                </Box>
                <Box flex='1' bg='gray' h={'auto'}>
                    <GmapsRead clicks={dataMarkers}  rightLayout={false} center={centerData} zoom={zoom}/>
                </Box>
            </Flex>

        </>
    )
}