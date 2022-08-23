// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap, Sine} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Brother from "./Brother";
import store, { ACTION_SET_SECTIONS, fetchData } from "./store";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import { LeftIcon, Logo, PlayIcon, RightIcon, ScrollDown, TapIcon} from "./Icons";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import {SmoothProvider} from "react-smooth-scrolling";
import AudioPlayer from "../../../../shared/js/AudioPlayer";
import videojs from 'video.js';
import Slider from 'react-slick';



const assetsPath = "<%= path %>";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
    duration:1,
    ease: 'sine.inOut'
});

const setHtml = (html) => ({dangerouslySetInnerHTML:{__html: html}});

const Container = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}
// const FlexContainer = (props) => {
const FlexContainer = ({children, className}) => {
    return (
        <div className={`flex-container ${className}`} >
            {children}
        </div>
    )
}


const Loading = () => 
    <FlexContainer className="loading">
        <div style={{width: 300}}>
            <img src={`${assetsPath}/glab_logo.svg`} />
        </div>
    </FlexContainer>

const Header = () => {
    const content = useSelector(s=>s.content);

    return (
        <header>
            <div className="">

                <div className="bg1">
                    
                    
                    
                    <div className="client">
                        <p>Paid for by <br />
                            <a href="#" target="_blank">
                                <img src={`${assetsPath}/google_logo.png`} width="150" />
                            </a>
                        </p>
                        <div className="about-content" {...setHtml(content.aboutLink)} />
                    </div>
                </div>
            </div>
        </header>        
    )
}

const Footer = ({content, related, shareUrl}) => {

    return (
        <section className="footer dark-text">
            <div className="content">
                {/* <div className="break"><span /><span /><span /><span /></div>
                <div className="cta-wrap">
                    <div className="cta" {...setHtml(content.cta)} />
                    <div className="disc" {...setHtml(content.disc)}></div>

                </div> */}
                
                
                <div className="share">
                    <SocialBar title={content.shareTitle} url={shareUrl} />
                </div>
                <div className="related">
                    {/* <RelatedContent cards={related} /> */}
                </div>
            </div>
        </section>
    )
}

const Standfirst = ({content}) => {

    return (
        <section className="standfirst">
            <div className="content" >
                <div className="lines">

                <div className="body" {...setHtml(content.standfirst)}>

                </div>
                </div>
                
            </div>
        </section>
    )
}
const SmoothScroll = ({children}) => {
    const app = useRef();
    const [pos, setPos] = useState(window.scrollY);
    useEffect(()=>{
        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            const dy = pos-window.scrollY;
            console.log(Math.max(-2100, dy));
            setPos(window.scrollY);
            gsap.to(app.current, {duration: 0.5, y: Math.max(-2100, dy), ease: 'sine.out'});
        });
    },[])
    return (
        <div ref={app}>
            {children}
        </div>
    )
}

const LoopingBgVid = ({src, image}) => {
    const ref = useRef();
    const handCanPlay = () => {
        gsap.to(ref.current, {alpha: 1});
    }

    useEffect(()=>{
        gsap.set(ref.current, {alpha: 0});
    }, []);
    
    return (
        <div className="video-bg">
            {image &&
            <div className="image" style={{backgroundImage: `url(<%= path %>/${image})`}} ></div>
            }
            {src && 
            <video ref={ref} src={`<%= path %>/${src}`} loop muted='true' autoPlay width="400" height="200" playsInline onCanPlayThrough={handCanPlay}></video>
            }
        </div>
    )
}

const BgVidSection = ({src, title}) =>
    <section className="bg-vid-container">
        <LoopingBgVid src={src} />
        <header {...setHtml(title)}>
            <h1 className="text-bg"><span>The Early Adopter </span></h1>
            <h2>Making positive environmental choices for future generations</h2>
        </header>
    </section>


const MainBody = ({children}) => {
    const ref = useRef();
    const content = useSelector(s=>s.content);
    const store = useSelector(s=>s);
    const refSlider = useRef();

    const slides = [
        {
            key: 1,
            content: <div><p><strong>Meaningful change</strong></p></div>,
            bgColor: '#EEC990',
            cta: 'https://www.theguardian.com/google-helpful-by-nature/2022/aug/17/first-nations-women-are-powerful-inspirational-leaders-and-they-are-all-around-us'
        },
        {
            key: 2,
            content:  <div><p><strong>Women save <nobr>women’s lives</nobr></strong><br/>Yarn with Ashlee Donohue and Bronwyn Penrith</p></div>,
            bgColor: '#FBD396',
            cta: ''
        },
        {
            key: 3,
            content: <div><p><strong>Spark that black joy</strong><br/>Yarn with Jessica Johnson and Jarin Baigent</p></div>,
            bgColor: '#FD9C42E5',
            cta: ''
        },
        {
            key: 4,
            content: <div><p><strong>Support is transgenerational</strong><br/>Yarn with Naomi and Jeanni Moran</p></div>,
            bgColor: '#E9A47DE5',
            cta: ''
        },
        {
            key: 5,
            content: <div><p><strong>Breaking the chain</strong><br/>Yarn with Heidi Bradshaw and Annette Toomey </p></div>,
            bgColor: '#E98A7DE5',
            cta: ''
        },
        {
            key: 6,
            content: <div><p><strong>Listening, Learning, and Partnering.</strong></p></div>,
            bgColor: '#FE7528E5',
            cta: ''
        },
    ];

    const NavButton = ({onClick, icon}) => {
        return (
            <div><a href="#" onClick={(e)=>{e.preventDefault();onClick()}}><i>{icon}</i></a></div>
        )
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        // autoplay: true,
        arrows: false,
        appendDots: dots => (
            <div>
                <NavButton onClick={()=>refSlider.current.slickPrev()} icon={<LeftIcon />} />
              <ul style={{ margin: "0px" }}> {dots} </ul>
                <NavButton onClick={()=>refSlider.current.slickNext()} icon={<RightIcon />}  />
            </div>
          ),        
        responsive: [
            // {
            //   breakpoint: 1024,
            //   settings: {
            //     slidesToShow: 3,
            //     slidesToScroll: 3,
            //     infinite: true,
            //     dots: true
            //   }
            // },
            {
              breakpoint: 980,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]        
      };

    return (
        <div className="main" ref={ref}>
            <div className="bg-wrap">

                <Header />

                <div className="h-line"></div>
                <div className="boxed">
                    <h1><span style={{fontSize: '125%'}}>Helpful by nature:</span> <br /> the power of connection through community </h1>
                    <p>When we care for our community, helping them is a natural extension of who we are. </p>
                    <p>Australia’s First Nations women are inspirational leaders from whom we can all learn a lot about community, and the importance of support, mentorship and being helpful - by nature.</p>

                    <div className="prompt">
                        <p><TapIcon/> Tap to listen to yarns with First Nations Women</p>
                    </div>
                </div>
                
                <div className="slider">
                        <Slider {...settings} ref={refSlider}>
                    {slides.map(v=>
                        <div className={`slide ${v.cta ? '': 'inactive'}`}>
                            <div className="slide-panel">
                                <div className="img">
                                    <img src={`${assetsPath}/slide${v.key}.jpg`} alt="" />
                                </div>
                                <div className="desc" style={{backgroundColor: v.bgColor}}>
                                    <a href={v.cta} target="_blank">{v.content}</a>
                                </div>
                            </div>
                        </div>
                    )}
                    </Slider>
                </div>

                <div className="h-line"></div>
                <div className="video-intro">
                    <div className="boxed">
                        <h2>We should celebrate and support them by listening</h2>
                        <p>These women came together to yarn and share their stories, and the magic of country is ever present.</p>
                        <div className="prompt">
                            <p><PlayIcon/> Tap to watch more inspirational First Nations women</p>
                        </div>
                    </div>
                </div>
                <VideoPlayer />
                <div className="h-line"></div>
            </div>

            <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
        </div>
    )
}


const VideoPlayer = () => {

    const playerRef = useRef();
    const videoRef = useRef();

    // videojs.options.bigPlayButton = false;
    videojs.options.html5 = {

        nativeTextTracks: false,
        nativeAudioTracks: false,
        nativeVideoTracks: false,
        hls: {
          overrideNative: true
        }

    }

    useEffect(()=>{
        // https://videojs.com/guides/layout/
        if (!playerRef.current) {

            if (!videoRef.current) return;
            const player = playerRef.current = videojs(videoRef.current, {
                inactivityTimeout: 0,       
            });
            // player.autoplay(true)
            player.src({
                // src: '/assets/video/out.mpd',
                // type: 'application/dash+xml'
                // https://stackoverflow.com/questions/29351225/playing-with-video-js-ustream-m3u8-file-streaming
                // src: `${assetsPath}/video/hbn.mp4`,
                src: `${assetsPath}/video/hbn-720.m3u8`,
                type: 'application/x-mpegURL'
              });
            // player.src('/assets/video/bethechange.mp4');
            // player.on('ended',(e)=>{
            //     // console.log('END', e);
            //     setVideoEnded(true);
            //     player.one('timeupdate',(e)=>{
            //         // console.log(e);
            //         setVideoEnded(false);
            //     });                
            // });

            player.on('loadedmetadata',()=>{
                const dur = player.duration();
                console.log('duration', dur);
                
            });
        }

    },[videoRef])    

    return (
        <div className="video-player">
            <video ref={videoRef} controls playsInline className={`video-js vjs-fill`} >
            {/* <track kind="metadata" src="/assets/video/meta.vtt"/> */}
            </video>
        </div>
    )

}

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    const dispatch = useDispatch();



    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/12b7ABKuCvTUHl0toueUkTe6TLSTBCr1MP4JrjfBR3ug.json') );
    },[]);


    

    const content = useSelector(s=>s.content);

    const store = useSelector(s=>s);    
    // return <Loading />;

    return (
        <SwitchTransition>
            <Transition
                key={loaded}
                timeout={1000}
                onEnter={n=>gsap.from(n,{alpha: 0})}
                onExit={n=>gsap.to(n,{alpha:0})}
                mountOnEnter
                unmountOnExit
                appear={true}
            >
                {!loaded && <Loading />}
                {loaded &&

                    
                    <MainBody>

                        
                        
                        
                        
                    </MainBody>
                    
                }
            </Transition>            
        </SwitchTransition>
    )
}


const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>

    )
}

render( <App/>, document.getElementById('Glabs'));

