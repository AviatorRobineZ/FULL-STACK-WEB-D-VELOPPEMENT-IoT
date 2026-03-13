import moncv from '../assets/mon-cv.pdf';
import { useTheme } from '../context/ThemeContext';
import {NavLink} from 'react-router-dom'
const Header = () => {
    const {theme, toggleTheme } = useTheme();

    return(
        <header>
            <h1>Laine Mamy Soumaoro</h1>
            <nav>
                 <ul>
                    <li><NavLink to='/'>Accueil</NavLink></li>
                    <li><NavLink to='/projects'>Projets</NavLink></li>
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                    <li><NavLink to='Contact'>Contact</NavLink></li>
                </ul>
            </nav>
            <a href={moncv} >Telecharger mon CV </a> <br />

            <button onClick={toggleTheme}>
                {theme === "light"? "Dark Mode": "Light Mode"}
            </button>
           
        </header>
    );
};


export default Header;