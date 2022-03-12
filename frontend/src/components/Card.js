import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    function handleClick() {
        onCardClick(card);
    }
    
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;

    const cardDeleteButtonClassName = `element__remove ${isOwn ? 'element__remove_visible' : 'element__remove_hidden'}`;
    
    const isLiked = card.likes.some(like => like === currentUser._id);

    const cardLikeButtonClassName = `element__emotion ${isLiked ? 'element__emotion_active' : 'element__emotion'}`;

    function handleLike() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (

        <li className="element">
        
            <img 
                src={card.link}
                alt={card.name}
                className="element__image"
                onClick={handleClick}
            />
            
            <button
                type="button" aria-label="удалить карточку"
                className={cardDeleteButtonClassName}
                onClick={handleDeleteClick}
            ></button>

            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__rate">
                    <button
                        type="button" aria-label="оценить фото"
                        className={cardLikeButtonClassName}
                        onClick={handleLike}
                    ></button>
                    <h3 className="element__number">{card.likes.length}</h3>
                </div>
                
            </div>
        </li>
    );
}

export default Card;