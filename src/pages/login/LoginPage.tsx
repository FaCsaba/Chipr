import PageName from '../../components/PageName/PageName';

import Classes from './Login.module.css';

import React, {useRef, useState } from 'react';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { useAuth } from '../../store/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

export default function LoginPage() {

    const { login } = useAuth()
    const goTo = useNavigate()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef= useRef<HTMLInputElement>(null)

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        setIsLoading(true)
        login!(emailRef.current?.value!, passwordRef.current?.value!, (user)=>{setIsLoading(false);goTo('/')}, (reason)=>{setIsLoading(false); setError(reason)})
    }

    

    return <>
        <PageName name='Login'/>
        <div className={Classes.Card}>
            <div hidden={isLoading} >
                {error && <p className={Classes.Error} >{error}</p>}
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