import logoPath from "../images/logo.svg";
import logoReactPath from "../images/logo-react.svg"


function Header () {
    return (
        <header className="page__header header">
            <img className="header__logo transition" src={logoPath}
                 alt="логотип сайта Место" />
            {/* <img className="header__logo-react" src={logoReactPath} alt="Логотип React"/> */}
        </header>
    );
}
export default Header;