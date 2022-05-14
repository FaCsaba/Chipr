import PageName from '../../components/PageName/PageName';

import Classes from './Login.module.css';

import React, {useRef, useState, useEffect} from 'react';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { useAuth } from '../../store/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';


export default function LoginPage() {

    const { login, currentUser } = useAuth()
    const goTo = useNavigate()

    useEffect(()=>{
        if (currentUser) {
            return goTo('/')
        }
    })

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef= useRef<HTMLInputElement>(null)

    const [errObj, setErrObj] = useState<{hidden: boolean, err: string | null}>({hidden: true, err: null})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        setIsLoading(true)
        try {
            setErrObj({hidden: true, err: null})
            await login!(emailRef.current?.value!, passwordRef.current?.value!)
        } catch(error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    

    return <>
        <PageName name='Login'/>
        <div className={Classes.Card}>
            <div hidden={isLoading} >
                <p className={Classes.Error} hidden={errObj.hidden} >{errObj.err}</p>
                <form className={Classes.Form} onSubmit={handleSubmit}>
                    <InputWithLabel label='Email' type='email' ref={emailRef} id='email' />
                    <InputWithLabel label='Password' type='password' ref={passwordRef} className={Classes.Password} id='password' />

                    <Button.Primary type='submit' value='Login'/>
                    <Button.Secondary type='submit' value='Register' callback={()=>goTo('/register')}  />
                </form>
            </div>
            <div hidden={!isLoading}>
                <Spinner></Spinner>
            </div>
            
        </div>
    </>
}