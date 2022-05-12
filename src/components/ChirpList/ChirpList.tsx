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
            {Object.keys(chirps).map(key=>{return <Todo key={key} chirp={chirps[key]}/>})}
        </div>
    </>
    }
    {chirps === undefined && <p>There are no chirps</p>}    
    </>)
}