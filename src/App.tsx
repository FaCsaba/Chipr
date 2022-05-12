import React from 'react';
import './App.module.css';

import Header from './components/Header/Header';
import MainPage from './pages/index/IndexPage';
import SettingsPage from './pages/settings/SettingsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profile/ProfilePage';
import { ChirprProvider } from './store/ChirprContext';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import Classes from './App.module.css'

function App() {
  return (
    <ChirprProvider>
      <BrowserRouter>
        <div className="App">
          <Header/>
            <div className={Classes.Main}>
              <Routes>
                  <Route path='/' element={<MainPage/>} />
                  <Route path='/settings' element={<SettingsPage/>}/>
                  <Route path='/user/*' element={<ProfilePage/>}/>
                  <Route path='/login' element={<LoginPage/>}/>
                  <Route path='/register' element={<RegisterPage/>}/>
                  <Route path='/*' element={<>Are you lost?</>}/>
              </Routes>
            </div>
        </div>
      </BrowserRouter>
    </ChirprProvider>
  );
}

export default App;
