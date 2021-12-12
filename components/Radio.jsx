// 1. Create a component that consumes the `useRadio` hook
import {Box, HStack, useRadio, useRadioGroup} from "@chakra-ui/react";
import {useEffect, useState} from "react";

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input  {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: '#38a168',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export default function RadioButtons({options,callback,value,middleware}) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: value,
        onChange: (e) => callback(e)
        ,
    });

    const group = getRootProps()
    return (
        <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <RadioCard isDisabled={middleware} key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}

