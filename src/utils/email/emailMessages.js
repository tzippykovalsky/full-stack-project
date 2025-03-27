import { getAdminEmailFromServer } from "../../api/emailService";

export const getSignUpEmail = (to, name) => ({
    to,
    subject: "ברוך הבא! חשבונך נוצר בהצלחה 🎉",
    text: `היי ${name},

שמחים שהצטרפת אלינו! 🚀
החשבון שלך באתר שלנו נוצר בהצלחה, ואנחנו נרגשים שתהיה חלק מהקהילה שלנו.

כדי להתחיל, מומלץ לבדוק את האזור האישי שלך ולגלות את כל מה שיש לנו להציע.

📌 אם יש לך שאלות, אנחנו כאן לכל דבר.

צוות קזה-בלה! 😊
`
});


export const getCheckOutEmail = (to, name, convenientDate) => ({
    to,
    subject: "הרכישה בוצעה בהצלחה! 🛒",
    text: `היי ${name}, 

הרכישה שלך בתאריך ${convenientDate} בוצעה בהצלחה! ✅
צוות קזה בלה מודה לך על קנייתך ומעריך את האמון בנו.

📌 פרטי ההזמנה שלך:
- תאריך רכישה: ${convenientDate}

ברגע שהמשלוח יצא, תקבלי עדכון נוסף עם מספר מעקב.

לכל שאלה, אנחנו כאן בשבילך.

תודה שקנית אצלנו! 💙
צוות קזה בלה
`
});


export const getUnauthorizedAccessEmail = async (email, ip, attemptedPage) => {
    let to;
    try {
        let res = await getAdminEmailFromServer();
        to=res.data.email;
        console.log(to);
        
    }
    catch (err) {
        console.log(err);
    }

    return ({

        to, // admin email
        subject: "התראה: ניסיון גישה לא מורשה 🚨",
        text: `שלום, 

זוהה ניסיון גישה לא מורשה למערכת.
📌 פרטי הניסיון:
- כתובת מייל: ${email || "לא ידועה"}
- כתובת IP: ${ip || "לא ידועה"}
- דף שניסו לגשת אליו: ${attemptedPage}

אם אינך מזהה ניסיון זה, מומלץ לבדוק את אבטחת המערכת.

בברכה,
צוות האבטחה`
    });
}