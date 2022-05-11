import Listing from '../components/TodoList';
import Style from './main.module.css';


function MainPage() {
    return <><div className={Style.Main}><Listing/></div></>
}

export default MainPage