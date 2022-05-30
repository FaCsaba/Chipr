import { ChirpItem, ChirpUser } from '../../store/ChirpProvider';
import Classes from './Chirp.module.css'
import { useContext, useRef } from 'react';
import ChirpContext from '../../store/ChirpProvider';
import { Link } from 'react-router-dom';
import PictureHolder from '../PrictureHolder/PictureHolder';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {useState} from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { useAuth } from '../../store/AuthProvider';

interface ChirpProps {
    chirp: ChirpItem,
    animationDelay: string
    isDeletable: boolean
}

function disableScroll() {
    // Get the current page scroll position
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;

        // if any scroll is attempted,
        // set this to the previous value
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function() {};
}

export default function Chirp({chirp, animationDelay, isDeletable}: ChirpProps) {
    const {currentUser} = useAuth()
    const { users, deleteChirp } = useContext(ChirpContext)
    const [isPopupHidden, setIsPopupHidden] = useState<boolean>(true)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [currentViewedImage, setCurrentViewedImage] = useState<number | null>(null); 

    const imageRef = useRef<HTMLImageElement>(null)

    const user = users?.find((user: ChirpUser | undefined) => {return user?.id === chirp.userId})

    function togglePopup() {
        setIsPopupHidden(!isPopupHidden);
    }
    

    function handleImageClick(target: number) {
        setCurrentViewedImage(target)
        disableScroll()
    }

    return (<>
        {users && user &&
        <>  {!isPopupHidden &&
                <div className={Classes.Backdrop} onClick={()=>{setIsPopupHidden(true)}}/>
            }       
            <div className={Classes.Card} style={{animationDelay: animationDelay}}>
                    <img className={Classes.ProfilePicture} src={user.pic} alt='' />
                <section className={Classes.Substance}>
                    <div className={Classes.UserInfoBar}>
                        <Link className={Classes.UserLink} to={'/user/@'+user.chirpHandle}>
                            <p className={Classes.Username}>{user.username}</p>
                            <p className={Classes.Handle}>{'@'+decodeURIComponent(user.chirpHandle)}</p>
                        </Link> 
                        {currentUser?.chirprInfo?.id === user.id && isDeletable &&
                            <BsThreeDotsVertical className={Classes.ExtraDots} id="dots" onClick={()=>togglePopup()} />
                        }
                    </div>
                    
                    {!isPopupHidden &&  // from a UX perspective having to click on the dots again is really 
                                        // bad but I cant get the z index to work nicely with the popup button
                        <div className={Classes.Popup} onClick={()=>{setIsPopupHidden(true)}}>
                            <Button.Secondary className={Classes.DeleteButton} value='Delete Chirp' onClick={()=>setIsDeleting(true)}/>
                        </div>
                    }

                    <p className={Classes.Text}>{chirp.textcontent}</p>
                    <PictureHolder.Basic images={chirp.imgcontent} click={(t)=>handleImageClick(t)}/>
                </section>
                
            </div>
            {isDeleting &&
                <Modal onCancel={()=>setIsDeleting(false)}>
                    <div style={{display: 'flex', gap: '20px', flexDirection: 'column'}}>
                    <p style={{color: 'var(--text-color)', fontSize: '20px', fontWeight: '500'}}>Are you sure you want to delete this chirp?</p>
                    <Chirp chirp={chirp} animationDelay='0' isDeletable={false}></Chirp>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                        <Button.Secondary className={Classes.DeleteButton} value='DELETE' onClick={()=>{deleteChirp(chirp.id);setIsDeleting(false)}}/>
                        <Button.Primary className={Classes.CancelButton} value='Cancel' onClick={()=>setIsDeleting(false)}/>
                    </div>
                    </div>
                </Modal>}
            {currentViewedImage !== null && 
            <>
                {currentViewedImage !== 0 &&
                    <Button.Secondary className={Classes.NavigateLeft} value='<' onClick={()=>{setCurrentViewedImage(o=>o!-1)}}/>}

                <div className={Classes.ImageBackDrop1} onClick={()=>{setCurrentViewedImage(null);enableScroll()}}/>
                <img src={chirp.imgcontent[currentViewedImage]} alt='' className={Classes.ImageBackDrop2} onClick={()=>{setCurrentViewedImage(null);enableScroll()}}/>
                <img src={chirp.imgcontent[currentViewedImage]} alt='' className={Classes.Image} ref={imageRef}/>
                <Button.Secondary className={Classes.ExitButton} value='X' onClick={()=>{setCurrentViewedImage(null);enableScroll()}}/>

                {currentViewedImage !== chirp.imgcontent.length - 1 &&
                    <Button.Secondary className={Classes.NavigateRight} value='>' onClick={()=>{setCurrentViewedImage(o=> o!+1)}}/>}
            </>}
        </>}
    </>)
}