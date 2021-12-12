import {base} from "../utils/sClient";
import ViewOtherEvents from "../views/otherEvents";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Spacer,
    Tag,
    Text,
    useBreakpointValue,
    useColorModeValue
} from "@chakra-ui/react";
import {useEffect, useState} from "react";




import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import {useRouter} from "next/router";

function SliderCard({el}){
    const router = useRouter();
    const routeToElement = (id) => {
        router.push(`/event/${id}`)
    }
    return (
        <Box bg={useColorModeValue('white', 'gray.700')}
             p={5} boxShadow={'lg'} key={el.id} style={{padding:'1.5em',  borderRadius:'0.5em', margin:'0.5em', marginTop : '0'}} >
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
    )
}

export default function Dashboard() {

    const [events,setEvents] = useState([])

    useEffect(() => {
        (async function(){
            const {data,error} = await base.rpc('getlastevents');
            console.log(data,error);
            if(data && data.length > 0){
                setEvents(data);
            }
        })();
    },[])


    const variant = useBreakpointValue({ base: 1, sm:1, md: 3,lg : 3, xl : 4 })

    return (
        <>
            <Center m={'0 auto'} >
                <Box
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}
                >
                    <Heading
                        style={{textAlign:'center'}}
                        lineHeight={1.1}
                        style={{marginBottom:'1em',marginTop:'1em'}}
                        fontSize={{ base: 'xl'}}>
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            Ultimele 5 Evenimente Adaugate
                        </Text>{' '}
                    </Heading>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={variant}
                    >
                        {events.map(el => (
                            <SwiperSlide key={el.id}><SliderCard el={el} /></SwiperSlide>

                        ))}


                    </Swiper>








                    <ViewOtherEvents size={8} />
                </Box>

            </Center>
        </>
    )
}