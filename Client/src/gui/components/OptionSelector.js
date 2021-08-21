
import { useState } from "react";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"

function OptionSelector(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [currentOption, setCurrentOption] = useState(props.options[0].title);

    function updateOption (option){
        setCurrentOption(option);
        props.handleChange(option);
    }

    return (
        <div className={isOpen? "t-s flex-c bc-d-m p-a-xs br-a-xs left0 z3" : "t-s flex-c p-a-xs"} tabIndex="0" onBlur={()=>setIsOpen(false)} onClick={()=>setIsOpen(!isOpen)} style={{position: isOpen? "relative" : "relative"}}>
            {props.options.map(option => {
                return <Option key={option} updateOption={updateOption} isOpen={isOpen} option={option} currentOption={currentOption}/>
                } )}
        </div>
    );
}

function Option({updateOption, option, isOpen, currentOption}) {

    return (
        <div className={currentOption === option.title || isOpen ? "flex-c flex-no-wrap btn-accent p-a-xs br-a-xs point t-s show-from-right" : "flex-c flex-no-wrap btn-d-l p-a-xs br-a-xs point t-s"}
            style={{display:isOpen? "flex": currentOption === option.title ? "flex" : "none"}}
            onClick={isOpen? ()=>updateOption(option.title) : null}
            >
            <div className="box-xs-square p-a-xxs flex-c">
                <SvgIcons iconName={option.icon} />
            </div>
            {isOpen && <h5 className="m-l-xs m-r-xs" style={{whiteSpace: "nowrap"}}>{option.title}</h5>}
        </div>
    );
}

export default OptionSelector;
