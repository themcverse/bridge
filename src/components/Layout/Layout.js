import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import LayoutContainer from "./LayoutContainer";

const Layout = ({ avaxBalance, theme, setTheme }) => {
  const currentUrl = window.location.href.split("/").reverse()[0];

  const [menu, setMenu] = useState(currentUrl);

  return (
    <LayoutContainer bgClass={menu} theme={theme}>
      <Header
        menu={menu}
        theme={theme}
        setTheme={setTheme}
        avaxBalance={avaxBalance}
        setMenu={setMenu}
      />
      <Outlet />
      <Footer menu={menu} theme={theme} />
    </LayoutContainer>
  );
};

export default Layout;
