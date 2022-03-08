import React from 'react';

function ImagePopup({card, onClose}) {
    
    return (
        <div className={`popup popup_images ${card.link ? "popup_opened" : "" }`}>

            <div className="popup__content popup__content_image">
                <button type="button" aria-label="закрыть попап" className="popup__close popup__close_image" onClick={onClose}></button>
                <figure>
                    <img src={card.link} alt={card.name} className="popup__image"/>
                    <figcaption className="popup__title">{card.name}</figcaption>
                </figure>
            </div>
                
        </div>
    );
}

export default ImagePopup;