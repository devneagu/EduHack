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


export default function InsertEvent(){
    const user = useRecoilValue(userAtom);
    const router = useRouter();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [hourDate,setHourDate] = useState(12);
    const [eventType,setEventType] = useState('Online')
    const [eventPayable,setEventPayable] = useState('Gratis')
    const [mapClick,setMapClick] = useState([])
    const [price,setPrice] = useState(0);
    const [tags,setTags] = useState([])
    const toast = useToast()
    const updateOption = (e) => {
        setEventType(e);
    }
    const updateOptionPayable = (e) => {
        if(e === 'Gratis'){
            setPrice(0);
        }
        setEventPayable(e);
    }
    const updateMap = (click) => {
        setMapClick(click[0]);
    }

    const changeTags = (e) => {
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

        const {data:inserted,error} = await base.from('Events').insert(data);
        console.log('inserted',inserted,error);
        if(data){
            toast({
                title: 'Eveniment creat!',
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

            <Container style={{margin: '0 auto',marginTop:'2em', marginBottom :'2em'}}>
                <Stack spacing={4}>
                    <FormControl id='eventName'>
                        <FormLabel>Nume Eveniment</FormLabel>
                        <Input type='text' placeholder='Cel mai tare eveniment...'  value={name} onChange={(e) => setName(e.target.value) }/>
                    </FormControl>
                    <FormControl id='eventDescription'>
                        <FormLabel>Descriere</FormLabel>
                        <Textarea placeholder={'Va asteptam la ....'} value={description} onChange={(e) => setDescription(e.target.value)} ></Textarea>
                    </FormControl>

                    <HStack>
                        <FormControl id='eventDate'>
                            <FormLabel>Data Evenimentului</FormLabel>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </FormControl>
                        <FormControl id='eventHour'>
                            <FormLabel>Ora Evenimentului</FormLabel>
                            <Input type='number' placeholder='12' value={hourDate} onChange={(e) => setHourDate(e.target.value)} />
                        </FormControl>
                    </HStack>
                    <FormControl id='eventTags'>
                        <FormLabel>Evenimentul este </FormLabel>
                        <RadioButtons options={['Online', 'Fizic']} callback={updateOption} value={eventType} />
                    </FormControl>

                    {
                        eventType === 'Fizic' &&
                            <GmapsModified rightLayout={false} callback={updateMap}/>
                    }
                    <FormControl id='eventTags'>
                        <FormLabel>Tags({tags.length})</FormLabel>
                        <SearchWithTags tags={tags} callback={changeTags} />
                    </FormControl>
                    <FormControl id='eventPayable'>
                        <FormLabel>Intrarea in eveniment este </FormLabel>
                        <RadioButtons options={['Gratis', 'Cu Plata']} callback={updateOptionPayable} value={eventPayable} />
                    </FormControl>
                    {
                        eventPayable === 'Cu Plata' &&
                        <FormControl id='eventHour'>
                            <FormLabel>Cost <Text color={'green'} style={{display:'inline'}}>(RON)</Text></FormLabel>
                            <Input type='number' value={price} placeholder='RON' onChange={(e) => setPrice(e.target.value)} />
                        </FormControl>
                    }

                    <Button colorScheme={"green"} onClick={Submit}>Creeaza Eveniment</Button>
                </Stack>
            </Container>

    )
}

