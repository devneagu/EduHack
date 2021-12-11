import '../styles/globals.css'
import {RecoilRoot} from "recoil";
import {ChakraProvider} from "@chakra-ui/react";
import {useEffect,useState} from "react";
import {base} from "../utils/sClient";
import GuestLayout from "../layer/GuestLayout";
import {useRouter} from "next/router";
import AuthenticatedLayout from "../layer/AuthenticatedLayout";

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const [authenticatedState, setAuthenticatedState] = useState(false)

    useEffect(() => {
        const { data: authListener } = base.auth.onAuthStateChange((event, session) => {
            handleAuthChange(event, session)
            if (event === 'SIGNED_IN') {
                setAuthenticatedState(true)
                router.push('/')
            }
            if (event === 'SIGNED_OUT') {
                setAuthenticatedState(false)
            }
        })
        checkUser()
        return () => {
            authListener.unsubscribe()
        }
    }, [])

    async function checkUser() {
        const user = await base.auth.user()
        if (user) {
            setAuthenticatedState(true)
        }
    }
    async function handleAuthChange(event, session) {
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
        })
    }
    const [loading, setLoading] = useState(false);
  return(
    <RecoilRoot>
      <ChakraProvider>

          {authenticatedState === true &&
              (<AuthenticatedLayout h={authenticatedState}>
                  <Component {...pageProps} />
              </AuthenticatedLayout>)
          }
          {!authenticatedState &&
              <GuestLayout />
          }
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
