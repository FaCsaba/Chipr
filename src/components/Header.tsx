import Classes from './Header.module.css';

function Header() {
    return <>
        <header className={Classes.Header}>
            <p className={Classes.Title}>TODO App</p>
        </header>
    </>
}

export default Header