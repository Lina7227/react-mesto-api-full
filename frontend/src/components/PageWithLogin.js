import React from 'react';
import { Link, useLocation } from "react-router-dom";

function PageWithLogin(props) {

    const location = useLocation();
    const isLocationSignUp = location.pathname === "/sign-up";
    const [ values, setValues ] = React.useState({});
    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setValues({...values, [name]: value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit({email: values.email, password: values.password})
    }

    return (

        <div className="auth">
            <h2 className="auth__welcome">
                {props.title}
            </h2>
            <form 
                onSubmit={handleSubmit}
                name={`${props.name}`} 
                className="auth__form"
                noValidate

            >Email
                <label htmlFor="email" className="auth__label">
                    <input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={values.email || ""}
                    className="auth__input"  
                    placeholder="Email"
                    required
                    minLength="2"
                    maxLength="30"
                    onChange={handleChange} 
                    />
                </label>
                
                <label htmlFor="password" className="auth__label">
                    <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="auth__input"
                    placeholder="Пароль"
                    value={values.password || ""}
                    required
                    minLength="6"
                    maxLength="20"
                    onChange={handleChange} 
                    />
                </label>
                <button 
                    type="submit" 
                    className="auth__button">
                    {props.buttonText}
                </button>
            </form>

            {isLocationSignUp && (
                <div className="auth__signin">
                    <p className="auth__text">Уже зарегистрированы? </p>
                    <Link to={"/sign-in"} className="auth__login-link">Войти</Link>
                </div>
            )}
        </div>

    );
}

export default PageWithLogin;