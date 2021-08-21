import { useState, useEffect } from "react";

/* Handles clicks on the menu, drag and detects click outside it to send a close message */

export const useClickOutside = (outerRef) => {

  const [outsideClick, setOutsideClick] = useState(false);

  function handleMouseDown (event)  {
    if (outerRef && outerRef.current.contains(event.target)){
      setOutsideClick(false);
    }else{
      setOutsideClick(true);
      console.log("CLOSE")
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return {outsideClick}
}