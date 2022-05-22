import ChirpListing from '../../components/ChirpList/ChirpList';
import PageName from '../../components/PageName/PageName';
import { useChirps } from '../../store/ChirpProvider';
import ChirpCreator from '../../components/ChirpCreator/ChirpCreator';


function MainPage() {
    const {chirps} = useChirps()


    return <>
            <PageName name='Home'/>
            <ChirpCreator />
            <ChirpListing chirps={chirps}/>
    </>
}

export default MainPage