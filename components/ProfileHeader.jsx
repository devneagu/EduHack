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
import {Component, useEffect, useState} from "react";
import {base} from "../utils/sClient";
export default function ProfileHeader() {
    const [data,setData] = useState(null)

    useEffect(() => {
        (async function(){
            const user = await base.auth.user();
            const {data:profile,error} = await base.from('profiles').select('*').eq('id',user.id).single();
            if(error) {
                setData(false);
            }
            console.log(profile)
            if(profile){
                setData(profile)
            }
        })();
    },[])
    if(data === null){
        return <p>....</p>
    }
    if(data === false){
        return <>Profil Inexistent...</>
    }
    return (

        <Center py={6}>
            <Box
                maxW={'600px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={
                        'https://cdn.pixabay.com/photo/2021/03/23/08/35/cookie-6116766_1280.png'
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
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {data.name}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {data.profession}
                </Text>
                <Text color={'gray.500'} mb={4}>
                    Interese
                </Text>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    {data.interests.map(el => (
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'} key={el}>
                            {el}
                        </Badge>
                    ))}
                </Stack>
                <Text color={'gray.500'} mb={4} mt={4}>
                    Teluri
                </Text>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    {data.goals.map(el => (
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontWeight={'400'} key={el}>
                            {el}
                        </Badge>
                    ))}
                </Stack>
                {/*<Stack mt={8} direction={'row'} spacing={4}>*/}
                {/*    <Button*/}
                {/*        flex={1}*/}
                {/*        fontSize={'sm'}*/}
                {/*        rounded={'full'}*/}
                {/*        _focus={{*/}
                {/*            bg: 'gray.200',*/}
                {/*        }}>*/}
                {/*        Trimite un mesaj*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        flex={1}*/}
                {/*        fontSize={'sm'}*/}
                {/*        rounded={'full'}*/}
                {/*        bg={'blue.400'}*/}
                {/*        color={'white'}*/}
                {/*        boxShadow={*/}
                {/*            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'*/}
                {/*        }*/}
                {/*        _hover={{*/}
                {/*            bg: 'blue.500',*/}
                {/*        }}*/}
                {/*        _focus={{*/}
                {/*            bg: 'blue.500',*/}
                {/*        }}>*/}
                {/*        Urmareste*/}
                {/*    </Button>*/}
                {/*</Stack>*/}

            </Box>
        </Center>
    );
}