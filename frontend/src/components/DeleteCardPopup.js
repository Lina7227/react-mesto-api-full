import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

    function handleSubmit(evt){
      evt.preventDefault();
      props.onSubmitDeleteCard(props.card)
    }

    return (

        <PopupWithForm
          name="remove"
          title="Вы уверены?"
          button="add-remove"
          buttonSubmitText={props.buttonSubmitText}
          isOpen = {props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        />

    )
}

export default DeleteCardPopup;