

import React, { useState } from "react";
import img5 from "./pic5.jpg";
import img6 from "./pic6.jpg";
import img7 from "./pic4.jpg";

const Location = () => {
  const [imageClicked, setImageClicked] = useState({
    first: false,
    second: false,
    ground: true // Setting one image to be open by default
  });

  const onClickHandler = (order) => {
    const updatedState = { ground: false, first: false, second: false };
    setImageClicked({
      ...updatedState,
      [order]: true
    });
  };

  return (
    <div>
      <div className="Ccontainer">
        <button onClick={() => onClickHandler("ground")} className="ground">
          Ground Floor
        </button>
        <button onClick={() => onClickHandler("first")} className="first">
          First Floor
        </button>
        <button onClick={() => onClickHandler("second")} className="second">
          Second Floor
        </button>
      </div>
      <div className="image">
        {imageClicked.ground && <img src={img5} alt="ground" />}
        {imageClicked.first && <img src={img6} alt="first" />}
        {imageClicked.second && <img src={img7} alt="second" />}
      </div>
    </div>
  );
};

export default Location;
