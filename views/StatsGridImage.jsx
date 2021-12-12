import { ReactNode } from 'react';
import {
    Stack,
    Container,
    Box,
    Flex,
    Text,
    Heading,
    SimpleGrid,
} from '@chakra-ui/react';

export default function StatsGridImage() {
    return (
        <Box bg={'gray.800'} position={'relative'}>
            <Flex
                flex={1}
                zIndex={0}
                display={{ base: 'none', lg: 'flex' }}
                backgroundImage="url('https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80')"
                backgroundSize={'cover'}
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                position={'absolute'}
                width={'50%'}
                insetY={0}
                right={0}>
                <Flex
                    bgGradient={'linear(to-r, gray.800 10%, transparent)'}
                    w={'full'}
                    h={'full'}
                />
            </Flex>
            <Container maxW={'7xl'} zIndex={10} position={'relative'}>
                <Stack direction={{ base: 'column', lg: 'row' }}>
                    <Stack
                        flex={1}
                        color={'gray.400'}
                        justify={{ lg: 'center' }}
                        py={{ base: 4, md: 20, xl: 60 }}>
                        <Box mb={{ base: 8, md: 20 }}>
                            <Text
                                fontFamily={'heading'}
                                fontWeight={700}
                                textTransform={'uppercase'}
                                mb={3}
                                fontSize={'xl'}
                                color={'gray.500'}>
                                Technologie - Networking - Educatie
                            </Text>
                            <Heading
                                color={'white'}
                                mb={5}
                                fontSize={{ base: '3xl', md: '5xl' }}>
                                Educatia secolului XXI
                            </Heading>
                            <Text fontSize={'xl'} color={'gray.400'}>
                                Educatia nonformala asigura procesul de invatare oricand si oriunde, pe tot parcursul vietii.  Scopul este imbunatatirea calitatii resursei umane din sistemul educational necesara societatii cunoasterii
                            </Text>
                        </Box>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            {stats.map((stat) => (
                                <Box key={stat.title}>
                                    <Text
                                        fontFamily={'heading'}
                                        fontSize={'3xl'}
                                        color={'white'}
                                        mb={3}>
                                        {stat.title}
                                    </Text>
                                    <Text fontSize={'xl'} color={'gray.400'}>
                                        {stat.content}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Stack>
                    <Flex flex={1} />
                </Stack>
            </Container>
        </Box>
    );
}

const StatsText = ({ children }) => (
    <Text as={'span'} fontWeight={700} color={'white'}>
        {children}
    </Text>
);

const stats = [
    {
        title: '24/7+',
        content: (
            <>
                <StatsText>Un proces continuu de invatare</StatsText>
            </>
        ),
    },
    {
        title: '5+',
        content: (
            <>
                <StatsText>Potrivita Oricui</StatsText>
            </>
        ),
    },
    {
        title: 'Oportunitati Infinite',
        content: (
            <>
                <StatsText>Poti interactiona </StatsText> cu fiecare membru din cadrul platformei
            </>
        ),
    },
    {
        title: '',
        content: (
            <>

            </>
        ),
    },
];