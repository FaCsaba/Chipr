import { ChirpItem } from '../components';
import Classes from './Chirp.module.css'
import { useContext } from 'react';
import ChirprContext from '../../store/ChirprContext';
import { Link } from 'react-router-dom';

interface ChirpProps {
    chirp: ChirpItem
}

export default function Chirp({chirp}: ChirpProps) {
    const { users } = useContext(ChirprContext)



    return (<>
        {users && users[chirp.user]  &&
            <div className={Classes.Card}>
                    <img className={Classes.ProfilePicture} src={users[chirp.user].pic} alt='' />
                <div className={Classes.Substance}>
                    <Link to={'/user/'+chirp.user}>
                        <p className={Classes.Username}>{users![chirp.user].username}</p>
                    </Link>
                    <p className={Classes.Text}>{chirp.textcontent}</p>
                </div>
            </div>
        }
    </>)
}