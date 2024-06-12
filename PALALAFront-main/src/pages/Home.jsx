import React from "react";
import Hero from "../components/Home/Hero/Hero";
import Features from "../components/Home/Features/Features";
import Services from "../components/Home/Services/Services";
import Team from "../components/Home/Team/Team";
import Footer from "../components/Footer/Footer";
import LetterAnimation from "../components/Home/LetterAnimation/LetterAnimation";
import CarrouselTests from "../components/Home/CarrouselTests/CarrouselTests";
import { useSelector } from "react-redux";

function Home() {
  const state = useSelector(appState => appState);
  
  return (
    <div>
      <Hero />
      <Features />
      <LetterAnimation />
      <CarrouselTests />
      <Services />
      <Team />
      
    </div>
  );
}

export default Home;
