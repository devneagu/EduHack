
import {base} from "../utils/sClient";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "../recoil/userAtom";
import Onboarding from "../components/Onboarding";
import Dashboard from "../components/Dashboard";



export default function Home() {
    // <ViewOtherEvents size={8}/>

    const user = useRecoilValue(userAtom);
    return (
        <>
            {
                user.onboarding === false
                &&
                    <Onboarding />
            }

            {
                user.onboarding === true
                &&
                    <Dashboard />

            }
        </>
    )
}