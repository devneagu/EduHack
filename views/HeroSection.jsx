import {FaKey, FaMapMarkerAlt, FaUser, FaUserSecret} from "react-icons/fa";
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    IconButton,
    createIcon,
    IconProps,
    useColorModeValue, useDisclosure, InputGroup, InputLeftElement, Input
} from '@chakra-ui/react';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {useState} from "react";
import {base} from "../utils/sClient";

const ButtonLogin = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [loading,setLoading] = useState(false)
    const loginUser = async () =>{
        console.log(email,password)
        setLoading(true)
        const { error } = await base.auth.signIn({ email,password })
        setLoading(false)
    }
    return (
        <>
            <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                leftIcon={<FaUser h={4} w={4} color={'gray.300'} />} onClick={onOpen}>
                Login
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaUser />}
                                />
                                <Input type='text' value={email} placeholder='email'  onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaKey />}
                                />
                                <Input value={password} type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            </InputGroup>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={'green'}
                                bg={'green.400'}
                                rounded={'full'}
                                px={6}
                                disabled={loading}
                                onClick={loginUser}
                                _hover={{
                                    bg: 'green.500',
                                }}>Login</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
const ButtonRegister = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false)
    const registerUser = async() => {
        setLoading(true)
        const { error } = await base.auth.signUp({ email,password });
        setLoading(false)
    }
    return (
        <>
            <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                bg={'red.400'}
                _hover={{ bg: 'red.500' }} onClick={onOpen}>
                {'Vreau sa incep'}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Inregistrare</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaUser />}
                                />
                                <Input value={email} type='text' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaKey />}
                                />
                                <Input  value={password} type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            </InputGroup>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={'green'}
                                bg={'green.400'}
                                rounded={'full'}
                                px={6}
                                onClick={registerUser}
                                disabled={loading}
                                _hover={{
                                    bg: 'green.500',
                                }}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default function HeroSection() {


    return (
        <Container maxW={'7xl'}>

            <Stack
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'red.400',
                                zIndex: -1,
                            }}>
                            Oportunitati pe interesul tau,
                            ,
                        </Text>
                        <br />
                        <Text as={'span'} color={'red.400'}>
                            acum la un click distanta!
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Cookiebite este o platforma complexa, usor de utilizat unde poti sa iti gasesti intr-un timp scurt evenimente si oportunitati potrivite tie, din domenii variate.
                    </Text>
                    <Stack
                        spacing={{ base: 4, sm: 6 }}
                        direction={{ base: 'column', sm: 'row' }}>
                        <ButtonRegister />

                        <ButtonLogin />
                    </Stack>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Blob
                        w={'150%'}
                        h={'150%'}
                        position={'absolute'}
                        top={'-20%'}
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue('red.50', 'red.400')}
                    />
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}>
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            src={
                                'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                            }
                        />
                    </Box>
                </Flex>
            </Stack>

        </Container>
    );
}


export const Blob = (props) => {
    return (
        <Icon
            width={'100%'}
            viewBox="0 0 578 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
};
