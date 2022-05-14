import {ChirpItem} from '../../store/ChirpProvider';
import Classes from './Chirp.module.css'
import { useContext } from 'react';
import ChirpContext from '../../store/ChirpProvider';
import { Link } from 'react-router-dom';

interface ChirpProps {
    chirp: ChirpItem
}

export default function Chirp({chirp}: ChirpProps) {
    const { users } = useContext(ChirpContext)

    const user = users.find(user => {return user.id === chirp.userId})

    return (<>
        {users && user &&
            <div className={Classes.Card}>
                    <img className={Classes.ProfilePicture} src={user.pic} alt='' />
                <div className={Classes.Substance}>
                    <Link to={'/user/@'+user.chirpHandle}>
                        <p className={Classes.Username}>{user.username}</p>
                    </Link>
                    <p className={Classes.Text}>{chirp.textcontent}</p>
                </div>
            </div>
        }
    </>)
}