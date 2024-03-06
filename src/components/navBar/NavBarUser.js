import { Link } from "react-router-dom";

const NavBarUser = () => {
    return (<>
        <ul className="nav-links">
            <li className="nav-item">  <Link to={`/all-products/`} >כל החנות</Link></li>
            <li className="nav-item">   <Link to={`/livingRoom/`} state={"סלון ואוירה"}>סלון ואוירה</Link></li>
            <li className="nav-item">   <Link to={`/kitchen/`} state={"מטבח"}> מטבח</Link></li>
            <li className="nav-item">   <Link to={`/design/`} state={"העיצובים שלנו"}>העיצובים שלנו</Link></li>
            <li className="nav-item">   <Link to={`/dishes/`} state={"כלים"}>כלים</Link></li>
            <li className="nav-item">   <Link to={`/table/`} state={"שולחן ואירוח"}>שולחן ואירוח</Link></li>
            <li className="nav-item">   <Link to={`/`}>דף הבית</Link></li>
        </ul>

    </>);
}

export default NavBarUser;       