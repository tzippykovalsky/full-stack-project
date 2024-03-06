



// import React, { useState } from 'react';

// const BlessingComponent = () => {
//   const [blessing, setBlessing] = useState('');

//   const handleChange = (e) => {
//     setBlessing(e.target.value);
//   };

//   const handlePrint = () => {
//     const frame = document.createElement('iframe');
//     document.body.appendChild(frame);
//     const printDocument = frame.contentWindow.document;

//     printDocument.open();
//     printDocument.write(`
//       <html>
//         <head>
//           <style>
//             body {
//               background-image: url('https://perfectaccessories.co.il/cdn/shop/files/OP_0652-1.webp?v=1704097608&width=600');
//               background-size: cover;
//               background-position: center;
//             }
//           </style>
//         </head>
//         <body style="margin: 0; padding: 0;">
//            <img src="https://perfectaccessories.co.il/cdn/shop/files/OP_0652-1.webp?v=1704097608&width=600" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" />
//           <div style="min-height: 1025px; border: 1px solid black; padding: 5px; position: relative; z-index: 1; " id="blessing" contentEditable={true} onInput={handleChange}>
//             ${blessing}
//           </div>
//         </body>
//       </html>
//     `);
//     printDocument.close();

//     frame.contentWindow.print();
//     document.body.removeChild(frame);
//   };

//   return (
//     <div className="blessing-container">

// <div>
//     <h2>הכנס ברכה:</h2>
//     <textarea 
//   value={blessing} 
//   onChange={handleChange} 
//   style={{
//     backgroundImage: 'url("https://perfectaccessories.co.il/cdn/shop/files/OP_0652-1.webp?v=1704097608&width=600")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: '500px', // Set the desired width
//     height: '650px', // Set the desired height
//     resize: 'none', // Prevent resizing
//     fontSize: '1.5em', // Set the font size to be larger
//     textAlign: 'center', // Center align the text
//   }} 
// />

// </div>



// <button onClick={handlePrint}>הדפסה</button>
// </div>
// );
// };

// export default BlessingComponent;








import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { IconButton } from '@mui/material';
import RedeemIcon from '@mui/icons-material/Redeem';

const BlessingComponent = () => {
  const blessingRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => blessingRef.current,
  });

  return (

    <div >
      <div style={{ display: "flex" }}>

        <h4 className='form-h4' style={{marginLeft:"5vw"}}>הוסיפו ברכה למשלוח</h4>
        <IconButton onClick={handlePrint} sx={{'&:hover':{ backgroundColor:"transparent",color:"inherit"}}}><PrintIcon /></IconButton>
      </div>
      <textarea ref={blessingRef}
        style={{
          backgroundImage: 'url("https://casabella.co.il/cdn/shop/products/Casa_bella_chagim_21_128_D7_A1_D7_A4_D7_98_D7_9E_D7_91_D7_A8_09_2021-79.jpg?v=1682331516&width=500")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '320px',
          height: '450px',
          resize: 'none',
          fontSize: '1.5em',
          textAlign: 'center',
         
        }} />
    </div>
  );
};

export default BlessingComponent;



