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

export default function CardProfile({id,name,profession,url,interests}) {
    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
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
                <Box align={'center'} mt={6}>
                    {
                        interests.map(el => (
                                <Badge
                                    px={2}
                                    py={1}
                                    m={1}
                                    style={{display:'inline-block'}}
                                    bg={useColorModeValue('gray.50', 'gray.800')}
                                    fontWeight={'400'} key={el}>
                                    {el}
                                </Badge>
                            ))
                    }
                </Box>

                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        Urmareste
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}