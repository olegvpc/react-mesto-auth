import {useEffect, useState} from "react";
import Header from "./Header.js"
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
    // Стейты для popup (Принимает состояние - открыт-true/не открыт-false)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
    // Стейт для просмотра выбранной карточки
    const [selectedCard, setSelectedCard] = useState({})
    // украшение - изменение визуализации при процессе загрузки API
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(`ошибка получения данных по API при первичном обращении за карточками и юзером ${err}`);
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(item => item._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(responsedCard => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку с сервера
                // записываем новое состояние карты в State и обновляем / рендерим ВСЕ КАРТОЧКИ
                setCards((prev) => prev.map((item) => item._id === card._id ? responsedCard : item));
            })
            .catch((err) => {
              console.log(`ошибка получения данных по API при Лайке ${err}`);
            });;
    }

    function handleCardDelete(card) {
        // Отправляем запрос в API на удаление и получаем подтверждение удаления
        api.deleteCard(selectedCard._id,)
            .then(responseDelete => {
                // console.log(responseDelete.message) // Пост удалён
                // Формируем новый массив на основе имеющегося, не перенося в него удаленную карточку
                // записываем новое состояние карт в State и обновляем / рендерим ВСЕ КАРТОЧКИ
                setCards((prev) => prev.filter((item) => item._id !== card._id));
                closeAllPopups()
            })
          .catch((err) => {
              console.log(`ошибка получения данных по API при удалении ${err}`);
            });
    }

    function handleUpdateUser(newUserData) {
      // console.log(newUserData) // {name: 'Ivanov', about: 'Prog', avatar: 'https://im.o.jpg', _id: '94241e..', cohort: 'cohort-'}
      setIsLoading(true)
      api.setUserInfo(newUserData)
        .then(responseUserData => {
            // console.log(response)
            // Записываем новые данные юзера в State и обновляем страницу
            setCurrentUser(responseUserData)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(`ошибка получения данных по API при изменении юзера ${err}`);
        })
        .finally(() => setIsLoading(false))
    }

    function handleUpdateAvatar(newLinkAvatar) {
        setIsLoading(true)
        // console.log(newLinkAvatar) // получаем объект {avatar: 'https://homediye.jpg'}
        api.updateUserAvatar(newLinkAvatar)
            .then(responseUserData => {
                // console.log(response) // ответ с сервера - полный объект с данными юзера
                setCurrentUser(responseUserData)
                closeAllPopups()
            })
          .catch((err) => {
              console.log(`ошибка получения данных по API при апдейте аватара ${err}`);
            })
            .finally(() => setIsLoading(false))
    }

    function handleAddPlaceSubmit (data)  {
        setIsLoading(true)
        api.addUserCard(data)
            .then((card) => {
            setCards(cards => ([card, ...cards])) // новая карта в начало списка (до первой перезагрузки)
            closeAllPopups()
            })
        .catch((err)=>{
        console.log(`Ошибка при создании новой карточки: ${err}`)
        })
        .finally(() => setIsLoading(false))
    }

    function handleEditProfileClick () {
        setIsEditProfilePopupOpen(true)
    }

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen(true)
    }

    function handleAddPlaceClick () {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick (card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }
    // ----------дополнительное задание - подтверждение удаления
    function handleDeleteClick (card) {
        setIsConfirmDeletePopupOpen(true)
        setSelectedCard(card)
    }
    // ----------дополнительное задание - подтверждение удаления

    function closeAllPopups () {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsImagePopupOpen(false);
      setIsConfirmDeletePopupOpen(false)
      // setSelectedCard({}); // пока не разобрался - но при убирании popup картинка исчезает быстрее креста popupa
    }
    // ------- закрытие всех popup при Esc или клике на popup---------
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isConfirmDeletePopupOpen

    useEffect(() => {
        function closeByEscapeOrOutPopup(evt) {
            if(evt.key === 'Escape' || evt.target.classList.contains("popup")) {
                closeAllPopups();
            }
        }
        if(isOpen) {
            document.addEventListener('keydown', closeByEscapeOrOutPopup);
            document.addEventListener("mousedown", closeByEscapeOrOutPopup);
            return () => {
                document.removeEventListener('keydown', closeByEscapeOrOutPopup);
                document.addEventListener("mousedown", closeByEscapeOrOutPopup)
            }
        }
    }, [isOpen])

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onConfirm={handleDeleteClick}
              cards={cards}
              onCardLike={handleCardLike}
              // onCardDelete={handleCardDelete}

            />
            <Footer />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading} />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading} />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading} />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}/>
            <ConfirmationPopup
                isOpen={isConfirmDeletePopupOpen}
                onClose={closeAllPopups}
                card={selectedCard}
                onCardDelete={handleCardDelete}/>

          </div>
          {/*Конец блока container*/}
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
