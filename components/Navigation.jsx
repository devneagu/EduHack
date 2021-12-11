import { useState, useEffect } from 'react'
import { base } from '../utils/sClient'


import {
    useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList, useColorModeValue, IconButton, Image, MenuGroup, Heading
} from "@chakra-ui/react"
import {
    AddIcon,
    ChevronRightIcon,
    EditIcon,
    ExternalLinkIcon,
    HamburgerIcon, InfoIcon,
    RepeatIcon,
    SettingsIcon, ViewIcon
} from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Link,
    useBreakpointValue,
} from '@chakra-ui/react';
import {
    CloseIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons';

import NextLink from "next/link";


export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        <NextLink href={'/'} onClick={onToggle}>
                            <Heading fontSize={'3xl'}>Cookie Bite</Heading>
                        </NextLink>
                    </Text>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button onClick={() => base.auth.signOut()}>Sign Out</Button>
                </Stack>

            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav onToggleMenu={onToggle} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <NextLink href={navItem.href ?? '#'}>
                                <Link
                                    p={2}
                                    fontSize={'sm'}
                                    fontWeight={500}
                                    color={linkColor}
                                    style={{display:'flex',justifyContent : 'center'}}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: linkHoverColor,
                                    }}>
                                    {navItem.label}
                                </Link>
                            </NextLink>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <NextLink href={href}>
            <Link
                role={'group'}
                display={'block'}
                p={2}
                rounded={'md'}
                _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
                <Stack direction={'row'} align={'center'}>
                    <Box>
                        <Text
                            transition={'all .3s ease'}
                            _groupHover={{ color: 'pink.400' }}
                            fontWeight={500}>
                            {label}
                        </Text>
                        <Text fontSize={'sm'}>{subLabel}</Text>
                    </Box>
                    <Flex
                        transition={'all .3s ease'}
                        transform={'translateX(-10px)'}
                        opacity={0}
                        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                        justify={'flex-end'}
                        align={'center'}
                        flex={1}>
                        <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                    </Flex>
                </Stack>
            </Link>
        </NextLink>
    );
};

const MobileNav = ({onToggleMenu}) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem onToggleMenu={onToggleMenu} key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, onToggleMenu }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={onToggleMenu}>
            <NextLink href={href ?? '#'}>
                <Flex
                    py={2}
                    as={Link}
                    justify={'space-between'}
                    align={'center'}
                    _hover={{
                        textDecoration: 'none',
                    }}>
                    <Text
                        fontWeight={600}
                        color={useColorModeValue('gray.600', 'gray.200')}>
                        {label}
                    </Text>
                    {children && (
                        <Icon
                            as={ChevronDownIcon}
                            transition={'all .25s ease-in-out'}
                            transform={isOpen ? 'rotate(180deg)' : ''}
                            w={6}
                            h={6}
                        />
                    )}
                </Flex>
            </NextLink>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                    children.map((child) => (
                        <NextLink key={child.label} href={child.href}>
                            <Link py={2}>
                                {child.label}
                            </Link>
                        </NextLink>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS= [
    {
        label: 'Evenimente',
        href: '/event'
    },
    {
        label: 'Networking',
        href: '/networking',
    },
    {
        label: 'Profil',
        href: '/profil',
    },
];