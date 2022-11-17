import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

import {
  mainLogo,
  svgBorderBL,
  svgBorderBR,
  svgAvaxEf,
  socialDiscord,
  socialTwitter,
  socialInstagram,
} from "../../../utils/helper/image.helper";

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
  const mintedNum = useSelector((state) => state.mintInfo.mintedNum);
  const stockNum = useSelector((state) => state.mintInfo.stockNum);

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
            avalanche network
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
      <div className="bg-gradient-to-b from-red-900 to-black w-full px-4 md:hidden">
        <div className="flex items-center justify-between gap-2 border-b border-dashed border-gray-400">
          <div className="text-center">
            {(menu === "presale" || menu === "dealership") && (
              <>
                <div
                  className="text-white font-kanit font-bold text-3xl tracking-[1px]"
                  style={{ textShadow: "0px 0px 5px rgba(255, 87, 87, 0.85)" }}
                >
                  {mintedNum}
                </div>
                <div
                  className="text-[11px] lg:text-xs text-[#FF0000] font-bold font-raleway tracking-[1px] uppercase"
                  style={{ textShadow: "0px 0px 4px #FF0000" }}
                >
                  vehicles minted
                </div>
              </>
            )}
          </div>
          <div className="w-32 flex items-center justify-center transform -translate-y-1/4">
            <Link className="logo" to="/">
              <img src={mainLogo} alt="logo" />
            </Link>
          </div>
          <div className="text-center">
            {(menu === "presale" || menu === "dealership") && (
              <>
                <div
                  className="text-white font-kanit font-bold text-3xl tracking-[1px]"
                  style={{ textShadow: "0px 0px 5px rgba(255, 87, 87, 0.85)" }}
                >
                  {stockNum}
                </div>
                <div
                  className="text-[11px] lg:text-xs text-[#FF0000] font-bold font-raleway tracking-[1px] uppercase"
                  style={{ textShadow: "0px 0px 4px #FF0000" }}
                >
                  stock inventory
                </div>
              </>
            )}
          </div>
        </div>
        {/* <div className="flex items-center justify-between text-yellow-400 border-b border-t border-dashed border-gray-400 py-1"> */}
        {/* <ol>
            <li>
              <a
                href="https://nftkey.app/collections/wenlambonft/"
                target={"_blank"}
                rel="noreferrer"
                className="text-xs"
                title="Click to go to Nftkey.app"
              >
                BUY/SELL LAMBOS ON NFTKEY.APP
              </a>
            </li>
            <li>
              <a
                href="https://app.sushi.com/swap?inputCurrency=0xF9565E8c4E13862f677F144B3cdC8700D9c4BA31&outputCurrency=ETH&chainId=1666600000"
                target={"_blank"}
                rel="noreferrer"
                className="text-xs"
                title="Click to go to Sushi"
              >
                GET HVILLE ON SUSHI
              </a>
            </li>
            <li>
              <a
                href="https://harmonyville.one"
                target={"_blank"}
                rel="noreferrer"
                className="text-xs"
                title="Click to go to Harmonyville.one"
              >
                VISIT HARMONYVILLE.ONE
              </a>
            </li>
          </ol> */}
        {/* </div> */}
        <div className="flex items-center justify-between py-2">
          {/* <div className="flex items-center">
            <img
              src="images/hville-token.png"
              alt="hvilleprice"
              className="w-8 mr-2"
            />
            <div className="flex flex-col">
              <h6 className="color-hville">
                {hvillePrice ? `${parseFloat(hvillePrice).toFixed(4)}` : ""}
              </h6>
              <span className="text-gray-500 text-2xs">$HVILLE</span>
            </div>
          </div> */}
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
