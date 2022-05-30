import PageName from '../../components/PageName/PageName';

import Classes from './Register.module.css';

import React, {useRef, useState } from 'react';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { useAuth } from '../../store/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';


export default function RegisterPage() {

    const { register } = useAuth()
    const goTo = useNavigate()

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef= useRef<HTMLInputElement>(null)
    const secondPasswordRef = useRef<HTMLInputElement>(null)
    const chirpHandleRef = useRef<HTMLInputElement>(null)

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (passwordRef.current?.value !== secondPasswordRef.current?.value) {
            return setError('Passwords do not match!')
        }

        if (!chirpHandleRef.current?.value) {
            return setError('Chirp Handle was not set')
        }
        
        setIsLoading(true)
        register!(emailRef.current?.value!, passwordRef.current?.value!, ()=>{setIsLoading(false);goTo('/');return chirpHandleRef.current?.value!}, (reason)=>{setIsLoading(false);setError(reason)})
    }

    return <>
        <PageName name='Register'/>
        <div className={Classes.Card}>
            <div hidden={isLoading} >
                {error && <p className={Classes.Error} >{error}</p>}
                <form className={Classes.Form} onSubmit={handleSubmit}>
                    <InputWithLabel label='Chirp Handle' type='' id='chirp' ref={chirpHandleRef} />
                    <InputWithLabel label='Email' type='email' ref={emailRef} id='email' />
                    <InputWithLabel label='Password' type='password' ref={passwordRef} id='password' />
                    <InputWithLabel label='Repeat Password' type='password' ref={secondPasswordRef} id='repeatpassword' />

                    <Button.Primary type='submit' value='Register'/>
                    <Button.Secondary type='submit' value='Login' onClick={()=>goTo('/login')}  />
                </form>
            </div>
            <div hidden={!isLoading}>
                <Spinner></Spinner>
            </div>
            
        </div>
    </>
}