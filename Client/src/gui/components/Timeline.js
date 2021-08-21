import { useEffect, useRef, useState } from "react";
import { useDrag } from "../../logic/hooks/useDrag.js";
import "../choa/choa.sass"

import EditorControls from "./EditorControls.js"
import Sequence from "./Sequence.js"

export default function Timeline({seqs, updateSeq, update, setCurrentT}){

    const outerRef = useRef();
    const [scrollX, startClick, downIn] = useDrag(outerRef, "Timeline");
    const [initTscroll, setInitTScroll] = useState(0);
    const [pxs, setPxs] = useState(25);
    const [lenght, setLenght] = useState(200);
  
    const [prevPxs, setPrevPxs] = useState(25);
    const [prevInitTScoll, setPrevInitTScroll] = useState(0);

    const [leftGap, setLeftGap] = useState(0);

    const pointerRef = useRef();
    const [scrollXP, startClickP, downInP] = useDrag(pointerRef);
    const [initP, setInitP] = useState(0);

    /*On Off functionalities*/
    const [magnet, setMagnet] = useState(false);
    const [transitions, setTransitions] = useState(false);
    const [effects, setEffects] = useState(false);
    
    useEffect(()=>{
        setLeftGap(window.innerWidth/4);
    },[]);

    useEffect(()=>{
      if(downIn){
        outerRef.current.scrollLeft = initTscroll+(-1*scrollX);
      }
    },[scrollX,pxs]);
  
    useEffect(()=>{
      if(!downIn){
        setInitTScroll(outerRef.current.scrollLeft);
      }
    },[downIn]);
  
    useEffect(()=>{
      if(!downInP){
        if(scrollXP+(initP*pxs)<0){
          setInitP(0);
          setCurrentT(0);
        }else{
          setInitP(initP+(scrollXP/pxs));
          setCurrentT(initP+(scrollXP/pxs));
        }
      }
    },[downInP]);
  
    useEffect(()=>{
      if(downInP){
        setCurrentT(initP+scrollXP/pxs);
      }
    },[scrollXP, pxs]);
  
    function setPointer(clickX){
      let newXP = (outerRef.current.scrollLeft+clickX-leftGap)/pxs;
      setInitP(newXP);
      setCurrentT(newXP);
    }
  
    function getSeq(position){
      return seqs[position] ? seqs[position] : null;
    }

    function focusTimeline(viewLegnht, viewStart){ //View lenght and start in seconds
        setPrevPxs(pxs);
        setPrevInitTScroll(initTscroll);
        let newPxs = (outerRef.current.clientWidth-100)/viewLegnht;
        setPxs(newPxs);
        outerRef.current.scrollLeft = (viewStart * newPxs)+(leftGap)-50;
        setInitTScroll((viewStart * newPxs)+(leftGap)-50);
    }

    function resetTimeline(){ 
        setPxs(prevPxs);
        outerRef.current.scrollLeft = prevInitTScoll;
        setInitTScroll(prevInitTScoll);
    }
  
    return(
    <div className="full-w full-h bc-1 no-over">
        <EditorControls focusTimeline={focusTimeline} contentLenght={35} 
        setMagnet={setMagnet} setTransitions={setTransitions} setEffects={setEffects}
        magnet={magnet} transitions={transitions} effects={effects}
        />

        <div className="relative flex full-w full-h scroll-x no-over-y" ref={outerRef} onMouseDown={startClick} >
            <div className="relative timeline" style={{marginLeft:window.innerWidth/4}}>
    
            <div className="t-l">
                <div className="t">
                <Tminute  pxs={pxs} setPxs={setPxs} lenght={lenght} setPointer={setPointer} />
                </div>
            </div>

            <div className="absolute flex-v flex-c top0 z5 point-move-x" ref={pointerRef} onMouseDown={startClickP}
                style={{left: (initP*pxs)+scrollXP, marginLeft: "-1rem"}}
            >
                <div className="btn-accent-active p-a-xs br-a-xs" style={{marginTop: "0.6rem"}}>
                <h6>{(initP+scrollXP/pxs).toFixed(2)}</h6>
                </div>
                <div className="br-a-l g-t-accent" style={{height: outerRef.current?.offsetHeight, width:"2px"}}>
                </div>
            </div>
    
            <div className="flex-aa-c ">
                <div className="relative t-l">
                {seqs? seqs.map((seq) => {
                    return(<Sequence 
                      seq={seq} updateSeq={updateSeq} getSeq={getSeq} 
                      pxs={pxs} focusTimeline={focusTimeline} resetTimeline={resetTimeline} 
                      update={update}
                      magnet={magnet} transitions={transitions} effects={effects}
                      />);
                    })
                    :
                    <div> Loading ...</div>
                }
                </div>
            </div>
            </div>
        </div>
    </div>

    );
  }
  
  /* Problem: rerenders at every change in timeline dragging or click. 
    probably just because the timeline rerenders. 
    Must stop Tminute rerendering at every parent rerender.
  */
  function Tminute ({pxs, setPxs, lenght, setPointer}){
  
    function seconds() {
      let result = [];
      let gCount = 5;
      let interval;
      if(pxs>5){
        if(pxs > 5 && pxs <= 15) interval = 15;
        if(pxs > 15 && pxs <= 25 ) interval = 10;
        if(pxs > 25 && pxs <= 80) interval = 5;
        if(pxs > 80) interval = 1;
      }else{
        if(pxs === 1) interval = 60;
        else interval = 30;
      }
      let pxg= pxs*interval/gCount;
      let width = interval*pxs;
      for(let i=0; i<lenght/interval; i++){
        result.push(
          <div className="relative flex" style={{width:width, height:"30px"}}>
            <div className="relative flex-v flex-c top0" style={{width: pxg}}>
              <h6 className="absolute flex-c left0" style={{width: "1rem", left: "-0.4rem"}}>{i*interval}</h6>
            </div>
            <h3 style={{width: pxg}}>&middot;</h3>
            <h3 style={{width: pxg}}>&middot;</h3>
            <h3 style={{width: pxg}}>&middot;</h3>
            <h3 style={{width: pxg}}>&middot;</h3>
          </div>
          );
      }
      return result;
    }
  
    function zoomTimeline(e){
      let newPxs = Math.max(1, Math.min(pxs+-1*e.deltaY/100*1, 100));
      if(newPxs*lenght < window.innerWidth) newPxs = Math.ceil(window.innerWidth/lenght);
      setPxs(newPxs);
    }
  
    return(
      <div className="relative flex full-w p-t-xs p-b-xs" onWheel={zoomTimeline} onClick={(e)=>setPointer(e.clientX)}>
          {seconds()}
      </div>
    );
  }