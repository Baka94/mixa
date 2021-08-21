import { useEffect, useRef, useState } from "react";
import "../choa/choa.sass"

export default function EditorPreview({src, seqT}){

    const [currentSeq, setCurrentSeq] = useState();
    const videoRef = useRef();
    const sourceRef = useRef();
    const canvasRef = useRef();
    const [ctx, setCtx] = useState();
  
    useEffect(()=>{
      sourceRef.current.setAttribute('src', src);
      videoRef.current.load();
    },[src]);
  
    useEffect(()=>{
      canvasRef.current.width = 720;
      canvasRef.current.height = 405;
      setCtx(canvasRef.current.getContext("2d"));
    },[]);
  
    useEffect(()=>{
      const width = canvasRef? canvasRef.current.width : 900;
      const height = canvasRef? canvasRef.current.height : 500;
      function step(){
        ctx?.drawImage(videoRef.current,0,0, width, height);
        //requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      videoRef.current.currentTime = seqT;
    },[ctx, seqT, videoRef, src]);
  
    return(
      <div classNmae="full-w full-h flex-c">
        <video controls className="" style={{display: "none"}} ref={videoRef}>
            <source src={""} type="video/webm"  ref={sourceRef} />
        </video>
        <canvas className="full-h full-w bc-1 br-a-xs" ref={canvasRef}> 
        </canvas>
      </div>
    );
  }