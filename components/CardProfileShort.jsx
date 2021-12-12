import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import {useRouter} from "next/router";

export default function CardProfileShort({id,name,profession,url}) {
    const router = useRouter();
    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                style={{cursor:'pointer'}}
                textAlign={'center'} onClick={() =>{router.push(`/profil/${id}`)}}>
                <Avatar
                    size={'xl'}
                    src={
                        url || 'https://cdn.pixabay.com/photo/2021/03/23/08/35/cookie-6116766_1280.png'
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                    _after={{
                        content: '""',
                        w: 4,
                        h: 4,
                        bg: 'green.300',
                        border: '2px solid white',
                        rounded: 'full',
                        pos: 'absolute',
                        bottom: 0,
                        right: 3,
                    }}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'} onClick={() => {console.log(id)}} style={{cursor:'pointer'}}>
                    {name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {profession}
                </Text>
            </Box>
        </Center>
    );
}