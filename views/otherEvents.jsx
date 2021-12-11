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
                <Heading fontSize={'lg'}  fontFamily={'body'} fontWeight={500} position={"relative"} onClick={goToOtherEvents} style={{cursor:"pointer"}}>
                    Alte Evenimente <ExternalLinkIcon fontSize={'xs'} />
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