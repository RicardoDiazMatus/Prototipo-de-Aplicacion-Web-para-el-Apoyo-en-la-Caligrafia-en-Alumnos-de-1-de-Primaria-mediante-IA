import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import OverlayModal from "../components/Utils/OverlayModal/OverlayModal";
import LetterCardDisplay from "../components/Media/LetterCardDisplay/LetterCardDisplay";

const StyledMedia = styled(motion.div)`
  background-color: #ffbe0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: space-evenly;
  min-height: calc(100vh - 5.3rem);
  .media-alphabet-title {
    margin-top: 2rem;
  }
  .media-alphabet-menu {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
    gap: 2rem;
    background-color: #fff8ea;
    border-radius: 3rem;
    padding: 2rem;
  }
  .media-alphabet-element {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffe0db;
    border-radius: 1rem;
    height: 5rem;
    > div {
      display: flex;
      color: #ffffff;
      border-radius: 0.5rem;
      justify-content: center;
      align-items: center;
      background-color: #fe5d41;
      height: 3rem;
      width: 3rem;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .media-help {
    display: flex;
    background-color: #ffffff;
    height: 5rem;
    width: 90%;
    border-radius: 1rem;
    margin-bottom: 2rem;
    justify-content: space-evenly;
    align-items: center;
    font-size: 3rem;
    cursor: pointer;
  }

  @media (min-width: 480px) {
    .media-alphabet-title {
      margin-top: 0rem;
    }
    .media-alphabet-menu {
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
      gap: 3rem;
    }
    .media-alphabet-element {
      height: 8rem;
    }
    .media-help {
      width: 40%;
      margin-bottom: 0rem;
    }
  }

  @media (min-width: 1024px) {
    .media-alphabet-menu {
      width: 90%;
      grid-template-columns: repeat(auto-fill, minmax(10%, 1fr));
      gap: 3rem;
    }
    .media-alphabet-element {
      height: 12rem;
      > div {
        padding: 3rem;
      }
    }
    .media-help {
      width: 30%;
    }
  }
`;

const StyledModalLetterDisplay = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;

  > div {
    flex-basis: 40%;
    height: 20rem;
  }
  @media (min-width: 768px) {
    > div {
      height: 60%;
    }
  }
`;

const mediaData = [
  {
    letter: "A",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/AUgDXQFDAH0?si=yG4_f2K22doLxApb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/IxAAND3Qz_0?si=3_jCJCPKawJWY3nm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "B",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/ZWKhaOKXcgU?si=uGrYo-pe7wvH4t_R" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/_XwrgFbUHEk?si=dTnBXFmRXJ38sreC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "C",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/KgenaaZ9Kdo?si=Sc91eUxFYKZLVMXp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/EMWUjia-tVU?si=HjYMfdI3zl4hyzFk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "D",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/p2RYkunJMTk?si=DRvhp6LUv0LBQWh7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/0co6eR9Bjlw?si=MRrxP37LT0MXrQqD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "E",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/1CzUEGGwMjM?si=CLuIXwHEiRTJZgWR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/maa37s6Mh6I?si=xOjVhNdTXfEOFnU4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "F",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/dm8jfMqQUrc?si=kAJqzscQW-NX8qJg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/FPxOWCH-jCE?si=giCSMv4d4A4iVa6o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "G",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/nk1lu9TzfF8?si=cUYFGpUVXR-G8kIu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/P3voA7lvWE8?si=wbK3l-XsKT1RXNkv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "H",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/IOy1MN0bHzs?si=3G6isRRs-pEI7dvN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/c8KnqS-juns?si=RS-aXyX-8C21zQVf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "I",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/1m_w8mytTzg?si=rqbTxFKw_vgd_4Ka" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/6D0mflpaEqU?si=yWt_L7V31NyOElJc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "J",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/R75oy_zuV-M?si=MLODJJyulkrMlcjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/6D0mflpaEqU?si=qE2UmBg9N6W33w8H" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "K",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/QNSgAlddlJQ?si=iCyIweyDnW0HDyS-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/gqLLyEwOhW8?si=2NVocpGhZqN0yUTV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "L",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/J9rNJEVRV3o?si=0MNqm_wjrjuOZEvP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/MIHNz5Apyyg?si=e_Ak8HP4fhOlzasv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "M",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/StP9cza3HjI?si=Al1wSXfkNG0I94uK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/g2mizBgnMi4?si=pwlYXm9_TP9xVM5z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "N",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/StP9cza3HjI?si=2P5Kw-fhmykTJUXU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/hxg8Gbqh0pQ?si=Td3wdS8sIjhuK29V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
 },
  {
    letter: "Ñ",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/JYn1gj9Z-Jg?si=wocwMAv9b_joAbfE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/hxg8Gbqh0pQ?si=_OCuwzwz8HiBb0gA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "O",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/RfCd6AczA74?si=C_YFCpWy4AmyNroJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/lLWjhX8F9_8?si=9o5lzm12O84_P02b" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "P",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/gnW51f13m0E?si=wrlonP73L2gwU_hb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/Xgk7pWL-r50?si=XT9k9nO_PRgoBvwq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "Q",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/nSnjCQXqZMU?si=GeZ-eAOVUWBhzvsV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/tTs9j_kKUmI?si=7jZE6wf2Iraa0jeU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "R",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/tTs9j_kKUmI?si=7jZE6wf2Iraa0jeU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/uduyoD-4Ubc?si=uUmdH89w5vwSRGLQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "S",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/EIPch8uu4v0?si=XIl8U2za-8H_gCZv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/UnlK_tlBO8g?si=9clxjvA8PXFUKudC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "T",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/38-TqCXs1B4?si=AXDXwiGzB1HZLPja" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/2tSnlqPdAx0?si=te5l6mYNMmA0y1xQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "U",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/X5ZqMR7P-rU?si=HKcW32KatH0Yievg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/MJuExR2Ohfw?si=lDWxsaOtX-afZ_75" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "V",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/UYzeR2_YVCM?si=JY87UDdlrXQGSMLE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/Sl5a3AiRkQs?si=CswkhGdGpYRQX37X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "W",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/MpZKKZmB8lI?si=cym-mZCgFUXvq-ND" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/azlJTu0aD10?si=oVANUiIYjOns8eTx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "X",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/X99MJgmOREc?si=yUXiyc1aQ1r-c8IC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/EEgNFBU-hHE?si=Hw2B3vJ487KnV8Bm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "Y",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/c1-w4qhHhCY?si=Mg_BeTOU0MbdnxUv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/XatPlOphmE8?si=-lOdMjnP9m-qtQQ1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
  {
    letter: "Z",
    uppercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/v7UnQ-5OpXE?si=vGyRFUsFCpsSVwc3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
    lowercaseVideo:
      <iframe width="800" height="500" src="https://www.youtube.com/embed/LCe-Q-v3I74?si=KTAHubmvpkwT-Q6G" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  scrolling="no" allowfullscreen allowtransparency></iframe>,
  },
];

function Media() {
  const [isOverflow, setOverflow] = useState(false);
  const [mediaOptions, setMediaOptions] = useState({});
  const [modal, setModal] = useState();
  const [videoModal, setVideoModal] = useState();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    if (Object.keys(mediaOptions).length === 0) {
      return;
    }
    setModal(
      <StyledModalLetterDisplay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <LetterCardDisplay
            letter={mediaOptions.letter}
            onClickHandle={() =>
              handleLetterCardDisplayClick(mediaOptions.uppercaseVideo)
            }
          />
        </div>
        <div>
          <LetterCardDisplay
            letter={mediaOptions.letter.toLowerCase()}
            onClickHandle={() =>
              handleLetterCardDisplayClick(mediaOptions.lowercaseVideo)
            }
          />
        </div>
      </StyledModalLetterDisplay>
    );
    setOverflow(true);
  }, [mediaOptions]);

  const handleLetterClicked = (letter, ucVideo, lcVideo) => {
    setMediaOptions({
      letter: letter,
      uppercaseVideo: ucVideo,
      lowercaseVideo: lcVideo,
    });
  };

  const handleOverflowClosed = () => {
    setMediaOptions({});
    setModal();
    setVideoModal();
    setVideo();
    setOverflow(false);
  };

  const handleLetterCardDisplayClick = (video) => {
    setVideoModal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundColor: "#FFFFFF" }}
      >
       {video}
      </motion.div>
    );
    setVideo(video);
  };

  return (
    <>
      <AnimatePresence>
        {isOverflow && (
          <OverlayModal
            handleClose={handleOverflowClosed}
            topposition={window.scrollY}
          >
            {video ? videoModal : modal}
          </OverlayModal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <StyledMedia
          variants={{
            hidden: { y: 10, opacity: 0 },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                staggerChildren: 0.4,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="media-alphabet-title"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
              },
            }}
          >
            <h2>Media Trazos Abecedario</h2>
          </motion.div>
          <motion.div
            className="media-alphabet-menu"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {mediaData.map((mediaItem, index) => {
              return (
                <motion.div
                  key={index}
                  className="media-alphabet-element"
                  variants={{
                    hidden: { y: 10, opacity: 0 },
                    show: { y: 0, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleLetterClicked(
                      mediaItem.letter,
                      mediaItem.uppercaseVideo,
                      mediaItem.lowercaseVideo
                    )
                  }
                >
                  <div>
                    <h2>{mediaItem.letter}</h2>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            className="media-help"
            variants={{
              hidden: { y: 10, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                padding: "0 2rem",
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { scale: 0, color: "#000000" },
                show: { scale: 1, color: "#FFBE0A" },
              }}
            >
              <FontAwesomeIcon icon={faLightbulb} />
            </motion.div>

            <motion.div
              variants={{
                hidden: { x: -50, width: "auto", opacity: 0 },
                show: { x: 0, display: "block", opacity: 1 },
              }}
            >
              <h3>Pulsa sobre el Abecedario</h3>
            </motion.div>
          </motion.div>
        </StyledMedia>
      </AnimatePresence>
    </>
  );
}

export default Media;
