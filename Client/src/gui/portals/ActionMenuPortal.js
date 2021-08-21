import ReactDom from "react-dom";
import "../choa/choa.sass"

/* Wrapper to make the context menu appear above everything else.
Wrap context menus in this component to make them appear on top. */

export default function ActionMenuPortal ({ children }) {

    if (true) {            
        return ReactDom.createPortal(
            <div className="z3" > 
                {children}
            </div>,
            document.getElementById("actionMenus")
          );
      }
      return <></>;
  };