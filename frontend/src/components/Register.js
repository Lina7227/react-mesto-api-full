import React from 'react';
import PageWithLogin from './PageWithLogin';

function Register(props) {
    

    return (

        <PageWithLogin
            title="Регистрация"
            name="register"
            buttonText="Зарегистрироваться"
            onSubmit={props.onSubmitRegister}
        />
    )
}

export default Register;