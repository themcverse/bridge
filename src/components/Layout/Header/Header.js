import React from "react";
import { Fade } from "react-awesome-reveal";

import "./Header.css";
import {
  svgBorderTM,
  headerTitle,
  headerTitleBg,
} from "../../../utils/helper/image.helper";

import headerTitleBg2 from "../../../assets/svg/header-title-bg-2.svg";
import headerTitleBorder2 from "../../../assets/svg/header-title-border-2.svg";
import headerCityLogo from "../../../assets/image/header-avax-hills-logo.png";
import logo from "../../../assets/image/logo.png";

import grantsBorderTM from "../../../assets/svg/grantsville/border-tm.svg";
import grantsHeaderTitleBg from "../../../assets/svg/grantsville/header-title-bg.svg";
import grantsHeaderTitleBorder from "../../../assets/svg/grantsville/header-title-border.svg";
import grantsHeaderCityLogo from "../../../assets/image/grantsville/grantsville-city-logo.png";

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
      </div>
      <img
        src={cityLogos[theme]}
        alt="metacity-logo"
        className="absolute top-1.5 left-1.5 w-5 md:top-[4vh] md:left-[36%] md:w-[2.3vw] z-10"
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
            mcverse
            <span className="text-white ml-2 pl-2 border-l border-white md:hidden">
              bridge
            </span>
          </div>
        </Fade>
      </div>
      <div className="absolute top-2 md:top-[3.5vh] lg:top-[4.5vh] left-8 md:left-[70%] md:-translate-x-1/2 hidden md:flex items-center gap-2">
        <Fade direction="up">
          <div
            className="text-xs md:text-sm font-semibold text-white font-raleway uppercase tracking-widest"
            style={{
              textShadow:
                theme === "light"
                  ? "0px 0px 5px rgba(255, 97, 97, 0.98)"
                  : "0px 0px 5px rgba(0, 133, 255, 0.98)",
            }}
          >
            bridge
          </div>
        </Fade>
      </div>
    </header>
  );
};

export default Header;
