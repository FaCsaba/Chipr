import Classes from './Header.module.css';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ChirprContext from '../../store/ChirprContext';


function Header() { // TODO: after we set up states; only show prompt when logged in; change Link to /user+user_id 
    const {isLoggedIn} = useContext(ChirprContext);



    return <>
        <header className={Classes.Header}>
            <Link to={'/'} className={Classes.NavigationButton} >
                <p className={Classes.Primary}>Home</p>
            </Link>
            {isLoggedIn &&
                <>
                    <Link to={'/user'} className={Classes.NavigationButton}>
                        <p >Profile</p>
                    </Link>
                    <Link to={'/settings'} className={Classes.NavigationButton}>
                        <p>Settings</p>
                    </Link>
                </>
            }
            <Link to={'/login'} className={Classes.NavigationButton}>
                <p>Login</p>
            </Link>
            <Link to={'/register'} className={Classes.NavigationButton}>
                <p>Register</p>
            </Link>
            <div className={Classes.HamburgerMenu}>
                <GiHamburgerMenu/>     
            </div>
        </header>
    </>
}

export default Header