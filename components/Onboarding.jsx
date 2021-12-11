
import {base} from "../utils/sClient";
import {useEffect, useReducer, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {userAtom} from "../recoil/userAtom";
import {Container, CheckboxGroup, HStack, Checkbox, Stack, Heading, Button, Text, Input} from "@chakra-ui/react";


function Story({header,children}){


    return (
        <>
            <Heading
                style={{textAlign:'center'}}
                lineHeight={1.1}
                style={{marginBottom:'1em'}}
                fontSize={{ base: 'xl'}}>
                {header}
            </Heading>
            <>
                {children}
            </>
        </>
    )
}

function StoryInterest({state,dispatch}) {

    const interests = ['Foto','Video','Pregatire Profesionala','Arta','Psihologie','Matematica','Tehnologie','Development','Robotica','Fitness','Santatate Mintala','Educatie sexuala'];
    interests.sort();

    console.log(state)
    return (
        <CheckboxGroup colorScheme='green' value={state.interests} onChange={(e) => {dispatch({type : 'updateByKey',key:'interests', value:e }) }}>
            <Stack>
                <Heading
                    style={{textAlign:'center'}}
                    lineHeight={1.1}
                    style={{marginBottom:'1em'}}
                    fontSize={{ base: 'xl'}}>
                    Ce subiecte te intereseaza?
                </Heading>
                {
                    interests.map((el,index) => (
                        <Checkbox  key={index} value={el}>{el}</Checkbox>
                    ))
                }
            </Stack>
        </CheckboxGroup>
    )
}

function StoryGoals({state,dispatch}) {
    const goals = ['Public Speaking','Networking','Problem-Solving','Gandire Critica','IT','Teamwork','Leadership'];
    goals.sort();
    return (
        <CheckboxGroup colorScheme='green' defaultValue={state.goals} onChange={(e) => { dispatch({type : 'updateByKey',key:'goals', value:e }) }}>
            <Stack>
                <Heading
                    style={{textAlign:'center'}}
                    lineHeight={1.1}
                    style={{marginBottom:'1em'}}
                    fontSize={{ base: 'xl'}}>
                    Ce doresti sa aprofundezi?
                </Heading>
                {
                    goals.map((el,index) => (
                        <Checkbox  key={index} value={el}>{el}</Checkbox>
                    ))
                }
            </Stack>
        </CheckboxGroup>
    )
}

function fnReducer(state,action) {
    switch(action.type) {
        case "updateByKey":
            return {
                ...state,
                [action.key] : action.value
            }
        default :
            return state;
    }

}
export default function Onboarding() {
    const user = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const [page,setPage] = useState(0);

    const [state,dispatch] = useReducer(fnReducer, {
        name : '',
        profession : '',
        interests : [],
        goals : []
    })

    useEffect(() => {
        document.body.style.background = '#e9eae5';
        return () => {
            document.body.style.background = 'white';
        }
    },[])

    const changePage = (sign) => {
        if(sign === '+'){
            setPage(++page);
        }
        if(sign === '-'){
            setPage(--page);
        }
    }

    const updateKey = (key,value) => {
        dispatch({type : 'updateByKey',key, value })
    }

    const finishOnboarding = async () => {
        const {data, error} = await base.from('profiles').update({...state, onboarding : true}).match({id : user.id,})
        if(data && data.length > 0){
            setUser(data[0]);
        }
    }

    return (
        <>
            <Container style={{margin:'0 auto'}} >
                <Heading
                    style={{textAlign:'center'}}
                    lineHeight={1.1}
                    style={{marginBottom:'1em',marginTop:'1em'}}
                    fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
                    <Text
                        as={'span'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text">
                        Onboarding
                    </Text>{' '}
                </Heading>

                {/*<pre>*/}
                {/*    {JSON.stringify(state,null,2)}*/}
                {/*</pre>*/}

                {page === 0 && <Story header={'Cum te numesti?'}>
                        <Stack spacing={3}>
                            <Input placeholder='Nume' value={state.name} onChange={(e) => updateKey('name',e.target.value) } size='lg' />
                            <Input placeholder='Profesie' size='lg'  value={state.profession}  onChange={(e) => updateKey('profession',e.target.value) } />
                        </Stack>
                    </Story>
                }
                {page === 1 &&
                    <StoryInterest state={state}  dispatch={dispatch}  />
                }
                {
                    page == 2 &&
                    <StoryGoals state={state}  dispatch={dispatch}  />
                }
                {
                    page == 3 &&
                    <Story header={'All set!!'}>
                        <p>Imagine sugestiva, de preferat pe inaltime</p>
                    </Story>
                }

                <HStack style={{display:'block', position:'relative', marginTop:'2em', fontWeight:'600'}} >
                    {page > 0 && <span  onClick={() => changePage('-')}>Back</span> }
                    {page < 3 && <span align={'right'} style={{position:'absolute',right:0,top:'0'}} onClick={() => changePage('+')}>Next</span>}
                    {page === 3 && <Button align={'right'} onClick={finishOnboarding} style={{position:'absolute',right:0,top:'-0.5em'}} colorScheme={'green'} color={'white'} w={'100px'}>Finalizeaza</Button>}
                </HStack>
            </Container>
        </>
    )
}
