
import { useEffect, useMemo, useRef, useState } from "react";
import {Route, useHistory, useLocation, Link} from "react-router-dom";
import "../choa/choa.sass"
import SvgIcons from "../icons/SvgIcons.js"
import AppHomepage from "./StudioPage";
import WebMenu from "../components/WebMenu.js"
import {TopBar, StudioMenu, MobileMenu} from "../components/TopBar.js"

function LandingPage( {loggedin} ) {

    const history = useHistory();

    const mainScroll = useRef();
    const [scroll, setScroll] = useState(0);
    const [isTop, setIsTop] = useState(true);

    function updateScroll(){
        let currentScroll = mainScroll.current.scrollTop;
        setScroll(currentScroll);

        if(currentScroll > 30) setIsTop(false);
        else setIsTop(true);
    };

    return (
        <div className="relative scroll-y full-w full-vh" ref={mainScroll} onScroll={updateScroll}>
            <TopBar isTop={isTop} > {loggedin ? <StudioMenu />  : <WebMenu /> } </TopBar>
            {loggedin && <MobileMenu /> }
            <HeroSection />
            <MakeAnythingSection />
            <PresentationSection />
        </div>
    );
}

export default LandingPage;

const HeroSection = ()=>{
    const history = useHistory();
    return(
        <div className="heroSection">
            <video loop muted autoplay="autoplay" alt="" src="https://socialflowagency.com/wp-content/uploads/2021/05/LiquidGradient.mp4" />
            <div className="hero-grid">
                <div className="hero-info-left">
                    <h1 className="title fw-7 tc-1">
                        Create once, <br/> <span>publish anywhere.</span>
                    </h1>
                    <h4 className="text full-w fw-5 m-t-m tc-1">
                        Mixa is an all-in-one tool that eneables anyone to design &#38; automate content creation on an higher level, for every media format and type at once.
                    </h4>

                    <div className="buttons m-t-m flex">
                        <div className="button btn-round-m-accent point" onClick={()=>history.push("/signup")}>
                            <span className="fw-5 label"> Get started for free </span>
                        </div>
                        <div className="button btn-round-m-accent2 point" onClick={()=>history.push("/features")}>
                            <span className="fw-5 label"> See Features </span>
                        </div>
                    </div>   
                </div>

                <div className="hero-right">
                    <div className="hero-image">
                        <img className="full-w" alt="" src="https://socialflowagency.com/wp-content/uploads/2021/05/MixaEditorShotSmall.png" />
                    </div>
                </div>

            </div>
        </div>
    );
}

const PresentationSection = ()=>{
    const history = useHistory();

    const words = ["Video", "Presentation", "Advertisement", "Poster", "Documents", "Illustration", "Infographics", "Card"];
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            if(currentWord < words.length-1)
                setCurrentWord(currentWord+1);
            else
                setCurrentWord(0);
        }, 1500);
        return () => clearInterval(interval);
    }, [currentWord]);

    return(
        <div className="presentation-section">
            <div className="content">
                <div className="full-size-video-container z1">
                    <video loop muted autoplay="autoplay" alt="" src="https://socialflowagency.com/wp-content/uploads/2021/05/LiquidGradient.mp4"></video>
                </div>

                <div className="title tc-1 z2">
                    <h1 className="title-top"> Best </h1>
                    <h1 className="title-center"> {words[currentWord]} </h1>
                    <h1 className="title-bottom"> Maker.</h1>
                </div>

                <div className="illustration z2">
                    <div className="hero-image">
                        <img className="full-w" alt="" src="https://socialflowagency.com/wp-content/uploads/2021/05/MixaEditorShotSmall.png" />
                    </div>
                </div>
                
                <div className="bottom z2">
                    <div className="bottom-text-center">
                        <h4 className="text tc-1">
                        Mixa gives you all the tools needed to unleash your inner designer. Set up branded templates, or let your imagination run wild with our template gallery. Once you start editing, innovative features will help you save hours.
                            </h4>
                        <Link className="button">
                            <h4 className="text-button tc-1">Try It For Free Now</h4>
                            <div className="arrow ic-1"> <SvgIcons iconName="arrow-right" /></div>
                        </Link>
                    </div>
                </div>


            </div>

        </div>
    );
}


const MakeAnythingSection = ()=>{
    const history = useHistory();

    const [currentSlide, setCurrentSlide] = useState(1);
    const titleRef = useRef();
    const optionsSliderRef = useRef();
    const optionsContainerRef = useRef();

    useEffect(() => {
        const interval = setTimeout(() => {
            updateOptionsSlider()
        }, 3000);
        return () => clearInterval(interval);
    }, [currentSlide]);

    const updateOptionsSlider = (option) =>{
        var offset = 1;
        if(option && option<5){
            setCurrentSlide(option);
            offset=optionsSliderRef.current?.children[option].offsetLeft;
        }else{
            if(currentSlide < 5){
                setCurrentSlide(currentSlide+1);
                offset=optionsSliderRef.current?.children[currentSlide+1].offsetLeft;
            }else{
                offset=optionsSliderRef.current?.children[1].offsetLeft;
                setCurrentSlide(1);
            }
        }
        optionsSliderRef.current.scrollLeft = -1*(titleRef.current?.offsetLeft-(offset+optionsContainerRef.current?.offsetLeft));
    }

    return(
        <div className="make-anything-section">
            <div className="title-container">
                <h2 className="title" ref={titleRef}>Create</h2>
            </div>
            <div className="options-container m-t-s" ref={optionsContainerRef}>
                <div className="fader-left" onClick={()=>updateOptionsSlider(currentSlide-1)}></div>
                <div className="fader-right" onClick={()=>updateOptionsSlider(currentSlide+1)} ></div>
                <div className="options-slider" ref={optionsSliderRef}>
                    <div style={{minWidth:"300px", width: "300px"}}></div>
                    <h2 className={ currentSlide != 1 ? "option": "option-selected tc-pink"} onClick={()=>updateOptionsSlider(1)} >Videos</h2>
                    <h2 className={ currentSlide != 2 ? "option": "option-selected tc-purple"} onClick={()=>updateOptionsSlider(2)} >Presentations</h2>
                    <h2 className={ currentSlide != 3 ? "option": "option-selected tc-yellow"} onClick={()=>updateOptionsSlider(3)} >Advs</h2>
                    <h2 className={ currentSlide != 4 ? "option": "option-selected tc-blue"} onClick={()=>updateOptionsSlider(4)} >Documents</h2>
                    <h2 className={ currentSlide != 5 ? "option": "option-selected tc-acqua"} onClick={()=>updateOptionsSlider(5)} >Illustrations</h2>
                    <div style={{minWidth:"80%"}}></div>
                </div>
            </div>

            <div className="formats-slider">
                <UseFormats currentSlide={currentSlide} />
            </div>

            <div className="bottom-text">
                <h4 className="text">Mixa is the easiest way to make awesome content instantly, without knowledge of any complicated software.</h4>
                <Link className="button">
                    <h4 className="text-button tc-accent">Learn why you should start creating everything in Mixa </h4>
                    <div className="arrow ic-blue"> <SvgIcons iconName="arrow-right" /></div>
                </Link>
            </div>

        </div>
    );
}


function UseFormats( {currentSlide} ){

    return(
        <div className="formats">
            {currentSlide === 1 && <div className="media-format-card bc-yellow m-r-s">
                    <div className="illustration">
                        <img alt="" src="https://i.ibb.co/x89gww5/Instagram-Video.png" />
                    </div>
                    <div className="info-box">
                        <div className="icon ic-yellow">
                            <SvgIcons iconName="instagram" />
                        </div>
                        <div className="info">
                            <h5 className="tc-yellow" > 1:1 - Square format </h5>
                            <h3 className="title"> Instagram Video </h3>
                        </div>
                    </div>
                </div>
                }
                {currentSlide === 2 &&
                <div className="media-format-card bc-red m-r-s" >
                    <div className="illustration">
                        <img alt="" src="https://i.ibb.co/x89gww5/Instagram-Video.png" />
                    </div>
                    <div className="info-box">
                        <div className="icon ic-red">
                            <SvgIcons iconName="youtube" />
                        </div>
                        <div className="info">
                            <h5 className="tc-red" > 1:1 - Square format </h5>
                            <h3 className="title"> Instagram Video </h3>
                        </div>
                    </div>
                </div>
                }

                {currentSlide === 3 &&
                <div className="media-format-card bc-purple m-r-s" >
                    <div className="illustration">
                        <img alt="" src="https://i.ibb.co/x89gww5/Instagram-Video.png" />
                    </div>
                    <div className="info-box">
                        <div className="icon ic-purple">
                            <SvgIcons iconName="youtube" />
                        </div>
                        <div className="info">
                            <h5 className="tc-purple" > 1:1 - Square format </h5>
                            <h3 className="title"> Instagram Video </h3>
                        </div>
                    </div>
                </div>
                }
                
                <div className="media-format-card bc-blue" >
                    <div className="illustration">
                        <div className="full-size-video-container">
                            <video loop muted autoplay="autoplay" alt="" src="https://socialflowagency.com/wp-content/uploads/2021/05/LiquidGradient.mp4"></video>
                        </div>
                    </div>
                    <div className="info-box">
                        <div className="icon ic-blue">
                            <SvgIcons iconName="explore" />
                        </div>
                        <div className="info-single">
                            <h3 className="title"> Explore </h3> <div className="arrow"> <SvgIcons iconName="arrow-right" /> </div> 
                        </div>
                    </div>
                </div>

        </div>
    );
}

