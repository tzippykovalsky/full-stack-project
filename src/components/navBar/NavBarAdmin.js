const NavBarAdmin = () => {
    return (
    <ul className="nav-links">
        <li className="nav-item"><a href="/all-products/">כל החנות</a></li>
        <li className="nav-item"><a href="/addProductToSite">הוספת מוצר</a></li>
        <li className="nav-item"><a href="/ordersList">הזמנות</a></li>
        <li className="nav-item"><a href="/chatAdmin">שירות לקוחות</a></li>
    </ul>
    );
}

export default NavBarAdmin;