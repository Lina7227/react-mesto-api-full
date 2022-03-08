import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription ] = React.useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description
        });
    }
    

    return (

        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          button="add"
          buttonSubmitText={props.buttonSubmitText}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <fieldset className="form__input-container">
              <input 
                  type="text" 
                  className="form__item form__item_input_name" 
                  id="firstname"
                  name="name"
                  required
                  minLength="2"
                  maxLength="40" 
                  autoComplete="off"
                  placeholder="Имя"
                  value={name|| ''}
                  onChange={handleChangeName}
                  />
              <span id="firstname-error" className="error"></span>
              <input 
                  type="text" 
                  className="form__item form__item_input_job" 
                  id="jobname"
                  name="job"
                  required
                  minLength="2"
                  maxLength="200"
                  autoComplete="off"
                  placeholder="введите свою специальность"
                  value={description || ''}
                  onChange={handleChangeDescription}
                  />
              <span id="jobname-error" className="error"></span>
          </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;