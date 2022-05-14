import Todo from "../Chirp/Chirp"
import Style from './ChirpList.module.css'
import ChirprContext from "../../store/ChirprContext";
import { useContext } from "react";


export default function Listing() {
    const { chirps, users } = useContext(ChirprContext)

    return (<>
    {chirps && users &&
    <>
        <div className={Style.TodoList}>
            {chirps.map((chirp, i) => {return <Todo key={i} chirp={chirp}/>})}
        </div>
    </>
    }
    {chirps === undefined && <p>There are no chirps</p>}    
    </>)
}