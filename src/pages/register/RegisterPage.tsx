import PageName from '../../components/PageName/PageName';

import Classes from './Register.module.css';

import React, {useRef, useState, useEffect} from 'react';
import InputWithLabel from '../../components/InputWithLabel/InputWithLabel';
import { useAuth } from '../../store/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';


export default function RegisterPage() {

    const { register, currentUser } = useAuth()
    const goTo = useNavigate()

    useEffect(()=>{
        if (currentUser) {
            return goTo('/')
        }
    })

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef= useRef<HTMLInputElement>(null)
    const secondPasswordRef = useRef<HTMLInputElement>(null)

    const [errObj, setErrObj] = useState<{hidden: boolean, err: string | null}>({hidden: true, err: null})
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (passwordRef.current?.value !== secondPasswordRef.current?.value) {
            setErrObj({hidden: false, err: 'Passwords do not match!'})
            return
        }
        
        setIsLoading(true)
        try {
            setErrObj({hidden: true, err: null})
            await register!(emailRef.current?.value!, passwordRef.current?.value!)
        } catch(error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return <>
        <PageName name='Register'/>
        <div className={Classes.Card}>
            <div hidden={isLoading} >
                <p className={Classes.Error} hidden={errObj.hidden} >{errObj.err}</p>
                <form className={Classes.Form} onSubmit={handleSubmit}>
                    <InputWithLabel label='Email' type='email' ref={emailRef} id='email' />
                    <InputWithLabel label='Password' type='password' ref={passwordRef} id='password' />
                    <InputWithLabel label='Repeat Password' type='password' ref={secondPasswordRef} id='repeatpassword' />

                    <Button.Primary type='submit' value='Register'/>
                    <Button.Secondary type='submit' value='Login' callback={()=>goTo('/login')}  />
                </form>
            </div>
            <div hidden={!isLoading}>
                <Spinner></Spinner>
            </div>
            
        </div>
    </>
}