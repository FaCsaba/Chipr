import Chirp from "../Chirp/Chirp"
import Style from './ChirpList.module.css'
import { useChirps } from "../../store/ChirpProvider";


export default function ChirpListing() {
    const { chirps, users } = useChirps()

    return (<>
    {chirps && users &&
    <>
        <div className={Style.TodoList}>
            {chirps.map((chirp, i) => {return <Chirp key={i} chirp={chirp}/>})}
        </div>
    </>
    }
    {chirps === undefined && <p>There are no chirps</p>}    
    </>)
}