import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__edit-avatar">
                    <img src={`${currentUser.avatar}`} alt="автарка пользователя" className="profile__avatar"/>
                    <button type="button" aria-label="открыть поле добавления аватарки" onClick={onEditAvatar} className="profile__avatar-button"></button>
                </div>
                
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                    
                    <button type="button" aria-label="открыть попап" className="profile__edit-button" onClick={onEditProfile}></button> 
                </div>
                <button type="button" aria-label="открыть поле добавления фото" className="profile__add-button" onClick={onAddPlace}></button>
            </section>  


            <section className="elements">
                <ul className="elements__table">
                    {cards.slice(0).reverse().map((card) => (
                        
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        )
                    )}

              
                </ul>

            </section>
      

        </main>
    );
}

export default Main;