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
