import { useEffect, useState, useContext } from "react"
import TimelineContext from "../../logic/contexts/TimelineContext.js";

export const useDrag = (outerRef, seqId) => {
  
  const [scrollX, setScrollX] = useState(0);
  const [downIn, setDownIn] = useState(false);
  const [initX, setInitX] = useState(false);
  
  const [selected, setSelected] = useState(false);
  
  const [focus, setFocus] = useState(false);
  const [doubleClcickTimer, setDoubleClickTimer] = useState(false);

    useEffect(() => {
        if (selected){
          window.addEventListener("mousedown", mouseDown );
        }else{
          window.removeEventListener("mousedown", mouseDown );
        }
        return () => {
          window.removeEventListener("mousedown", mouseDown );
        }
      }, [selected] );

    useEffect(() => {
        if (initX){
          window.addEventListener("mouseup", mouseUp );
        }else{
          window.removeEventListener("mouseup", mouseUp );
          return;
        }
        return () => {
          window.removeEventListener("mouseup", mouseUp );
        }
      }, [initX] );

    useEffect(() => {
        if (!downIn){
          window.removeEventListener("mousemove", mouseMove );
          return;
        }
        window.addEventListener("mousemove", mouseMove );
        return () => {
          window.removeEventListener("mousemove", mouseMove );
        }
      }, [downIn] );

    function mouseDown(e){
      if(seqId !== "Timeline") e.stopPropagation();
      e.preventDefault();
      if (outerRef && outerRef.current?.contains(e.target)){
        setDownIn(true); //Clicked inside - downIn becomes true
      }else{
        setDownIn(false); //Clicked outside - downIn becomes false
      }
      setInitX(e.clientX);  //Saves click start position
    }

    function mouseUp(e){
      if(initX===e.clientX && seqId){  //If click is on same position
        if (outerRef && outerRef.current?.contains(e.target) && downIn){  //if click was inside
          setSelected(true);
          setDoubleClickTimer(true);
          setTimeout(()=>setDoubleClickTimer(false), 200);
          if(selected && doubleClcickTimer){
            setFocus(true);
          }
        }else{
          setSelected(false);
          setFocus(false);
        }
      }
      setInitX(false);
      setDownIn(false);
      setScrollX(0);
    }

    function mouseMove(e){
      setScrollX(e.clientX-initX);
    }

    function startClick (e)  {
        mouseDown(e);
      };

  return [scrollX, startClick, downIn, selected, focus]
}