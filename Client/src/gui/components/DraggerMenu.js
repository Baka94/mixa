import { useState, useEffect, useRef, useLayoutEffect, useContext } from "react";
import ActionMenuContext from "../../logic/contexts/ActionMenuContext.js";
import { useClickOutside } from "../../logic/hooks/useClickOutside.js";


/* Handles clicks on the menu, drag and detects click outside it to send a close message */

export function DraggerMenu ({draggerRef, children}){

  const outerRef = useRef();
  const {outsideClick} = useClickOutside(outerRef);

  const [mouseDown, setMouseDown] = useState(false);
  const [actionTime, setActionTime] = useState(false);
  const [touchStartY, setToychStartY] = useState(null);
  const [startHeight, setStartHeight] = useState();
  const [height, setHeight] = useState(startHeight);
  const containerRef = useRef();

  const { closeMenu } = useContext(ActionMenuContext);

  const handleMouseDown = (e) => {
    setMouseDown(true);
    if(e.changedTouches) setToychStartY(e.changedTouches[0].clientY);
    setActionTime(true);
    setTimeout( () => setActionTime(false), 1500);
  };

  const handleMouseMove = (e) => {
    if(mouseDown && e.changedTouches){
      setHeight(startHeight + Math.min((touchStartY - e.changedTouches[0].clientY), 50));
    }
  };

  const handleMouseUp = (e) => {
    //setHeight(startHeight);
    setMouseDown(false);
    setToychStartY(null);
    if(height > 200){
      if(actionTime && startHeight-height>100){ 
        setHeight(0);
        setTimeout( () => closeMenu(), 200); 
      }else{ 
        setHeight(startHeight);
      }
    } else{
      setHeight(0);
      setTimeout( () => closeMenu(), 200); 
    } 
    
  };

  useLayoutEffect ( () => {
    if(outerRef){
      if(outerRef.current.clientHeight > Math.round(containerRef.current.clientHeight-100)){
        let tempHeight = 1* Math.round(containerRef.current.clientHeight-100);
        setStartHeight(tempHeight);
        setHeight(0);
        setTimeout( () => setHeight(tempHeight), 10);
        console.log("setted height");
      }else{
        let tempHeight = outerRef.current.clientHeight;
        setStartHeight(tempHeight);
        setHeight(0);
        setTimeout( () => setHeight(tempHeight), 10);
      }
    }
  }, [outerRef]);

  useEffect( () => {
    if(outsideClick){
      setHeight(0);
      setTimeout( () => closeMenu(), 200);
    }
  }, [outsideClick]);

  return (
    <div className="actionMenuContainer z6" ref={containerRef} onTouchMove={handleMouseMove} onMouseMove={handleMouseMove} onTouchEnd={handleMouseUp} onMouseUp={handleMouseUp}>
      <div className={mouseDown? "actionMenuContent z4 bc-3" : "actionMenuContent z4 bc-3 t-s"} ref={outerRef} style={{height: height}}>
        <div className="relative full-w full-h">
          <div className="draggerMenuBar absolute top0 z2 box-h-xs full-w flex-c no-mobile-l-up" onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
              <div className="box-m bc-2 br-a-l" style={{height:"0.5rem"}}>
              </div>
          </div>
          <div className="z1 relative full-w full-h scroll-y top0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  
}