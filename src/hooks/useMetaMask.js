import { useState } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";

import { mainnet, testnet, devnet } from "../contracts/networks";

export const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [avaxBalance, setAvaxBalance] = useState(null);

  const connectWallet = async () => {
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        console.log("networkId:", networkId);
        if (networkId === "1666600000") {
          //avax:: testnet:43113  mainnet:43114
          //harmony:: testnet:1666700000  mainnet:1666600000  devnet:1666900000

          toast.success("CONNECTED SUCCESSFULLY");
          console.log(accounts);
          setAccount(accounts[0]);
          web3.eth.getBalance(accounts[0]).then((res) => setAvaxBalance(res));
          //----- Add listeners start -----
          ethereum.on("accountsChanged", (accounts) => {
            window.location.reload();
            // setAccount(accounts[0]);
            // web3.eth.getBalance(accounts[0]).then((res) => setAvaxBalance(res));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          //----- Add listeners end -----
        } else {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: mainnet.chainId }], // testnet // mainnet
            });
          } catch (error) {
            if (error.code === 4902) {
              try {
                await ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: mainnet.chainId,
                      chainName: mainnet.name,
                      nativeCurrency: {
                        name: "ONE",
                        symbol: "ONE",
                        decimals: 18,
                      },
                      rpcUrls: [mainnet.rpcAddress],
                      blockExplorerUrls: [mainnet.explorerUrl],
                    },
                  ],
                });
              } catch (err) {
                console.log(err);
              }
            } else {
              console.log(error);
            }
          }
        }
      } catch (err) {
        toast.error("SOMETHING WENT WRONG");
      }
    } else {
      toast.error("INSTALL METAMASK");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
      if (!metamaskIsInstalled) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        let web3 = new Web3(ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const networkId = await ethereum.request({ method: "net_version" });
          if (networkId === "1666600000") {
            //testnet:43113  mainnet:43114
            //testnet:1666700000  mainnet:1666600000  devnet:1666900000
            setAccount(accounts[0]);
            web3.eth.getBalance(accounts[0]).then((res) => setAvaxBalance(res));
            //----- Add listeners start -----
            ethereum.on("accountsChanged", (accounts) => {
              setAccount(accounts[0]);
              web3.eth
                .getBalance(accounts[0])
                .then((res) => setAvaxBalance(res));
            });
            ethereum.on("chainChanged", () => {
              window.location.reload();
            });
            //----- Add listeners end -----
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [
    account,
    avaxBalance,
    {
      connectWallet,
      checkIfWalletIsConnected,
    },
  ];
};
