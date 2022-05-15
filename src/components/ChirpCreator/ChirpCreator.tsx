import Classes from './ChirpCreator.module.css'
import { useAuth } from '../../store/AuthProvider';
import Button from '../Button/Button';
import { useRef } from 'react';


export default function ChirpCreator() {
    const {currentUser, sendChirp} = useAuth()

    const inputRef = useRef<HTMLInputElement>(null)

    function handleSubmit() {
        const input = inputRef.current?.value
        console.log(input)
        if (input) {
            sendChirp!(input)
        }
    }

    return (<>
        {currentUser?.chirprInfo &&
            <div className={Classes.Card}>
                    <img className={Classes.ProfilePicture} src={currentUser.chirprInfo!.pic} alt='' />
                <div className={Classes.Form}>
                    <input id="onYourMing" name='ChirpCreator' contentEditable="true" placeholder="Chirp something!" ref={inputRef} required minLength={3} maxLength={1000} className={Classes.CreateChirpInput} />
                    <Button.Primary value='Chirp!' callback={handleSubmit} className={Classes.Button}/>
                </div>
            </div>
        }
    </>)
}