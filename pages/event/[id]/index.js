import {
    Container,
    Input,
    Stack,
    Text,
    InputGroup,
    useToast,
    InputLeftElement,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Textarea,
    Tag,
    Select,
    TagCloseButton,
    TagLabel,
    Heading,
    useBreakpointValue, useDisclosure
} from "@chakra-ui/react";
import {FaMapMarkerAlt} from "react-icons/fa";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import RadioButtons from "../../../components/Radio";
import GmapsModified from "../../../components/GmapsModified";
import {useRecoilValue} from "recoil";
import {userAtom} from "../../../recoil/userAtom";
import {base} from "../../../utils/sClient";
import {useRouter} from "next/router";
import CardProfile from "../../../components/CardProfile";
import CardProfileShort from "../../../components/CardProfileShort";


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// usage example:


function SearchWithTags({tags,callback}){

    const interests = ['Foto','Video','Pregatire Profesionala','Arta','Psihologie','Matematica','Tehnologie','Development','Robotica','Fitness','Santatate Mintala','Educatie sexuala'];
    interests.sort();
    const saveTag = (e) => {
        const newTags = [...tags,e.target.value];
        const unique = newTags.filter(onlyUnique);
        callback(unique);
        e.target.value = null;
    }
    const removeTag = (el) => {
        const data = [...tags];
        const index = data.indexOf(el);
        if (index > -1) {
            data.splice(index, 1);
        }

        callback([...data])
    }
    return (
        <>
            <Select placeholder='Select option'  onChange={saveTag}>
                {
                    interests.map((el,index) => (
                        <option key={index} value={el}>{el}</option>
                    ))
                }
            </Select>
            <div style={{display:'inline-block'}}>
                {
                    tags.map(el => (
                        <Tag key={el} size={'md'}  variant='solid' colorScheme='green' style={{marginRight:'0.5em', marginTop:'0.5em'}}>
                            <TagLabel>{el}</TagLabel>
                            <TagCloseButton onClick={() => removeTag(el)} />
                        </Tag>
                    ))
                }
            </div>
        </>
    )
}


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function EventElement(){
    const user = useRecoilValue(userAtom);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter();
    const variant = useBreakpointValue({ base: 1, sm:1, md: 2,lg : 2, xl : 3 })
    const [event,setEvent] = useState({});
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [hourDate,setHourDate] = useState(12);
    const [eventType,setEventType] = useState(null)
    const [eventPayable,setEventPayable] = useState(null)
    const [mapClick,setMapClick] = useState([])
    const [price,setPrice] = useState(0);
    const [tags,setTags] = useState([])


    const [messageHost,setMessageHost] = useState('');


    const [partikip,setPartikip] = useState(false);
    const [participants,setParticipants] = useState([]);

    const toast = useToast()

    useEffect(() => {
        (async function(){
            const {data,error} = await base.from('EventParticipants').select('*').eq('eventid',router.query.id).eq('userid',user.id);
            if(data && data.length > 0){

                setPartikip(data);
            }
            const {data:multiplePartikip,error : errorMultiplePartikip} = await base.from('EventParticipants').select('*,userid(*)').eq('eventid',router.query.id);
            if(multiplePartikip && multiplePartikip.length > 0 ){
                console.log(multiplePartikip,user)
                setParticipants(multiplePartikip)
            }

        })();
    },[])

    const middleware = () => {
        if(event.createdby === user.id) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        (async function(){
            const eventId = router.query.id;
            const {data,error} = await base.from('Events').select('*').eq('id',eventId).single();
            if(data){
                setEvent(data);
                setName(data.title);
                setDescription(data.description);
                setMapClick(data.mapPosition.length === 0 ? undefined  : data.mapPosition)
                setEventType(data.eventType === false ? 'Online' : 'Fizic')
                setEventPayable(data.payable === false ? 'Gratis' : 'Cu Plata')
                setTags(data.tags)
                setPrice(data.price)
                setHourDate(data.hourDate)
                setStartDate(new Date(data.date))
            }
            if(error){
                router.push('/event');
                toast({
                    title: 'Evenimentul nu mai este disponibil',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }

        })();
    },[])

    const updateOption = (e) => {
        if(!middleware()){
            setEventType(eventType);
            return;
        }
        setEventType(e);
    }
    const updateOptionPayable = (e) => {
        if(!middleware()) return;
        if(e === 'Gratis'){
            setPrice(0);
        }
        setEventPayable(e);
    }
    const updateMap = (click) => {
        if(!middleware()) return;
        setMapClick(click[0]);
    }

    const changeTags = (e) => {
        if(!middleware()) return;
        setTags(e);
    }

    useEffect( () =>{
        if(hourDate < 0){
            setHourDate(24);
        }
        if(hourDate > 24){
            setHourDate(0);
        }
    },[hourDate])

    useEffect(() => {
        if(price < 0 ){
            setPrice(0)
        }
    },[price])


    const Submit = async () => {
        //check he is logged in
        const data = {
            title : name,
            description,
            date : startDate.toISOString(),
            hourDate : hourDate,
            eventType : eventType === 'Online' ? false : true,
            payable : eventPayable === 'Gratis' ? false : true,
            mapPosition : mapClick,
            price : price,
            tags : tags,
            createdby : user.id
        };

        var errorMessage = false;
        if(data.title === '' || data.title.length < 10){
            errorMessage = true;
            toast({
                title: 'Titlul trebuie sa contina minim 10 caractere.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        if(data.description === '' || data.description.length < 50) {
            errorMessage = true;
            toast({
                title: 'Descrierea trebuie sa contina minim 50 caractere.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        if(data.eventType === true && mapClick.length === 0){
            errorMessage = true;
            toast({
                title: 'Selecteaza de pe harta o locatie a evenimentului.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        if(data.eventType === false){
            data.mapPosition = [];
        }
        if(data.tags.length === 0){
            errorMessage = true;
            toast({
                title: 'Selecteaza minim un tag pentru eveniment',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        if(errorMessage) return;
        //submit data


        const {data:updated,error} = await base.from('Events').update(data);
        if(updated){
            toast({
                title: 'Eveniment modificat cu succes!',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            router.push('/event')
        }else{
            toast({
                title: 'Eroare....',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

    }
    const Partikip = () => {
        (async function(){
            const {data,error} = await base.from('EventParticipants').insert({eventid : router.query.id, userid : user.id})
            if(data) {
                toast({
                    title: 'Participare salvata',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                setPartikip(data);
                setParticipants([...participants, {...data[0],userid : user}])
            }
            if(error){
                toast({
                    title: 'Eroare...',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        })();
    }
    const PartikipDelete = async() => {
        const {data,error} = await base.from('EventParticipants').delete().match({eventid : router.query.id})
        if(data && data.length > 0) {
            toast({
                title: 'Participare modificata',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            console.log('data',data);
            const participanti = [...participants];
            const d = participanti.filter(el => el.id !== data[0].id);
            console.log(d,participanti)
            setParticipants([...d]);
            setPartikip(false);
        }
        if(error){
            toast({
                title: 'Eroare...',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

    }


    const sendMessage = async() => {
        console.log(messageHost,event)
        const {error} = await base.from('EventMessage').insert({eventid : router.query.id, userid : user.id,message:messageHost,eventauthor:event.createdby},{returning:'minimal'})
        if(error == null) {
            toast({
                title: 'Mesaj Trimis',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        }
        if(error){
            toast({
                title: 'Eroare...',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        setMessageHost('');
        onClose();
    }

    const [allMessages,setAllMessages] = useState([]);
    useEffect(() => {
        (async function(){
            const {data,error} = await base.from('EventMessage').select('*,userid(*)');
            if(data){
                setAllMessages(data);
            }
        })();
    },[])

    return (
        <>
        {event && event.hasOwnProperty('id') === true && <Container style={{margin: '0 auto', marginTop: '2em', marginBottom: '2em'}}>
                <Stack spacing={4}>
                    {event.createdby !== user.id && <Button onClick={onOpen}>Mesaj Organizator</Button>}
                    <FormControl id='eventName'>
                        <FormLabel>Nume Eveniment</FormLabel>
                        <Input type='text' placeholder='Cel mai tare eveniment...' value={name} onChange={(e) => {
                            if (middleware()) setName(e.target.value)
                        }}/>
                    </FormControl>
                    <FormControl id='eventDescription'>
                        <FormLabel>Descriere</FormLabel>
                        <Textarea h={'300px'} placeholder={'Va asteptam la ....'} value={description} onChange={(e) => {
                            if (middleware()) setDescription(e.target.value)
                        }}></Textarea>
                    </FormControl>

                    <HStack>
                        <FormControl id='eventDate'>
                            <FormLabel>Data Evenimentului</FormLabel>
                            <DatePicker selected={startDate} onChange={(date) => {
                                if (middleware()) setStartDate(date)
                            }}/>
                        </FormControl>
                        <FormControl id='eventHour'>
                            <FormLabel>Ora Evenimentului</FormLabel>
                            <Input type='number' placeholder='12' value={hourDate} onChange={(e) => {
                                if (middleware()) setHourDate(e.target.value)
                            }}/>
                        </FormControl>
                    </HStack>
                    <FormControl id='eventTags'>
                        <FormLabel>Evenimentul este </FormLabel>
                        {eventType !== null &&
                        <RadioButtons options={['Online', 'Fizic']} callback={updateOption} value={eventType}
                                      middleware={!middleware()}/>}
                    </FormControl>

                    {
                        eventType === 'Fizic' &&
                        <GmapsModified rightLayout={false} position={mapClick} callback={updateMap} middleware={middleware()}/>
                    }
                    <FormControl id='eventTags'>
                        <FormLabel>Tags({tags.length})</FormLabel>
                        <SearchWithTags tags={tags} callback={changeTags}/>
                    </FormControl>
                    <FormControl id='eventPayable'>
                        <FormLabel>Intrarea in eveniment este </FormLabel>
                        {eventPayable !== null &&
                        <RadioButtons options={['Gratis', 'Cu Plata']} callback={updateOptionPayable}
                                      value={eventPayable} middleware={!middleware()} />}
                    </FormControl>
                    {
                        eventPayable === 'Cu Plata' &&
                        <FormControl id='eventHour'>
                            <FormLabel>Cost <Text color={'green'} style={{display: 'inline'}}>(RON)</Text></FormLabel>
                            <Input type='number' value={price} placeholder='RON' onChange={(e) => {
                                if (middleware()) setPrice(e.target.value)
                            }}/>
                        </FormControl>
                    }

                    {middleware() === true && <Button colorScheme={"green"} onClick={Submit}>Salveaza Modificarile</Button>}
                    {middleware() === false && partikip === false && <Button colorScheme={"purple"} onClick={Partikip}>Vreau sa Particip!</Button>}
                    {middleware() === false && partikip !== false && <Button colorScheme={"gray"} onClick={PartikipDelete}>Nu mai vreau sa particip.</Button>}

                    <Heading
                        style={{textAlign:'center'}}
                        lineHeight={1.1}
                        style={{marginBottom:'1em',marginTop:'1em'}}
                        fontSize={{ base: '2xl'}}>
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            Participanti ({participants.length})
                        </Text>{' '}
                    </Heading>


                    <Swiper
                        spaceBetween={50}
                        slidesPerView={variant}
                    >
                        {
                            participants.map(el => (
                                <SwiperSlide key={el.id}><CardProfileShort id={el.userid.id} name={el.userid.name} profession={el.userid.profession} /></SwiperSlide>
                            ))
                        }
                    </Swiper>

                    {event.createdby === user.id
                        &&
                        <>
                            <Heading
                                style={{textAlign:'center'}}
                                lineHeight={1.1}
                                style={{marginBottom:'1em',marginTop:'1em'}}
                                fontSize={{ base: '2xl'}}>
                                <Text
                                    as={'span'}
                                    bgGradient="linear(to-r, red.400,pink.400)"
                                    bgClip="text">
                                    Mesaje
                                </Text>{' '}
                            </Heading>
                            {
                                allMessages.map(el => (
                                    <p>{el.message}</p>
                                ))
                            }
                        </>
                    }
                </Stack>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Ai intrebari? Trimite un mesaj</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Textarea value={messageHost} onChange={(e) => setMessageHost(e.target.value)}>

                            </Textarea>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={sendMessage} colorScheme={'green'}>Trimite!</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
        </Container>
        }
        </>
    )
}

