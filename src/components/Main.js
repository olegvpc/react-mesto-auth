import { useContext } from "react";
import Card from "../components/Card.js"
import Header from "./Header";
import Footer from "./Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main ({ onEditProfile,
                   onEditAvatar,
                   onAddPlace,
                   onCardClick,
                   cards,
                   onCardLike,
                   onCardDelete,
                   onConfirm,
                   userEmailOnHeader,
                   onSignOut,
               }) {
    //Подписка на контекст CurrentUserContext
    const currentUser = useContext(CurrentUserContext);


    return (
        <>
            <Header
                isWrapped={true}
                >
                    <p className="header__navs_link header__navs_email">{userEmailOnHeader}</p>
                    <button href="#" className="header__navs_link transition header__navs_logout" onClick={onSignOut}>
                        Выйти
                    </button>
            </Header>
            <main className="page__main content">
              <section className="profile">
                <div className="profile__avatar-container">
                  <img className="profile__avatar"
                       src={currentUser.avatar}
                       alt="Аватар профиля" />
                    <button type="button"
                            className="profile__avatar-btn"
                            aria-label="Обновить аватар"
                            onClick={onEditAvatar}/>
                </div>
                <div className="profile__info">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button className="profile__edit-btn transition"
                          title="Редактировать профиль"
                          type="button"
                          onClick={onEditProfile}/>
                  <p className="profile__about">{currentUser.about}</p>
                  {/*Перенос текста должен превращаться в точки*/}
                </div>
                <button className="profile__add-btn transition"
                        title="Добавить новую фотографию"
                        type="button"
                        onClick={onAddPlace}/>
              </section>

              <section className="cards">
                <ul className="cards__list">

                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            onConfirm={onConfirm}
                        />
                        ))
                    }

                </ul>
              </section>

            </main>
            <Footer/>
        </>

    )
}

export default Main