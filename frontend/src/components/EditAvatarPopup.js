import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const refAvatar = React.useRef();


    function handleSubmit(evt) {

        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: refAvatar.current.value,
        });
    }

    React.useEffect(() =>{
        refAvatar.current.value = '';
    },[props.isOpen])
 


    return (

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          button="add"
          buttonSubmitText={props.buttonSubmitText}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <fieldset className="form__input-container">
                
                <input 
                    type="url" 
                    className="form__item form__item_input_avatar"
                    id="avatar" 
                    name="avatar" 
                    required
                    autoComplete="off"
                    placeholder="Ссылка на аватар"
                    ref={refAvatar}    
                />
                <span id="avatar-error" className="error"></span>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;