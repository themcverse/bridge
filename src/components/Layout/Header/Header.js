import React, { useState, useCallback } from "react";
import { Fade } from "react-awesome-reveal";
import { formatEther } from "ethers/lib/utils";

import "./Header.css";
import {
  svgBorderTM,
  logoAvax,
  headerTitle,
  headerTitleBg,
} from "../../../utils/helper/image.helper";

import headerTitleBg2 from "../../../assets/svg/header-title-bg-2.svg";
import headerTitleBorder2 from "../../../assets/svg/header-title-border-2.svg";
import headerCityLogo from "../../../assets/image/header-avax-hills-logo.png";
import cityAvalancheHillsLogo from "../../../assets/image/avax-hills-circle-logo-white.png";
import cityGrantsvilleLogo from "../../../assets/image/grantsville-select-logo.png";
import iconArrowUpRed from "../../../assets/svg/icon-arrow-up-red.svg";
import iconArrowUpYellow from "../../../assets/svg/icon-arrow-up-yellow.svg";
import logo from "../../../assets/image/logo.png";

import grantsBorderTM from "../../../assets/svg/grantsville/border-tm.svg";
import grantsHeaderTitleBg from "../../../assets/svg/grantsville/header-title-bg.svg";
import grantsHeaderTitleBorder from "../../../assets/svg/grantsville/header-title-border.svg";
import grantsHeaderCityLogo from "../../../assets/image/grantsville/grantsville-city-logo.png";

const brandNames = {
  light: "avalanche hills",
  dark: "grantsville",
};
const cityLogos = {
  light: headerCityLogo,
  dark: grantsHeaderCityLogo,
};
const borderTMs = {
  light: svgBorderTM,
  dark: grantsBorderTM,
};
const headerTitleBgs = {
  light: headerTitleBg2,
  dark: grantsHeaderTitleBg,
};
const headerTitleBorders = {
  light: headerTitleBorder2,
  dark: grantsHeaderTitleBorder,
};

const Header = ({ menu, theme, avaxBalance, setTheme }) => {
  // const [isCityOpen, setIsCityOpen] = useState(false);

  // const handleSelectMetacity = useCallback(() => {
  //   setIsCityOpen(!isCityOpen);
  // }, [isCityOpen]);
  // const handleSelectToAvalancheHills = useCallback(() => {
  //   setTheme("light");
  //   setIsCityOpen(false);
  // }, [setTheme]);
  // const handleSelectToGrantsville = useCallback(() => {
  //   setTheme("dark");
  //   setIsCityOpen(false);
  // }, [setTheme]);

  return (
    <header>
      <img
        src={logo}
        alt="logo"
        className="absolute top-[0.3vw] left-[0.3vw] w-24 lg:w-28 xl:w-32 2xl:w-auto hidden md:block"
      />
      <img
        src={borderTMs[theme]}
        alt="border-tm"
        className="absolute top-0 left-1/2 -translate-x-1/2 md:w-[40vw] lg:w-[30vw] hidden md:block"
      />
      <img
        src={headerTitleBgs[theme]}
        alt="titleBg"
        className="absolute left-1/2 top-[calc(3vh+2px)] -translate-x-1/2 mix-blend-multiply w-64 lg:w-[28.5%] hidden md:block"
      />
      <div className="absolute left-1/2 top-[calc(3vh+1px)] -translate-x-[34.3%] w-96 lg:w-[42%] z-10 hidden md:block">
        <img
          src={headerTitleBorders[theme]}
          alt="titleBorder"
          className="relative"
        />
        {/* {isCityOpen && (
          <div className="z-50 absolute top-full left-[34.3%] -translate-x-1/2 grid grid-cols-2 gap-2 xl:gap-4 border border-t-0 border-white rounded-b-2xl bg-gradient-to-b from-black to-[#1C1C1C] z-101 w-1/2 py-4">
            <div className="flex items-center justify-center">
              <div
                className="cursor-pointer"
                onClick={() => handleSelectToAvalancheHills()}
              >
                <img src={cityAvalancheHillsLogo} alt="" className="w-full" />
                {theme === "light" && (
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <img src={iconArrowUpRed} alt="" />
                    <div className="font-raleway font-semibold text-[10px] text-[#FF0000] tracking-[2px] uppercase">
                      selected
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div
                className="cursor-pointer"
                onClick={() => handleSelectToGrantsville()}
              >
                <img
                  src={cityGrantsvilleLogo}
                  alt=""
                  className="w-[80%] mx-auto"
                />
                {theme === "dark" && (
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <img src={iconArrowUpYellow} alt="" />
                    <div className="font-raleway font-semibold text-[10px] text-[#FFD10F] tracking-[2px] uppercase">
                      selected
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )} */}
      </div>
      <img
        src={cityLogos[theme]}
        alt="metacity-logo"
        className="absolute top-[4vh] left-[36%] w-[2.3vw] z-10"
      />
      {/* mobile view */}
      <img
        src={headerTitleBg}
        alt="titleBg"
        className="absolute mix-blend-multiply w-[250px] md:hidden"
      />
      <img
        src={headerTitle}
        alt="title"
        className="absolute w-[250px] md:hidden"
      />
      {/* mobile view */}

      <div className="z-10 absolute top-2 md:top-[3.5vh] xl:top-[5vh] left-8 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 xl:gap-4">
        <Fade direction="up">
          <div
            className="text-xs md:text-base lg:text-[20px] font-semibold text-[#FFD900] font-raleway uppercase tracking-widest"
            style={{
              textShadow:
                theme === "light"
                  ? "0px 0px 5px rgba(255, 97, 97, 0.98)"
                  : "0px 0px 5px rgba(0, 133, 255, 0.98)",
            }}
          >
            {/* {brandNames[theme]} */}
            mcverse
          </div>
          {/* <div className="w-px h-5 border-r border-white"></div>
          <div
            className="font-raleway font-semibold text-xs text-[#FF0000] dark:text-[#FFD10F] uppercase tracking-widest cursor-pointer"
            style={{
              textShadow:
                theme === "light"
                  ? "0px 0px 5px rgba(255, 97, 97, 0.98)"
                  : "0px 0px 5px #FFCE0D",
            }}
            onClick={() => handleSelectMetacity()}
          >
            select metacity
          </div> */}
        </Fade>
      </div>
      <div className="absolute top-2 md:top-[3.5vh] lg:top-[4.5vh] left-8 md:left-[70%] md:-translate-x-1/2 flex items-center gap-2">
        <Fade direction="up">
          {/* <img src={headerIconGarage} alt="" /> */}
          <div
            className="text-xs md:text-sm font-semibold text-white font-raleway uppercase tracking-widest"
            style={{
              textShadow:
                theme === "light"
                  ? "0px 0px 5px rgba(255, 97, 97, 0.98)"
                  : "0px 0px 5px rgba(0, 133, 255, 0.98)",
            }}
          >
            {/* {menu === "" && "global"}
            {menu === "dealership" && "dealership"}
            {menu === "presale" && "presale"}
            {menu === "mygarage" && "my garage"}
            {menu === "bank" && "bank"}
            {menu === "speedshop" && "speedshop"}
            {menu === "bridge" && "bridge"} */}
            bridge
          </div>
        </Fade>
      </div>
      {/* <div className="absolute top-[7%] right-12 lg:right-16 md:flex items-center hidden">
        <Fade cascade direction="left">
          <div className="flex items-center">
            <img src={logoAvax} alt="avax" className="lg:w-10 xl:w-12" />
            <div className="ml-4">
              <div className="text-white text-xs font-raleway uppercase tracking-widest">
                avax
              </div>
              <div
                className="text-base xl:text-lg text-white tracking-widest font-bold"
                style={{ fontFamily: "Raleway" }}
              >
                {avaxBalance && (+formatEther(avaxBalance)).toLocaleString()}
              </div>
            </div>
          </div>
        </Fade>
      </div> */}
    </header>
  );
};

export default Header;
