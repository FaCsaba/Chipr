import Classes from "./ProfileOverview.module.css";
import { ChirpUser } from '../../store/ChirpProvider';
import Button from '../Button/Button';
import {useState} from 'react';
import ChangeProfile from '../ChangeProfile/ChangeProfile';

function ProfileOverview({user}: {user: ChirpUser}) {
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
                    <Button.Secondary onClick={()=>setIsChangingProfile(true)} className={Classes.ChangeProfileButton} value='Change profile'/>
                </div>
                <span className={Classes.Blurb}>
                {user.blurb? 
                user.blurb:
                <span style={{color: '#5a4c74'}}>Try adding a blurb!</span>
                }</span>
            </div>
            {isChangingProfile &&
                <ChangeProfile user={user} onClose={()=>setIsChangingProfile(false)}/>
            }
        </div>
    )
}

export default ProfileOverview