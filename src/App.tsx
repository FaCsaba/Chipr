import React from 'react';
import './App.css';

import Header from './components/Header/Header';
import MainPage from './pages/main/MainPage';
import SettingsPage from './pages/settings/SettingsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/profile/ProfilePage';
import { ChirprProvider } from './store/ChirprContext';

function App() {
  return (
    <ChirprProvider>
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/settings' element={<SettingsPage/>}/>
            <Route path='/user/*' element={<ProfilePage/>}/>
            <Route path='/*' element={<>Are you lost?</>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </ChirprProvider>
  );
}

export default App;
