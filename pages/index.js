
import {base} from "../utils/sClient";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "../recoil/userAtom";
import Onboarding from "../components/Onboarding";



export default function Home() {
    // <ViewOtherEvents size={8}/>

    const user = useRecoilValue(userAtom);
    return (
        <>
            <button className="button block" onClick={() => base.auth.signOut()}>
                Sign Out
            </button>
            {
                user.onboarding === false
                &&
                    <Onboarding />
            }

            {
                user.onboarding === true
                &&
                    <p>Dashboard</p>

            }
        </>
    )
}