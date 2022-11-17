import React from "react";

import { frame, frameBorder, footer } from "../../utils/helper/image.helper";

import grantsFrame from "../../assets/image/grantsville/frame-2.png";
import grantsFrameBorder from "../../assets/image/grantsville/frame-border-4.png";
import grantsFooter from "../../assets/image/grantsville/footer-3.png";

const LayoutContainer = (props) => {
  return (
    <>
      <div
        className={`main ${props.bgClass} ${
          props.theme === "dark" && "grantsville"
        } hidden md:block`}
      >
        {/* <div className="w-full h-full absolute bg-black mix-blend-screen"></div> */}
        <div className="particle">
          <div className="particle-radial absolute w-full"></div>
          <div className="particle-radial absolute w-full"></div>
          <img
            src={props.theme === "light" ? frame : grantsFrame}
            alt="frame"
            className="w-full h-full absolute hidden md:block"
          />
          <img
            src={props.theme === "light" ? frameBorder : grantsFrameBorder}
            alt="frameBorder"
            className="w-full h-full hidden md:block absolute"
          />
          <img
            src={props.theme === "light" ? footer : grantsFooter}
            alt="footer"
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[72%] h-[13.5%] ${
              props.theme === "light" ? "mix-blend-normal" : "mix-blend-overlay"
            } hidden md:block`}
          />
          {props.children}
        </div>
      </div>
      <div
        className={`main-mobile ${props.bgClass} md:hidden min-h-screen`}
        style={{ height: "unset" }}
      >
        {props.children}
      </div>
    </>
  );
};

export default LayoutContainer;
