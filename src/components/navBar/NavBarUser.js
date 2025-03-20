import { Link } from "react-router-dom";

const NavBarUser = () => {
    return (<>
        <ul className="nav-links">
            <li className="nav-item">  <Link to={`/all-products/`} >כל החנות</Link></li>
            <li className="nav-item">   <Link to={`/category/?category=סלון ואוירה`}>סלון ואוירה</Link></li>
            <li className="nav-item">   <Link to={`/category/?category=מטבח`} > מטבח</Link></li>
            <li className="nav-item">   <Link to={`/category/?category=העיצובים שלנו`} >העיצובים שלנו</Link></li>
            <li className="nav-item">   <Link to={`/category/?category=כלים`} >כלים</Link></li>
            <li className="nav-item">   <Link to={`/category/?category=שולחן ואירוח`} >שולחן ואירוח</Link></li>
            <li className="nav-item">   <Link to={`/`}>דף הבית</Link></li>
        </ul>

    </>);
}

export default NavBarUser;       