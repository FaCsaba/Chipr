import Classes from './Header.module.css';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import {useState} from 'react';
import { useAuth } from '../../store/AuthProvider';


function Header() { // TODO: after we set up states; only show prompt when logged in; change Link to /user+user_id 
    const {currentUser} = useAuth()
    const {pathname} = useLocation();
    const [hideWhenSmall, setHideWhenSmall] = useState(true);

    const hideWhenSmallClass = Classes.HideWhenSmall

    function toggleHideWhenSmall() {
        setHideWhenSmall(!hideWhenSmall)
    }

    function getHeaderButtons() {
        return <>
                <Link to={'/'} className={Classes.NavigationButton + ' ' + (hideWhenSmall && hideWhenSmallClass)} >
                    <p className={pathname === '/' ? Classes.Primary : ''}>Home</p> 
                </Link>
                {currentUser?
                    <>
                        <Link to={'/user'} className={Classes.NavigationButton + ' ' + (hideWhenSmall && hideWhenSmallClass)}>
                            <p className={pathname.startsWith('/user') ? Classes.Primary : ''}>Profile</p>
                        </Link>
                        <Link to={'/settings'} className={Classes.NavigationButton}>
                            <p className={pathname.startsWith('/settings') ? Classes.Primary : ''}>Settings</p>
                        </Link>
                    </>
                    : 
                    <>
                        <Link to={'/login'} className={Classes.NavigationButton + ' ' + (hideWhenSmall && hideWhenSmallClass)}>
                            <p className={pathname.startsWith('/login') ? Classes.Primary : ''}>Login</p>
                        </Link>
                        <Link to={'/register'} className={Classes.NavigationButton + ' ' + (hideWhenSmall && hideWhenSmallClass)}>
                            <p className={pathname.startsWith('/register') ? Classes.Primary : ''}>Register</p>
                        </Link>
                    </>
                    
                }
            </>
    }



    return <>
        <header className={Classes.Header}>
            {getHeaderButtons()}
            <div className={Classes.HamburgerMenu}>
                <GiHamburgerMenu onClick={toggleHideWhenSmall}/>     
            </div>
        </header>
    </>
}

export default Header