import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image, Link, Container,
} from '@chakra-ui/react';

const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

export default function ProductSimple({imageUrl,header,type,urlRedirect,eventType}) {
    return (
        <Container py={12} style={{display:'inline-block',width:'auto'}}>
            <Box
                role={'group'}
                p={6}
                w={'330px'}
                style={{minHeight:'370px'}}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${IMAGE})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Link href={urlRedirect}>
                        <Image
                            rounded={'lg'}
                            height={230}
                            width={282}
                            objectFit={'cover'}
                            src={imageUrl}
                        />
                    </Link>
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {eventType}
                    </Text>
                    <Heading fontSize={'sm'} align={'center'} fontFamily={'body'} fontWeight={500}>
                        {header}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>

                        </Text>
                        <Text color={'gray.600'}>
                            {type}
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    );
}