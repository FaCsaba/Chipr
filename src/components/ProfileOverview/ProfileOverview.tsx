import Classes from "./ProfileOverview.module.css";
import { ChirpUser } from '../../store/ChirpProvider';
import Button from '../Button/Button';
import {useState} from 'react';
import ChangeProfile from '../ChangeProfile/ChangeProfile';
import { useAuth } from '../../store/AuthProvider';

function ProfileOverview({user}: {user: ChirpUser}) {
    const {currentUser} = useAuth()
    const [isChangingProfile, setIsChangingProfile] = useState<boolean>(false)

    return (
        <div className={Classes.Wrapper}>
            <div style={{width: '200px', height: '200px', margin: '0 auto'}}>
                <img className={Classes.ProfilePicture} src={user.pic} alt='' />
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "20px", width: '100%'}}>
                <div style={{display: "flex", width: '100%', flexWrap: 'wrap'}}>
                    <p className={Classes.Username}>{user.username}</p>
                    <p className={Classes.Handle}>{"@"+user.chirpHandle}</p>
                    {currentUser?.chirprInfo?.id === user.id &&
                        <Button.Secondary onClick={()=>setIsChangingProfile(true)} className={Classes.ChangeProfileButton} value='Change profile'/>
                    }
                </div>
                <span className={Classes.Blurb}>
                {!user.blurb && currentUser?.chirprInfo?.id === user.id? 
                    <span style={{color: '#5a4c74'}}>Try adding a blurb!</span>
                        :
                    user.blurb
                }</span>
            </div>
            {isChangingProfile &&
                <ChangeProfile user={user} onClose={()=>setIsChangingProfile(false)}/>
            }
        </div>
    )
}

export default ProfileOverview