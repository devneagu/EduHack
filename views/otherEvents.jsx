import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GMaps from "../components/GMaps";
import {useEffect, useState} from "react";
import {base} from "../utils/sClient";
import ProductSimple from "../components/ProductSimple";
import {Heading, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function ViewOtherEvents({size}) {
    const [events,setEvents] = useState([]);
    const router = useRouter();
    useEffect(() => {
        (async function(){

            const {data,error} = await base.from('ScrapedData').select('*').range(0,size-1);
            console.log(data.length)
            if(data && data.length > 0){
                setEvents(data);
            }
        })();
    },[])

    const goToOtherEvents = () => {
        router.push('otherEvents');
    }

    return (
        <div>

            {events.length > 0 &&
            <div style={{marginLeft:'5%'}}>
                <Heading
                    style={{textAlign:'center'}}
                    lineHeight={1.1}
                    style={{marginBottom:'1em',marginTop:'1em'}}
                    fontSize={{ base: 'xl'}}>
                    <Text
                        as={'span'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text" onClick={goToOtherEvents}>
                        Alte Evenimente
                    </Text>{' '}
                    <ExternalLinkIcon fontSize={'xs'} />{' '}
                </Heading>

                <div>
                    <div>
                        {events.map(data => (
                            <ProductSimple key={data.id} eventType={'internship'} type={data.type} header={data.h3} imageUrl={data.img} urlRedirect={data.url}/>
                        ))
                        }
                    </div>
                </div>

            </div>
            }
        </div>
    )
}