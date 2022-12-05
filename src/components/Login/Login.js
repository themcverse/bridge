import React from "react";

import "./Login.css";
import {
  svgBorderBL,
  svgBorderBR,
  socialDiscord,
  socialInstagram,
  socialTwitter,
  headerTitleBg,
  headerTitle,
} from "../../utils/helper/image.helper";

import grantsFrame from "../../assets/image/grantsville/frame-2.png";
import grantsFrameBorder from "../../assets/image/grantsville/frame-border-4.png";
import grantsFooter from "../../assets/image/grantsville/footer-3.png";
import grantsSocialDiscord from "../../assets/image/grantsville/social-discord.png";
import grantsSocialTwitter from "../../assets/image/grantsville/social-twitter.png";
import grantsSocialInstagram from "../../assets/image/grantsville/social-instagram.png";
import borderTM from "../../assets/svg/grantsville/border-tm.svg";

import logo from "../../assets/image/logo.png";

const Login = ({ connectWallet }) => {
  return (
    <>
      <div className="main grantsville hidden md:block">
        <div className="w-full h-full absolute bg-black mix-blend-screen"></div>
        <div className="particle">
          <div className="particle-radial absolute w-full"></div>
          <div className="particle-radial absolute w-full"></div>
          <img
            src={grantsFrame}
            alt="frame"
            className="w-full h-full absolute hidden md:block"
          />
          <img
            src={grantsFrameBorder}
            alt="frameBorder"
            className="w-full h-full hidden md:block absolute"
          />
          <img
            src={grantsFooter}
            alt="footer"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[72%] h-[13.5%] mix-blend-overlay hidden md:block"
          />
          {/* Header */}
          <img
            src={logo}
            alt="logo"
            className="absolute top-[0.5vw] left-[0.5vw] w-24 lg:w-28 xl:w-32 2xl:w-auto"
          />
          <img
            src={borderTM}
            alt="border-tm"
            className="absolute top-0 left-1/2 -translate-x-1/2 md:w-[40vw] lg:w-[30vw]"
          />
          <img
            src={headerTitleBg}
            alt="titleBg"
            className="absolute left-1/2 top-[calc(3vh+1px)] -translate-x-1/2 mix-blend-multiply w-[260px] md:w-96 lg:w-auto"
          />
          <img
            src={headerTitle}
            alt="title"
            className="absolute left-1/2 top-[calc(3vh+1px)] -translate-x-1/2 w-96 lg:w-auto"
          />
          <div className="absolute md:top-[3.5vh] lg:top-[5vh] left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div
              className="md:text-base lg:text-[20px] font-semibold text-[#FFD900] font-raleway uppercase tracking-widest"
              style={{ textShadow: "0px 0px 5px rgba(0, 128, 255, 0.98)" }}
            >
              welcome to mcverse
            </div>
          </div>
          {/* Main */}
          {/* START: Callout Body */}
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="connect-wallet font-raleway text-center uppercase w-[600px]">
              <div
                className="text-[#00E0FF] font-semibold text-2xl tracking-[2.7px] pt-14 pb-8"
                style={{ textShadow: "0px 0p 5px #FFFFFF" }}
              >
                please connect your wallet
              </div>
              <div className="w-1/2 h-px border-t border-dashed border-[#0080FF] mx-auto"></div>
              <div
                className="w-fit text-white font-bold text-2xl tracking-[1px] border border-solid hover:bg-cyan-500 hover:bg-opacity-50 border-white rounded-tr-[10px] rounded-bl-[10px] cursor-pointer py-6 px-9 my-9 mx-auto"
                style={{ textShadow: "0px 0px 5px #0080FF" }}
                onClick={() => connectWallet()}
              >
                connect wallet
              </div>
              <div className="w-3/5 text-sm text-white tracking-[1.5px] mx-auto mb-10">
                make sure you connect your metamask to the harmony network
              </div>
            </div>
          </div>
          {/* END: Callout Body */}

          {/* Footer */}
          <>
            <div className="absolute left-1/2 bottom-[1vh] w-3/5 -translate-x-1/2 flex items-center">
              <a
                href="https://avalanchehills.com"
                target={"_blank"}
                rel="noreferrer"
                className="text-[10px] text-white font-raleway tracking-[2px] uppercase"
                style={{ textShadow: "0px 0px 3px #0080FF" }}
              >
                mcverse.app
              </a>
              <div className="grow border border-t border-[#707070] mx-2 shadow-[0_0_3px_#0080FF]"></div>
              <div className="flex items-center gap-1">
                <a
                  href="https://discord.gg/nvHbwmMVUs"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={grantsSocialDiscord}
                    alt="discord"
                    className="w-6"
                  />
                </a>
                <a
                  href="https://twitter.com/TheMCVerse"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={grantsSocialTwitter}
                    alt="twitter"
                    className="w-6"
                  />
                </a>
                <a
                  href="https://www.instagram.com/the_mcverse/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <img
                    src={grantsSocialInstagram}
                    alt="instagram"
                    className="w-6"
                  />
                </a>
              </div>
            </div>
            <img
              src={svgBorderBL}
              alt="border-bl"
              className="absolute bottom-0 w-[12vw] left-0"
            />
            <img
              src={svgBorderBR}
              alt="border-br"
              className="absolute bottom-0 w-[12vw] right-0"
            />
          </>
        </div>
      </div>
      {/* mobile view */}
      <div
        className="main-mobile md:hidden h-[100vh]"
        style={{ height: "unset" }}
      >
        <img
          src={headerTitleBg}
          alt="titleBg"
          className="absolute left-1/2 -translate-x-1/2 mix-blend-multiply w-4/5 sm:w-1/2"
        />
        <img
          src={headerTitle}
          alt="title"
          className="absolute left-1/2 -translate-x-1/2 w-4/5 sm:w-1/2"
        />
        <div className="w-full h-[100vh] flex items-center justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center w-[90vw] h-10 text-center">
            <div
              className="text-sm font-semibold text-[#FFD900] font-raleway uppercase tracking-widest w-full"
              style={{ textShadow: "0px 0px 5px rgba(0, 128, 255, 0.98)" }}
            >
              welcome to mcverse
            </div>
          </div>
          <div className="connect-wallet font-raleway text-center uppercase w-[90vw]">
            {/* <div className="connect-wallet-border"></div> */}
            <div
              className="text-[#00E0FF] font-semibold text-xl tracking-[2.7px] pt-14 pb-8"
              style={{ textShadow: "0px 0p 5px #FFFFFF" }}
            >
              please connect your wallet
            </div>
            <div className="w-1/2 h-px border-t border-dashed border-[#0080FF] mx-auto"></div>
            <div
              className="w-fit text-white font-bold text-xl tracking-[1px] border border-solid hover:bg-cyan-500 hover:bg-opacity-50 border-white rounded-tr-[10px] rounded-bl-[10px] cursor-pointer py-6 px-9 my-9 mx-auto"
              style={{ textShadow: "0px 0px 5px #0080FF" }}
              onClick={() => connectWallet()}
            >
              connect wallet
            </div>
            <div className="w-3/5 text-sm text-[#00E0FF] tracking-[1.5px] mx-auto mb-10">
              make sure you connect your metamask to the harmony network
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-cyan-900 via-black to-black w-full px-4 md:hidden">
          <div className="flex items-center justify-center">
            <div className="w-32 flex items-center justify-center transform -translate-y-1/4">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <a
                href="https://discord.gg/nvHbwmMVUs"
                target="_blank"
                className="w-7 mx-0.5"
                rel="noreferrer"
              >
                <img src={socialDiscord} alt="discord" />
              </a>
              <a
                href="https://twitter.com/TheMCVerse"
                target="_blank"
                className="w-7 mx-0.5"
                rel="noreferrer"
              >
                <img src={socialTwitter} alt="twitter" />
              </a>
              <a
                href="https://www.instagram.com/the_mcverse/"
                target="_blank"
                className="w-7 mx-0.5"
                rel="noreferrer"
              >
                <img src={socialInstagram} alt="instagram" />
              </a>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 bg-gray-400 rounded-full border border-black"
                style={{ boxShadow: "0px 0px 5px rgba(255, 192, 0, 0.74902)" }}
              ></div>
              <div className="font-raleway uppercase ml-1">
                <div className="text-gray-400 text-sm">disconnected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
