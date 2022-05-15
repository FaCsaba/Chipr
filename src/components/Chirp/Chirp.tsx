import {ChirpItem} from '../../store/ChirpProvider';
import Classes from './Chirp.module.css'
import { useContext } from 'react';
import ChirpContext from '../../store/ChirpProvider';
import { Link } from 'react-router-dom';

interface ChirpProps {
    chirp: ChirpItem,
    animationDelay: string
}

export default function Chirp({chirp, animationDelay}: ChirpProps) {
    const { users } = useContext(ChirpContext)

    const user = users.find(user => {return user.id === chirp.userId})

    return (<>
        {users && user &&
            <div className={Classes.Card} style={{animationDelay: animationDelay}}>
                    <img className={Classes.ProfilePicture} src={user.pic} alt='' />
                <div className={Classes.Substance}>
                    <Link className={Classes.UserInfoBar} to={'/user/@'+user.chirpHandle}>
                        <p className={Classes.Username}>{user.username}</p>
                        <p className={Classes.Handle}>@{user.chirpHandle}</p>
                    </Link>
                    <p className={Classes.Text}>{chirp.textcontent}</p>
                </div>
            </div>
        }
    </>)
}