import "../../styles/footer.css";

const Footer = () => {
    return (

        <footer class="footer">
            <div class="footer-content">
                <h2 class="footer-heading">מועדון לקוחות</h2>
                <p>לקבלת עדכונים על מוצרים חדשים, מבצעים והטבות בלעדיות</p>
                <div class="footer-links">
                    <a href="#">אימייל</a>
                    <a href="#">הירשם כמנוי</a>
                    <a href="#">מידע נוסף</a>
                </div>
                <div class="footer-disclaimer">
                    <p>הצהרת נגישות | יצירת קשר | תנאי שימוש</p>
                    <p>תקנון האתר | החזרות וביטולים | מדיניות פרטיות</p>
                </div>
            </div>
            <p class="copy-right">כל הזכויות שמורות © 2024 - casa bella
            </p>
            <p>בניית אתר: קפה מאפה ובטון </p>
        </footer>
    );
}

export default Footer;