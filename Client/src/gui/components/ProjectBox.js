import { useContext, useRef, useState } from "react";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"

import ContextMenuPortal from "../portals/ContextMenuPortal.js"

import ActionMenuContext from "../../logic/contexts/ActionMenuContext";
import AppDataContext from "../../logic/contexts/AppDataContext.js";
import { useHistory } from "react-router";

export function ProjectBox({id, name, lastEdit, thumbnail}) {

  const { loadEditor } = useContext(AppDataContext);

  const outerRef = useRef(null);
  const triggerRef = useRef(null);
  const history = useHistory();

  return (
    <div className="projectBox" ref={outerRef}>
        <div className="thumbnail" onClick={()=>{loadEditor(id);}}>
          <div className="types z2">
            <div className="btn btn-tinted">
              <SvgIcons iconName={"tiktok"} />
            </div>
            <div className="btn btn-tinted">
              <SvgIcons iconName={"instagram"} />
            </div>
          </div>
          <div className="m-a-s absolute op0 right0 btn-round-xs-mode z1 no-stroke" ref={triggerRef}>
              <SvgIcons iconName={"verticalDots"} />
          </div>
          <img alt="" src={thumbnail} />
        </div>
        <div className="info" onClick={()=>{loadEditor(id, "Infinito");}}>
          <h5 className="date"> {lastEdit} </h5>
          <h3 className="title"> {name} </h3>
        </div>
        <div className="action">
          <h5 className="m-r-s">Show more</h5> 
          <div className="btn btn-plain">
            <SvgIcons iconName={"vertical-dots"} /> 
          </div>
        </div>

        <ContextMenuPortal outerRef={outerRef} triggerRef={triggerRef}>
          <ProjectBoxContextMenu id={id} />
        </ContextMenuPortal>
    </div>
  );
}

export const ProjectBoxContextMenu = ({id}) => {

  const { deleteP } = useContext(AppDataContext);

  return (
    <div className="context-menu">
      <div className="btn btn-grey">
          <SvgIcons iconName={"edit-outline"} />
          <h5 className="m-l-xs">Rename</h5>
      </div>
      <div className="btn btn-grey">
          <SvgIcons iconName={"download-outline"} />
          <h5 className="m-l-xs">Download</h5>
      </div>
      <div className="btn btn-grey">
          <SvgIcons iconName={"folder-outline"} />
          <h5 className="m-l-xs">Move</h5>
      </div>
      <div className="btn btn-grey">
          <SvgIcons iconName={"copy-outline"} />
          <h5 className="m-l-xs">Copy</h5>
      </div>
      <div className="btn btn-grey" onClick={()=>deleteP(id)}>
          <SvgIcons iconName={"trash-outline"} />
          <h5 className="m-l-xs">Delete</h5>
      </div>
    </div>
  );
};




