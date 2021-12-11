import {
    Container,
    Input,
    Stack,
    Text,
    InputGroup,
    InputLeftElement, Button, FormControl, FormLabel, HStack, Textarea, Tag, Select, TagCloseButton, TagLabel
} from "@chakra-ui/react";
import {FaMapMarkerAlt} from "react-icons/fa";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {useState} from "react";
import RadioButtons from "../../../components/Radio";
import GmapsModified from "../../../components/GmapsModified";


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// usage example:


function SearchWithTags(){
    const [tags,setTags] = useState([])
    const interests = ['Foto','Video','Pregatire Profesionala','Arta','Psihologie','Matematica','Tehnologie','Development','Robotica','Fitness','Santatate Mintala','Educatie sexuala'];
    interests.sort();
    const saveTag = (e) => {
        const newTags = [...tags,e.target.value];
        const unique = newTags.filter(onlyUnique);
        setTags(unique);
        e.target.value = null;
    }
    const removeTag = (el) => {
        const data = [...tags];
        const index = data.indexOf(el);
        if (index > -1) {
            data.splice(index, 1);
        }

        setTags([...data])
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
    const [startDate, setStartDate] = useState(new Date());
    const [eventType,setEventType] = useState('Online')
    const [eventPayable,setEventPayable] = useState('Gratis')
    const [mapClick,setMapClick] = useState([])
    const updateOption = (e) => {
        setEventType(e);
    }
    const updateOptionPayable = (e) => {
        setEventPayable(e);
    }
    const updateMap = (click) => {
        setMapClick(click[0]);
    }

    return (

            <Container style={{margin: '0 auto',marginTop:'2em'}}>
                <Stack spacing={4}>
                    <FormControl id='eventName'>
                        <FormLabel>Nume Eveniment</FormLabel>
                        <Input type='text' placeholder='Cel mai tare eveniment...' />
                    </FormControl>
                    <FormControl id='eventDescription'>
                        <FormLabel>Descriere</FormLabel>
                        <Textarea placeholder={'Va asteptam la ....'}></Textarea>
                    </FormControl>

                    <HStack>
                        <FormControl id='eventDate'>
                            <FormLabel>Data Evenimentului</FormLabel>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </FormControl>
                        <FormControl id='eventHour'>
                            <FormLabel>Ora Evenimentului</FormLabel>
                            <Input type='number' placeholder='12' />
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
                        <FormLabel>Tag-uri</FormLabel>
                        <SearchWithTags />
                    </FormControl>
                    <FormControl id='eventPayable'>
                        <FormLabel>Tip eveniment </FormLabel>
                        <RadioButtons options={['Gratis', 'Platit']} callback={updateOptionPayable} value={eventPayable} />
                    </FormControl>
                </Stack>
            </Container>

    )
}

