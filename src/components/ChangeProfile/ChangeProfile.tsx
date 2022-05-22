import Classes from './ChangeProfile.module.css';
import UploadImage from '../UploadImage/UploadImage';
import { useState, useRef } from 'react';
import { ChirpUser } from '../../store/ChirpProvider';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import Button from '../Button/Button';
import { useAuth } from '../../store/AuthProvider';

function ChangeProfile({user, onClose}: {user: ChirpUser, onClose: ()=>void}) {
    const [isUploadImagePresent, setIsUploadImagePresent] = useState<boolean>(false)
    const [srcFile, setSrcFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string>('')
    const fileRef = useRef<HTMLInputElement>(null)

    const usernameRef = useRef<HTMLInputElement>(null)
    const blurbRef = useRef<HTMLInputElement>(null)

    const {sendBlurb, sendUsername, sendProfilePicture} = useAuth()

    function handleFileInput() {
        if (!fileRef.current?.files) return

        setSrcFile(fileRef.current.files[0])
        setIsUploadImagePresent(true)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (blurbRef.current?.value) sendBlurb(blurbRef.current?.value)
        if (usernameRef.current?.value) sendUsername(usernameRef.current.value)
        if (imageUrl) sendProfilePicture(imageUrl)
        onClose()
    }

    return (
    <>
        <div className={Classes.Backdrop} onClick={onClose}/>
        <div className={Classes.ChangeForm}>
            <div>
                <div style={{position: 'relative', width: 200, height: 200, objectFit: 'cover', margin: '0 auto'}}>
                    {isUploadImagePresent && srcFile? 
                        <UploadImage srcFile={srcFile} onCloudUrl={(cloudUrl)=>setImageUrl(cloudUrl)} className={Classes.ProfilePicture} onCancel={()=>{setSrcFile(null); setImageUrl('')}} onClick={()=>fileRef.current?.click()}/>  
                        
                            :
                        
                        <img className={Classes.ProfilePicture} src={user.pic} alt='' onClick={()=>fileRef.current?.click()}/>
                    }
                    <Button.Picture className={Classes.ProfileChangeCameraButton} onClick={()=>fileRef.current?.click()}/>
                </div>
                <input type="file" hidden onInput={handleFileInput} ref={fileRef} accept="image/*" />
            </div>

            <form className={Classes.Form} onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "20px", width: '100%'}}>
                
                <InputWithLabel label='Username' isRequired={false} type='' ref={usernameRef} id='name' defaultValue={user.username}/>
                <InputWithLabel label='Blurb about yourself!' isRequired={false} type='' ref={blurbRef} id='blurb' defaultValue={user.blurb}/>

                <Button.Primary type='submit' value='Send'/>
            </form>
            <Button.Secondary value='X' className={Classes.CancelButton} onClick={onClose}/>
        </div>
    </>)
}

export default ChangeProfile