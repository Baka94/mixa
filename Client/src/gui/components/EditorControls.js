import SvgIcons from "../icons/SvgIcons.js";
import "../choa/choa.sass"
import { useState } from "react";

export default function EditorControls({
    focusTimeline, contentLenght, setMagnet, setTransitions, setEffects,
    magnet, transitions, effects
}){

    return(
      <div className="relative full-w p-a-m br-t-m box-h-s flex-c bc-1">
        <div className="absolute left0 m-l-s flex-c m-r-xs">
          <div className={magnet?"btn-square-s-accent3-selected m-r-xs":"btn-square-s-accent3 m-r-xs"} onClick={()=>{setMagnet(!magnet)}}>
            <SvgIcons iconName={"magnet"} />
          </div>
          <div className={transitions?"btn-square-s-accent3-selected m-r-xs":"btn-square-s-accent3 m-r-xs"} onClick={()=>{setTransitions(!transitions)}}>
            <SvgIcons iconName={"transition"} />
          </div>
          <div className={effects?"btn-square-s-accent3-selected m-r-xs":"btn-square-s-accent3 m-r-xs"} onClick={()=>{setEffects(!effects)}}>
            <SvgIcons iconName={"effect"} />
          </div>
        </div>
        <div className="flex-c">
          <div className="btn-square-s-accent3" style={{transform:"rotate(180deg)"}}>
            <SvgIcons iconName={"forward"} />
          </div>
          <div className="m-a-xs btn-square-m-accent3-selected">
            <SvgIcons iconName={"pause"} />
          </div>
          <div className="btn-square-s-accent3">
            <SvgIcons iconName={"forward"} />
          </div>
        </div>
        <div className="absolute right0 m-r-s flex-c m-l-xs">
          <div className="btn-square-s-accent3">
            <SvgIcons iconName={"audio"} />
          </div>
          <div className="btn-square-s-accent3 m-l-xs" onClick={()=>focusTimeline(contentLenght, 0)}>
            <SvgIcons iconName={"mountains"} />
          </div>
        </div>
      </div>
    );
  }