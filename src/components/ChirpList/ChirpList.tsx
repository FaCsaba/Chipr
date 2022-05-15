import Chirp from '../Chirp/Chirp';
import Classes from './ChirpList.module.css';
import { useChirps } from "../../store/ChirpProvider";
import ChirpCreator from '../ChirpCreator/ChirpCreator';


export default function ChirpListing() {
    const { chirps, users } = useChirps()

    return (<>
    <ChirpCreator />
    {chirps && users &&
    <>
        <div className={Classes.ChirpList}>
            {chirps.map((chirp, i) => {return <Chirp key={i} chirp={chirp} animationDelay={String(i*.1+.1)+'s'}/> })}
        </div>
    </>
    }
    {chirps === undefined && <p>There are no chirps</p>}    
    </>)
}