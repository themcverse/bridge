import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Else, If, Then } from "react-if";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store/configureStore";

import Login from "./components/Login";
import Layout from "./components/Layout";
import Bridge from "./components/Bridge";

import { useMetaMask } from "./hooks/useMetaMask";
import useDarkMode from "./hooks/useDarkMode";

const App = () => {
  const [account, avaxBalance, { connectWallet, checkIfWalletIsConnected }] =
    useMetaMask();

  const [theme, setTheme] = useDarkMode();

  React.useEffect(() => {
    console.log(account);
    console.log(avaxBalance);
  }, [account, avaxBalance]);

  React.useEffect(() => {
    checkIfWalletIsConnected();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <If condition={account}>
        <Then>
          <Provider store={store}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout
                    avaxBalance={avaxBalance}
                    theme={theme}
                    setTheme={setTheme}
                  />
                }
              >
                <Route
                  path="/"
                  element={<Bridge account={account} theme={theme} />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Provider>
        </Then>
        <Else>
          <Login connectWallet={connectWallet} />
        </Else>
      </If>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
