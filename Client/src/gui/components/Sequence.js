import { useEffect, useRef, useState } from "react";
import { useDrag } from "../../logic/hooks/useDrag.js";
import SvgIcons from "../icons/SvgIcons.js";
import "../choa/choa.sass"

export default function Sequence({
    seq, getSeq, updateSeq, pxs, focusTimeline, resetTimeline, update, magnet, transitions, effects
}){
    const clipRef = useRef();
    const [clipLenght, setClipLenght] = useState();
  
    const [seqStart, setSeqStart] = useState(0);
    const [seqEnd, setSeqEnd] = useState(0);
  
    const outerRef = useRef();
    const [scrollXC, startClick, downIn, selected, focus] = useDrag(outerRef, seq.id);
  
    const [nextSeq, setNextSeq] = useState(null);
  
    useEffect(()=>{
      setNextSeq(getSeq(seq.position+1));
    }, [update]);
  
    const outerRefL = useRef();
    const outerRefR = useRef();
    const [scrollXL,  startClickL, draggingL] = useDrag(outerRefL);
    const [scrollXR, startClickR, draggingR] = useDrag(outerRefR);
  
    const outerRefT = useRef();
    const [scrollXT, startClickT, draggingT] = useDrag(outerRefT);
  
    useEffect(()=>{
      setClipLenght(seq.end-seq.start);
      setSeqStart(seq.start);
      setSeqEnd(seq.end);
    },[]);
  
    useEffect(()=>{
      trimClip(scrollXL, "start", draggingL);
    }, [scrollXL]);
  
    useEffect(()=>{
      trimClip(scrollXR, "end", draggingR);
    }, [scrollXR]);
  
    useEffect(()=>{
      trimClip(scrollXT, "transition", draggingT);
    }, [scrollXT]);
  
    function trimClip(scrollX, action, dragging){
      if(dragging){
        let newScrollXs;
        if(action === "transition"){
          newScrollXs = Math.max(0, seqEnd+(scrollX/pxs));
          updateSeq(newScrollXs, seq.position, action);
          setClipLenght(newScrollXs-seqStart);
        }
        if(action === "start"){
          newScrollXs = Math.max(0, seqStart+(scrollX/pxs));
          updateSeq(newScrollXs, seq.position, action);
          setClipLenght(seqEnd-newScrollXs);
        }
        if(action === "end"){
          newScrollXs = Math.max(0, seqEnd+(scrollX/pxs));
          updateSeq(newScrollXs, seq.position, action);
          setClipLenght(newScrollXs-seqStart);
        }
      }else{
        setClipLenght(seq.end-seq.start);
        setSeqStart(seq.start);
        setSeqEnd(seq.end);
      }
    }
  
    useEffect(()=>{
      if(!downIn){
        setSeqStart(seq.start);
        setSeqEnd(seq.end);
      }else{
        return;
      }
    },[downIn]);
  
    useEffect(()=>{
      if(downIn){
        let newScrollXs = Math.max(0, seqStart+(scrollXC/pxs));
        updateSeq(newScrollXs, seq.position, "move");
      }
    },[scrollXC]);
  
    useEffect(()=>{
      if(!downIn && !draggingL && !draggingR && !draggingT){
        setClipLenght(seq.end-seq.start);
        setSeqStart(seq.start);
        setSeqEnd(seq.end);
      }
    },[update]);
  
    useEffect(()=>{
      if(focus){
        focusTimeline(clipLenght, seq.start);
      }else{
        resetTimeline();
      }
    },[focus]);
  
    return(
      <div className="absolute full-h" ref={outerRef} onMouseDown={startClick} style={{left:(seq.start*pxs)+"px"}}>
        <div className="relative flex-c">
  
          { selected && <div className="absolute bc-accent br-a-xs" style={{display:"none", width: "calc(100% + 0.4rem)" , height: "100%" }}> 
          </div>}
  
          { !nextSeq? null :  nextSeq.start-seq.end > 0 ?
            <div className="absolute left0 flex-c" style={{width: (nextSeq?.start-seq.end)*pxs+"px", marginLeft: clipLenght*pxs+"px"}}>
              <div className="m-a-xs btn-square-s-basic z3 no-stroke" >
                <SvgIcons iconName={"plus"} />
              </div>
            </div>
            : transitions &&
            <div className="absolute right0 btn-square-s-accent3 z5 no-stroke" style={{marginRight: "-1rem"}} ref={outerRefT} onMouseDown={startClickT}>
              <SvgIcons iconName={"transition"}  />
            </div>
          }
  
          <div className={selected? "relative flex-c t-v bc-1 z4 point-move bs-accent1-t b-xxxs-accent1" : "relative flex-c t-v bc-3 z2 point-move"} ref={clipRef} 
            style={{opacity: downIn && selected ? "0.5" :"1", width: ((seq.end-seq.start)*pxs) + "px"}}>
  
            { selected && <div className="m-a-xs absolute left0 btn-round-s-static-accent z3 no-stroke point-grab" ref={outerRefL} onMouseDown={startClickL}>
              <SvgIcons iconName={"drag-vertical"} />
            </div>}
            { selected && <div className="m-a-xs absolute right0 btn-round-s-static-accent z3 no-stroke point-grab" ref={outerRefR} onMouseDown={startClickR}>
              <SvgIcons iconName={"drag-vertical"} />
            </div>}
  
            <h5>{seq.title}</h5>
  
          </div>
        </div>
      </div>
    );
  }