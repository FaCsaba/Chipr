import ChirpListing from '../../components/ChirpList/ChirpList';
import Style from './Index.module.css';
import PageName from '../../components/PageName/PageName';


function MainPage() {


    return <>
        <div className={Style.Main}>
            <PageName name='Home'/>
            <ChirpListing/>
        </div>
    </>
}

export default MainPage