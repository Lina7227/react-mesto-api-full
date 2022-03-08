import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleChangeCardName(evt) {
        setCardName(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setCardLink(evt.target.value);
    }

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace ({
            name: cardName,
            link: cardLink
        });
    }


    return (

        <PopupWithForm
          name="edit"
          title="Новое место"
          button="add"
          buttonSubmitText={props.buttonSubmitText}
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
            <fieldset className="form__input-container">
              <input 
                  type="text" 
                  className="form__item form__item_input_title"
                  id="title" 
                  name="name" 
                  required
                  minLength="2"
                  maxLength="30"
                  autoComplete="off"
                  placeholder="Название"
                  value={cardName}
                  onChange={handleChangeCardName}
                />
              <span id="title-error" className="error"></span> 
              <input 
                  type="url" 
                  className="form__item form__item_input_link"
                  id="link" 
                  name="link" 
                  required
                  autoComplete="off"
                  placeholder="Ссылка на картинку"
                  value={cardLink}
                  onChange={handleChangeCardLink}
                />
              <span id="link-error" className="error"></span>
          </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;