import Chirp from '../Chirp/Chirp';
import Classes from './ChirpList.module.css';
import { ChirpItem } from '../../store/ChirpProvider';


export default function ChirpListing({chirps}: {chirps: ChirpItem[] | undefined}) {

    return (<>
    {chirps &&
    <>
        <div className={Classes.ChirpList}>
            {chirps.map((chirp, i) => {return <Chirp key={i} chirp={chirp} animationDelay={String(i*.1+.1)+'s'}/> })}
        </div>
    </>
    }
    {(chirps === undefined || chirps?.length === 0) && <p>There are no chirps</p>}    
    </>)
}