import { useEffect, useCallback, useState } from "react";

export const useContextMenu = (outerRef, triggerRef) => {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [menu, showMenu] = useState(false);

  const handleContextMenu = useCallback(
    event => {
      
      if (outerRef && outerRef.current.contains(event.target)) {
        event.preventDefault();
        setXPos(event.pageX);
        setYPos(event.pageY);
        showMenu(true);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, triggerRef, setXPos, setYPos]
  );

  const handleClick = useCallback(event => {
    if (triggerRef && triggerRef.current?.contains(event.target)){
      handleContextMenu(event);
    }else{
      showMenu(false);
    }
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return { xPos, yPos, menu };
};