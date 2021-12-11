import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    Textarea,
    useColorModeValue, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import {base} from "../utils/sClient";

export default function Feedback() {
    const [description,setDescription] = useState('');
    const toast = useToast();
    const saveFeedback = async() => {
        const user = await base.auth.user();
        console.log(user);
        const {data,error} = await base.from('feedback').insert({description, createdby : user.id});
        if(data){
            toast({
                title: 'Multumim pentru feedback!',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        }
        if(error){
            toast({
                title: 'Eroare...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Center py={6}>
                <Box
                    maxW={'600px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Heading
                        style={{textAlign:'center'}}
                        lineHeight={1.1}
                        style={{marginBottom:'1em',marginTop:'1em'}}
                        fontSize={{ base: 'xl'}}>
                        <Text
                            as={'span'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            bgClip="text">
                            Feedback-ul tau important ne ajuta sa imbunatatim platforma!
                        </Text>{' '}
                    </Heading>
                    <FormControl>
                        <Textarea placeholder={'Descriere feedback'} value={description} onChange={(e) => {setDescription(e.target.value)}}></Textarea>
                    </FormControl>
                    <Button mt={'5'} colorScheme={'green'} onClick={saveFeedback}>Trimite!</Button>
                </Box>
            </Center>
        </>
    )
}