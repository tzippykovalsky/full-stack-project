import { useState } from "react";
import ChatIcon from '@mui/icons-material/Chat';
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useSelector } from "react-redux";

const ChatCopmonent = () => {





  const htmlFile = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  
      <title>Pre-Select Channel Demo</title>
    </head>
    <body>

      <script src="https://cdn.deadsimplechat.com/sdk/1.0/dschatsdk.min.js"></script>
      <iframe
        id="chat-frame"
        src="https://deadsimplechat.com/fdiu_aDTl"
        width="25%"
        height="700px"
      ></iframe>
   <script>
          var frame = (async () => {
          const sdk = new DSChatSDK("fdiu_aDTl", "chat-frame", "pub_5f336c733870654f384d7462306141794350416d326e6c79714742474e7a647961317832793958553573417071497049")
          await sdk.connect()
              
          const channels = await sdk.getActiveChannels();
          console.log(channels)
          
          await sdk.selectChannel("634090e5f2e94533fa8ce0af")
          //private 6577337169695770617871633763783862557330735a51464c4f6b50434a6748766b304d377a7830704a666775396f62
          })();
      </script> 
      <!-- 65e4690be81030b08e6307e1 -->
      <!-- 65e4431fe81030b08e62e5dd chat room-->
      <!-- 634090e5f2e94533fa8ce0af שלהם-->
    </body>
  </html>
  `;
  const [open, setOpen] = useState(false);
  let currentUser = useSelector((state) => state.user.currentUser)





  return (
    <>
      {currentUser && currentUser.role === 1 ? (
        <>
          {open && (
            <><h2 className='form-h4'>יש להזין סיסמה בתיבת הטקסט השניה: 325963122</h2>
              <div dangerouslySetInnerHTML={{ __html: htmlFile }}></div></>
          )}

          <Box sx={{ height: 120, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
              onClick={() => { setOpen(prevOpen => !prevOpen) }}
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'fixed', bottom: 35, left: 16 }}
              icon={<ChatIcon />}
            >
            </SpeedDial>
          </Box>
        </>
      ) : (
        <><h2 className='form-h4' style={{ marginTop: "13vh" }}>326376845 :סיסמה</h2> <div dangerouslySetInnerHTML={{ __html: htmlFile }} ></div></>
      )}
    </>
  ); 

  
}

export default ChatCopmonent;


