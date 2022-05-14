import Header from '../components/Header/Header';
import MainPage from './index/IndexPage';
import SettingsPage from './settings/SettingsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import LoginPage from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import Classes from '../App.module.css'
import PageName from '../components/PageName/PageName';
import { useAuth } from '../store/AuthProvider';
import Spinner from '../components/Spinner/Spinner';
import PrivateRoute from './PrivateRoute';

function Routing() {

    const {isLoadingCurrentUser} = useAuth()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                {!isLoadingCurrentUser &&
                    <div className={Classes.Main}>
                        <Routes>
                            <Route path='/' element={<MainPage/>} />
                            
                            <Route path='/settings' element={<PrivateRoute><SettingsPage/></PrivateRoute>}/>
                            <Route path='/user/*' element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>

                            <Route path='/login' element={<LoginPage/>}/>
                            <Route path='/register' element={<RegisterPage/>}/>
                            
                            <Route path='/*' element={<PageName name='Are you lost?'/>}/>
                        </Routes>
                    </div>
                }
                {isLoadingCurrentUser && <Spinner/>}
            </div>
        </BrowserRouter>
    )
}

export default Routing