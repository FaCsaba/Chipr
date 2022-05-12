import Classes from './Header.module.css';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import ChirprContext from '../../store/ChirprContext';


function Header() { // TODO: after we set up states; only show prompt when logged in; change Link to /user+user_id 
    const {isLoggedIn} = useContext(ChirprContext);
    const {pathname} = useLocation()


    return <>
        <header className={Classes.Header}>
            <Link to={'/'} className={Classes.NavigationButton} >
                <p className={pathname === '/' ? Classes.Primary : ''}>Home</p> 
            </Link>
            {isLoggedIn?
                <>
                    <Link to={'/user'} className={Classes.NavigationButton}>
                        <p className={pathname.startsWith('/user') ? Classes.Primary : ''}>Profile</p>
                    </Link>
                    <Link to={'/settings'} className={Classes.NavigationButton}>
                        <p className={pathname.startsWith('/settings') ? Classes.Primary : ''}>Settings</p>
                    </Link>
                </>
                : 
                <>
                    <Link to={'/login'} className={Classes.NavigationButton}>
                        <p className={pathname.startsWith('/login') ? Classes.Primary : ''}>Login</p>
                    </Link>
                    <Link to={'/register'} className={Classes.NavigationButton}>
                        <p className={pathname.startsWith('/register') ? Classes.Primary : ''}>Register</p>
                    </Link>
                </>
                
            }
            <div className={Classes.HamburgerMenu}>
                <GiHamburgerMenu/>     
            </div>
        </header>
    </>
}

export default Header