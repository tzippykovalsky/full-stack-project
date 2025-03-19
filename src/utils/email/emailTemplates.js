export const generateEmailHtml = (title, message) => {
    return `
    <div style="background: #ffffff; padding: 60px; font-family: 'Georgia', serif; color: #000000; text-align: center; box-shadow: none; max-width: 600px; margin: auto; animation: fadeIn 1s ease-in-out;">
    
    <!-- קווים עדינים למראה אלגנטי -->
    <div style="border-top: 2px solid #000000; width: 70px; margin: auto; margin-bottom: 20px;"></div>
    
    <h2 style="font-size: 36px; font-weight: bold; margin-bottom: 30px; color: #000000; text-transform: uppercase; letter-spacing: 1px;">${title}</h2>
    
    <p style="font-size: 24px; line-height: 1.6; color: #333333; margin-bottom: 30px;">${message}</p>
    
    <!-- קו תחתון עדין -->
    <div style="border-bottom: 1px solid #000000; width: 80%; margin: auto; margin-bottom: 30px;"></div>
    
    <a href="https://localhost:3000" target="_blank" style="display: inline-block; padding: 20px 40px; background: #000000; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 25px; font-size: 24px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); transition: 0.3s;"
        onmouseover="this.style.background='#333333'; this.style.boxShadow='0 6px 12px rgba(0, 0, 0, 0.3)';"
        onmouseout="this.style.background='#000000'; this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)';">
         בקר באתר שלנו
    </a>
    
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</div>
    `
};
