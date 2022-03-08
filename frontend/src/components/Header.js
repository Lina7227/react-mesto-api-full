import logo from '../images/logo.svg';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Header(props) {

    const location = useLocation();
    const islocationSignIn = location.pathname === "/sign-in";
    const islocationBasic = location.pathname === "/";
    const [isMenu, setMenu] = React.useState(false);

    function handleSignOut() {
        props.onSignOut();
        setMenu(false);
    }

    function handleSignIn() {
        
    }

    function handleMenu () {
        setMenu(true);
    }

    function handleMenuClose() {
        setMenu(false);
    }

    return (
        <header className={`header ${!isMenu ? "header__block" : ""} ${isMenu ? "header__column" : "" }`}>

            <div className={`header__container ${isMenu ? "header__container_column" : "" } `}>
                <img src={logo} alt="Логотип" className="header__logo"/>
                <button type="button" aria-label="Закрыть меню" onClick={handleMenuClose} className={`popup__close popup__close_form popup__close_menu ${isMenu ? "popup__close_active" : "" }`}></button>
            </div>

            <div className={`header__burger-menu ${(!props.islogOn || isMenu) ? "header__burger-menu_inactive" : ""}`} onClick={handleMenu}>
                <div className="header__burger-item"></div>
                <div className="header__burger-item"></div>
                <div className="header__burger-item"></div>
            </div>

            { (!props.isLoading || islocationBasic) &&
                <nav className={`header__nav-menu ${props.islogOn && !isMenu ? "header__nav-menu_inactive" : ""} ${isMenu ? "header__nav-menu_column" : ""} `}>
                    <p className="header__email">{props.islogOn ? props.userEmail : "" }</p>
                    {!islocationSignIn ?
                    <NavLink onClick={!props.islogOn ? handleSignIn : handleSignOut} className={`header__nav-item ${islocationBasic ? "header__nav-item_active" : "header__nav-item_mob"}`} to={"/sign-in"}>{props.islogOn ? "Выйти" : "Войти"}</NavLink>
                    :
                    <NavLink className="header__nav-item header__nav-item_mob" activeClassName="header_nav-item_active" to={"/sign-up"}>{!props.islogOn ? "Регистрация" : ""}</NavLink>
                    }
                </nav>
            }


        </header>

    );
}

export default Header;