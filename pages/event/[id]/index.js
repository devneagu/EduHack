import {
    Container,
    Input,
    Stack,
    Text,
    InputGroup,useToast,
    InputLeftElement, Button, FormControl, FormLabel, HStack, Textarea, Tag, Select, TagCloseButton, TagLabel
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


export default function EventElement(){
    const user = useRecoilValue(userAtom);
    const router = useRouter();

    const [modified,setModified] = useState(false);
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
    const toast = useToast()


    const middleware = () => {
        if(event.createdby === user.id) {
            if(!modified) setModified(true);
            return true;
        }
        return false;
    }

    useEffect(() => {
        (async function(){
            const eventId = router.query.id;
            const {data,error} = await base.from('Events').select('*').eq('id',eventId).single();
            if(data){
                console.log(data)
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
        console.log(data);

        const {data:inserted,error} = await base.from('Events').update(data);
        console.log('inserted',inserted,error);
        if(data){
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

    return (
        <>
        {event && event.hasOwnProperty('id') === true && <Container style={{margin: '0 auto', marginTop: '2em', marginBottom: '2em'}}>
                <Stack spacing={4}>
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

                    {modified === true && <Button colorScheme={"green"} onClick={Submit}>Salveaza Modificarile</Button>}
                </Stack>
            </Container>
        }
        </>
    )
}

