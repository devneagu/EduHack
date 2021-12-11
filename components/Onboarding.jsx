
import {base} from "../utils/sClient";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "../recoil/userAtom";



export default function Onboarding() {
    const user = useRecoilValue(userAtom);
    return (
        <>
            <h1>Onboarding</h1>
            <pre>
                {JSON.stringify(user)}
            </pre>

        </>
    )
}