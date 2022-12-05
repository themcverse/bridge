import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  svgBorderBL,
  svgBorderBR,
  svgAvaxEf,
  socialDiscord,
  socialTwitter,
  socialInstagram,
} from "../../../utils/helper/image.helper";
import logo from "../../../assets/image/logo.png";

import { setAvaxPrice } from "../../../reducers/mintInfoSlice";

import grantsSocialDiscord from "../../../assets/image/grantsville/social-discord.png";
import grantsSocialInstagram from "../../../assets/image/grantsville/social-instagram.png";
import grantsSocialTwitter from "../../../assets/image/grantsville/social-twitter.png";

const iconDiscord = {
  light: socialDiscord,
  dark: grantsSocialDiscord,
};
const iconTwitter = {
  light: socialTwitter,
  dark: grantsSocialTwitter,
};
const iconInstagram = {
  light: socialInstagram,
  dark: grantsSocialInstagram,
};
const Footer = ({ menu, theme }) => {
  const dispatch = useDispatch();

  const avaxPrice = useSelector((state) => state.mintInfo.avaxPrice);

  useEffect(() => {
    const getAvaxPrice = async () => {
      try {
        const coinData = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
          { method: "GET" }
        );
        const coin = await coinData.json();
        console.log("-------avax price-------", coin);
        dispatch(setAvaxPrice(coin["avalanche-2"].usd));
      } catch (error) {
        console.log(error);
      }
    };

    setInterval(() => {
      getAvaxPrice();
    }, 300000);
    return () => {
      // clearInterval(getAvaxPriceTimer);
    };
  }, [dispatch]);

  return (
    <footer>
      {/* <div className="absolute left-2 xl:left-5 bottom-[2vh] hidden md:block">
        <Fade cascade direction="down">
          <div className="flex items-center relative mt-2">
            <img src={svgAvaxEf} alt="one-icon" className="absolute left-0" />
            <div className="uppercase ml-12">
              <div className="text-white text-sm tracking-widest">
                {avaxPrice}
              </div>
              <div className="text-[#9E9E9E] text-[8px] font-raleway tracking-wider">
                $avax price
              </div>
            </div>
          </div>
        </Fade>
      </div> */}
      <div className="absolute left-1/2 bottom-[1vh] w-3/5 -translate-x-1/2 md:flex items-center hidden">
        <a
          href="https://avalanchehills.com"
          target={"_blank"}
          rel="noreferrer"
          className="text-[10px] text-[#FF3333] dark:text-white font-raleway tracking-[2px] uppercase"
          style={{
            textShadow:
              theme === "light" ? "0px 0px 3px #FF0000" : "0px 0px 3px #0080FF",
          }}
        >
          mcverse.app
        </a>
        <div className="grow border border-t border-[#707070] mx-2 shadow-[0_0_3px_#FF0000] dark:shadow-[0_0_3px_#0080FF]"></div>
        <div className="flex items-center gap-1">
          <a
            href="https://discord.gg/nvHbwmMVUs"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={iconDiscord[theme]} alt="discord" className="w-6" />
          </a>
          <a
            href="https://twitter.com/TheMCVerse"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={iconTwitter[theme]} alt="twitter" className="w-6" />
          </a>
          <a
            href="https://www.instagram.com/the_mcverse/"
            target={"_blank"}
            rel="noreferrer"
          >
            <img src={iconInstagram[theme]} alt="instagram" className="w-6" />
          </a>
        </div>
      </div>
      <div className="absolute right-5 bottom-[2vh] md:flex items-center hidden">
        <div className="absolute animate-ping ml-0.5 w-5 h-5 rounded-full bg-green-500 opacity-75"></div>
        <div
          className="w-6 h-6 bg-[#13BB6B] rounded-full border border-black"
          style={{ boxShadow: "0px 0px 5px rgba(255, 192, 0, 0.74902)" }}
        ></div>
        <div className="font-raleway uppercase ml-2">
          <div className="text-[#13BB6B] text-sm tracking-widest">
            connected
          </div>
          <div className="text-[#9E9E9E] text-[8px] tracking-wider">
            harmony network
          </div>
        </div>
      </div>
      <img
        src={svgBorderBL}
        alt="border-bl"
        className="absolute bottom-0 left-0 w-[12vw] hidden md:block"
      />
      <img
        src={svgBorderBR}
        alt="border-br"
        className="absolute bottom-0 right-0 w-[12vw] hidden md:block"
      />
      {/* Mobile Footer */}
      <div className="bg-gradient-to-b from-cyan-900 to-black w-full px-4 md:hidden">
        <div className="flex items-center justify-between gap-2 border-b border-dashed border-gray-400">
          <div className="text-center"></div>
          <div className="w-32 flex items-center justify-center transform -translate-y-1/4">
            <Link className="logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="text-center"></div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center relative">
            <img src={svgAvaxEf} alt="one-icon" className="absolute left-0" />
            <div className="uppercase ml-12">
              <div className="text-white text-sm tracking-widest">
                {avaxPrice}
              </div>
              <div className="text-[#9E9E9E] text-[8px] font-raleway tracking-wider">
                $avax price
              </div>
            </div>
          </div>
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
              className="w-4 h-4 bg-[#13BB6B] rounded-full border border-black"
              style={{ boxShadow: "0px 0px 5px rgba(255, 192, 0, 0.74902)" }}
            ></div>
            <div className="font-raleway uppercase ml-1">
              <div className="text-[#13BB6B] text-sm">connected</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
