import logoPath from "../images/logo.svg";
// import { useLocation } from 'react-router';
import { useState } from "react";


// import logoReactPath from "../images/logo-react.svg"

function Header ({ isWrapped, children }) {
    // const location = useLocation()

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    // useEffect(() => {
    //     console.log(isMenuOpened)
    // }, [isMenuOpened])

      function handleOpenInfo() {
        setIsMenuOpened((prev) => !prev);
      }
    return (
        <div className={isWrapped && 'add-wrapped-class'}>
            <header className={`page__header header ${!isMenuOpened && "header__navs_closed"}`}>

                <div className="header__wrapped-logo">
                    <img className="header__logo transition" src={logoPath}
                         alt="логотип сайта Место" />
                     {/*<img className="header__logo-react" src={logoReactPath} alt="Логотип React"/>*/}
                    <button
                      type="button"
                      className={(isMenuOpened ? " header__btn-close" : "header__btn-open")}
                      aria-label="Открыть/закрыть инфо"
                      onClick={handleOpenInfo}
                    />
                </div>

                <div className="header__navs">
                    {children}
                </div>

           </header>
        </div>



    );
}
export default Header;