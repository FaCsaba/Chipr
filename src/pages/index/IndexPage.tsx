import ChirpListing from '../../components/ChirpList/ChirpList';
import Style from './Index.module.css';
import PageName from '../../components/PageName/PageName';
import { useChirps } from '../../store/ChirpProvider';
import ChirpCreator from '../../components/ChirpCreator/ChirpCreator';


function MainPage() {
    const {chirps} = useChirps()


    return <>
        <div className={Style.Main}>
            <PageName name='Home'/>
            <ChirpCreator />
            <ChirpListing chirps={chirps}/>
        </div>
    </>
}

export default MainPage