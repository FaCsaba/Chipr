import { ChirpItem } from '../components';
import Classes from './Chirp.module.css'
import { useContext } from 'react';
import ChirprContext from '../../store/ChirprContext';

interface ChirpProps {
    chirp: ChirpItem
}

export default function Todo({chirp}: ChirpProps) {
    const { users } = useContext(ChirprContext)



    return (<>
        {users && users[chirp.user] &&
            <div className={Classes.Card}>
                    <img className={Classes.ProfilePicture} src={users[chirp.user].pic} alt='' />
                <div className={Classes.Substance}>
                    <p className={Classes.Username}>{users![chirp.user].username}</p>
                    <p className={Classes.Text}>{chirp.content.content}</p>
                </div>
            </div>
        }
    </>)
}