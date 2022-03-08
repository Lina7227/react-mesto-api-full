import React from 'react';

function PopupWithForm(props) {
    return (     

        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__content popup__content_${props.name}`}>
                <button type="button" aria-label="закрыть попап" className={`popup__close popup__close_form popup__close_${props.name}`} onClick={props.onClose}></button>
                <form name={`${props.name}`} className={`form form_${props.name}`} onSubmit={props.onSubmit}>
                    <h2 className="form__title">{props.title}</h2>

                    {props.children}

                    <fieldset className="form__handler">
                        <button 
                            type="submit" 
                            className={`form__button form__button_${props.button}`}>{props.buttonSubmitText}
                        </button>
                    </fieldset>
                </form>                
            </div>
        </div>

    );
}

export default PopupWithForm;

