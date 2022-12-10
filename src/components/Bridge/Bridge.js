import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

import "./Bridge.css";
import iconBridge from "../../assets/svg/grantsville/bridge-main-icon.svg";
import logoLambo from "../../assets/image/logo-wenlambo.png";
// import iconGville from "../../assets/svg/grantsville/icon-gville.svg";
// import iconLockedHville from "../../assets/svg/grantsville/icon-locked-hville.svg";
import iconHarmony from "../../assets/svg/icon-harmony.svg";
import iconAvax from "../../assets/svg/icon-avax.svg";
import iconBridging from "../../assets/svg/icon-bridging.svg";
import imgLamboIdBg from "../../assets/svg/grantsville/wenlambo-id-container.svg";

import {
  bridgeAddress,
  wenlamboAddress,
  wenlamboGarageAddress,
  avaxLamboAddress,
} from "../../contracts/address";
import bridgeABI from "../../contracts/abis/Bridge.json";
import wenlamboABI from "../../contracts/abis/Wenlambo/Wenlambo.json";
import wenlamboGarageABI from "../../contracts/abis/Wenlambo/Garage.json";

const Bridge = ({ account }) => {
  const [isBridging, setIsBridging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [bridgeContract, setBridgeContract] = useState(null);
  const [wenlamboContract, setWenlamboContract] = useState(null);
  const [wenlamboGarageContract, setWenlamboGarageContract] = useState(null);
  const [wenlamboIds, setWenlamboIds] = useState([]);
  // const [lockedHville, setLockedHville] = useState(0);
  // const [unlockedHville, setUnlockedHville] = useState(0);

  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxLamboIds, setAvaxLamboIds] = useState([]);
  // const [avaxLockedHville, setAvaxLockedHville] = useState(0);

  const handleBridgeAll = async () => {
    try {
      if (isBridging) return;
      setIsBridging(true);
      const isApproved = await wenlamboContract.isApprovedForAll(
        account,
        bridgeAddress
      );
      console.log(isApproved);
      if (!isApproved) {
        const txApproval = await wenlamboContract.setApprovalForAll(
          bridgeAddress,
          true
        );
        await txApproval.wait();
      }

      if (wenlamboIds.length > 50) {
        const queue = wenlamboIds.slice(0, 50).map((id) => [
          [wenlamboAddress, id],
          ["fuji", account],
        ]);
        const tx = await bridgeContract.queue(queue);
        console.log(tx);
        const result = await tx.wait();
        console.log(result);
      } else {
        const queue = wenlamboIds.map((id) => [
          [wenlamboAddress, id],
          ["fuji", account],
        ]);
        const tx = await bridgeContract.queue(queue);
        console.log(tx);
        const result = await tx.wait();
        console.log(result);
      }
      // const queue = wenlamboIds.map((id) => [
      //   [wenlamboAddress, id],
      //   ["fuji", account],
      // ]);
      // const tx = await bridgeContract.queue(queue);
      // const tx = await bridgeContract.queue([
      //   [
      //     [wenlamboAddress, wenlamboIds[0]],
      //     ["fuji", account],
      //   ],
      //   [
      //     [wenlamboAddress, wenlamboIds[1]],
      //     ["fuji", account],
      //   ],
      // ]);

      getWenlamboAssets(wenlamboContract, avaxContract);
      setIsBridging(false);
    } catch (error) {
      setIsBridging(false);
      toast.error("Execution reverted");
    }
  };

  const getWenlamboAssets = async (wenlamboContract, avaxContract) => {
    try {
      setIsLoading(true);
      const ids = await wenlamboContract.tokensOfOwner(account);
      const myIds = ids.map((id) => id.toString());
      setWenlamboIds(myIds);
      const avaxIds = await avaxContract.tokensOfOwner(account);
      const myAvaxIds = avaxIds.map((id) => id.toString());
      setAvaxLamboIds(myAvaxIds);
      setIsLoading(false);
      // const attributes = await wenlamboGarageContract.getTokenAttributesMany(
      //   myIds
      // );
      // console.log(attributes);
      // const lockedHville =
      //   await wenlamboGarageContract.getTotalLockedForAddress(account);
      // console.log(lockedHville);
      // const totalUnlocked = attributes.reduce(
      //   (acc, each) =>
      //     acc + parseFloat(ethers.utils.formatUnits(each["unlocked"], 18)),
      //   0
      // );
      // console.log(totalUnlocked);
      // setLockedHville(ethers.utils.formatUnits(lockedHville[0], 18));
      // setUnlockedHville(totalUnlocked);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // const test = async () => {
  //   try {
  //     const rrr = await bridgeContract.historyLength();
  //     console.log("---- test ----\n", rrr, rrr.toString());
  //     const chain = await bridgeContract.chain();
  //     console.log("chain:", chain);

  //     console.log("account: ", account);
  //     const ids = await wenlamboContract.tokensOfOwner(account);
  //     console.log(
  //       "lambo - ids: ",
  //       ids.map((id) => id.toString())
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const bridgeContract = new ethers.Contract(
      bridgeAddress,
      bridgeABI,
      signer
    );
    // const harmonyProvider = new ethers.providers.JsonRpcProvider(
    //   "https://api.s0.ps.hmny.io"
    // );
    const wenlamboContract = new ethers.Contract(
      wenlamboAddress,
      wenlamboABI,
      signer
    );
    const wenlamboGarageContract = new ethers.Contract(
      wenlamboGarageAddress,
      wenlamboGarageABI,
      signer
    );

    const avaxProvider = new ethers.providers.JsonRpcProvider(
      "https://api.avax.network/ext/bc/C/rpc"
    );
    // "https://api.avax-test.network/ext/bc/C/rpc"
    const avaxContract = new ethers.Contract(
      avaxLamboAddress,
      wenlamboABI,
      avaxProvider
    );

    setBridgeContract(bridgeContract);
    setWenlamboContract(wenlamboContract);
    setWenlamboGarageContract(wenlamboGarageContract);
    setAvaxContract(avaxContract);

    getWenlamboAssets(wenlamboContract, avaxContract);
  }, []);

  return (
    <div className="p-4 pt-10 md:pt-0 mb-8 md:absolute md:left-[10%] md:top-[12%] md:w-[74vw] md:h-[68vh]">
      <div className=" mx-auto">
        <div className="bg-[#072637] bg-opacity-50 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px] p-4 flex flex-col sm:flex-row items-center gap-2">
          <img src={iconBridge} alt="" />
          {/* <button
              className="text-white border border-white bg-cyan-600"
              onClick={() => test()}
            >
              CLICK
            </button> */}

          <div className="text-sm font-raleway font-semibold tracking-[1px] px-2">
            <div className="text-[#FFD900]">
              Grantsville Super Cars are migrating from Harmony to the Avalanche
              Network.
            </div>
            <div className="text-white mt-2">
              Please bridge your NFTs from Harmony to Avalanche. You should be
              on the Harmony network to bridge your NFTs to Avalanche.
            </div>
            <div className="text-white mt-2">
              Please be patient with the bridge, there will be high volumes of
              traffic at times. Rest assured, your NFTs are in the queue and are
              safe. You may hit the REFRESH button below to see if your Super
              Cars have arrived in Avalanche.
            </div>
            <div className="text-white mt-2">
              You may also check the status of your assets{" "}
              <a
                href="https://testnet.snowtrace.io/token/0xddfee5d523708799FcDd63B736bb95aE9546bF68#balances"
                className="underline text-[#FFD900]"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>{" "}
              and look for the last 5 digits of your wallet to find your queue.
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-14 ml-10 sm:ml-0 grid sm:grid-cols-2 gap-20 min-h-[45vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 z-10 text-center">
          {isBridging ? (
            <>
              <img src={iconBridging} alt="bridging" className="relative" />
              {/* <span class="animate-ping absolute top-0 left-0 h-20 w-20 rounded-full bg-sky-400 opacity-75 z-[-1]"></span> */}
              {/* <div className="absolute animate-ping top-0 left-0 w-10 h-10 rounded-full bg-green-500 opacity-75 z-[-1]"></div> */}
            </>
          ) : (
            <div
              className="bg-[#FFD900] hover:bg-yellow-600 border-4 border-white shadow-[0_0_4px_#FFD900] rounded-full font-raleway font-bold text-xl text-white tracking-[1px] leading-[138px] cursor-pointer"
              style={{
                textShadow: "0px 0px 4px #FFAE00",
                boxShadow: "inset 0px 0px 53px 4px #FFAE00",
              }}
              onClick={() => handleBridgeAll()}
            >
              BRIDGE ALL
            </div>
          )}
        </div>
        <div className="relative bg-[#072637] bg-opacity-70 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px] max-h-[35vh] lg:max-h-[40vh]">
          <img
            src={iconHarmony}
            alt="harmony"
            className="absolute left-0 top-1/2 sm:left-1/2 sm:top-0 -translate-x-1/2 -translate-y-1/2"
          />
          {/* {asset === "" && (
            <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
              <div className="text-[#87C5E4]">
                THERE ARE NO ASSETS IN YOUR HARMONY WALLET
              </div>
              <div className="text-[#FFD900] mt-4">NO ACTION REQUIRED</div>
            </div>
          )} */}
          {wenlamboIds.length === 0 ? (
            <div className="flex items-center justify-center h-full ">
              <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
                <div className="text-[#87C5E4]">
                  THERE ARE NO ASSETS IN YOUR HARMONY WALLET
                </div>
                <div className="text-[#FFD900] mt-4">NO ACTION REQUIRED</div>
              </div>
            </div>
          ) : (
            <div className="p-10">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <img src={logoLambo} alt="lambo" className="w-11" />
                  <div className="font-raleway text-white">
                    <div className="text-xs tracking-widest">WENLAMBONFT</div>
                    <div className="text-[#FDBC00] text-lg font-bold">
                      {wenlamboIds.length}
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center gap-2">
                  <img src={iconLockedHville} alt="hville" />
                  <div className="font-raleway text-white">
                    <div className="text-xs tracking-widest">LOCKED HVILLE</div>
                    <div className="text-[#0986C7] text-lg font-bold">
                      {(+lockedHville).toLocaleString()}
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6 max-h-[15vh] lg:max-h-[20vh] overflow-y-auto">
                {wenlamboIds.map((id) => (
                  <div className="relative" key={id}>
                    <img
                      src={`https://meta.wenlambo.one/images/${id}.png`}
                      alt="lambo"
                      loading="lazy"
                      className="rounded-tl-3xl rounded-br-3xl border border-gray-500"
                    />
                    <img
                      src={imgLamboIdBg}
                      alt=""
                      loading="lazy"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    />
                    <div className="absolute font-bold text-[8px] bottom-0 flex items-center justify-center w-full">
                      #{id}
                    </div>
                  </div>
                ))}
                {/* <img src={imgLambo} alt="lambo" />
                    <img src={imgLambo} alt="lambo" />
                    <img src={imgLambo} alt="lambo" />
                    <img src={imgLambo} alt="lambo" />
                    <img src={imgLambo} alt="lambo" />
                    <img src={imgLambo} alt="lambo" /> */}
              </div>
            </div>
          )}
        </div>
        <div className="relative bg-[#072637] bg-opacity-70 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px] max-h-[35vh] lg:max-h-[40vh]">
          <img
            src={iconAvax}
            alt="avax"
            className="absolute left-0 top-1/2 sm:left-1/2 sm:top-0 -translate-x-1/2 -translate-y-1/2"
          />
          {isBridging ? (
            <div className="flex items-center justify-center h-full">
              <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
                <div className="text-white">MIGRATION RUNNING...</div>
                <PulseLoader color="#ffffff" className="mt-2" />
                <div className="text-[#FF0000] mt-4">
                  MIGRATION HAS BEEN INITIATED FOR YOUR ASSETS.
                </div>
                <div className="text-[#FF0000] mt-1">
                  CHECK BACK SOON TO SEE AN UPDATED STATUS.
                </div>
              </div>
            </div>
          ) : (
            <>
              {avaxLamboIds.length > 0 ? (
                <div className="p-10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <img src={logoLambo} alt="lambo" className="w-11" />
                      <div className="font-raleway text-white">
                        <div className="text-xs tracking-widest">
                          WENLAMBONFT
                        </div>
                        <div className="text-[#FDBC00] text-lg font-bold">
                          {avaxLamboIds.length}
                        </div>
                      </div>
                    </div>
                    {isLoading ? (
                      <div className="px-2 py-1 border border-[#FDBC00] text-[#FDBC00] rounded-tr-xl tracking-[1px] uppercase cursor-not-allowed">
                        refresh
                      </div>
                    ) : (
                      <div
                        className="px-2 py-1 border border-[#FDBC00] hover:bg-yellow-900 text-[#FDBC00] rounded-tr-xl tracking-[1px] uppercase cursor-pointer"
                        onClick={() =>
                          getWenlamboAssets(wenlamboContract, avaxContract)
                        }
                      >
                        refresh
                      </div>
                    )}
                    {/* <div className="flex items-center gap-2">
                      <img src={iconLockedHville} alt="hville" />
                      <div className="font-raleway text-white">
                        <div className="text-xs tracking-widest">
                          LOCKED HVILLE
                        </div>
                        <div className="text-[#0986C7] text-lg font-bold">
                          {(+avaxLockedHville).toLocaleString()}
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <div>
                        <div className="text-white">LOADING...</div>
                        <PulseLoader color="#ffffff" className="mt-2" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6 max-h-[15vh] lg:max-h-[20vh] xl:max-h-[30vh] overflow-y-auto">
                      {avaxLamboIds.map((id) => (
                        <div className="relative" key={id}>
                          <img
                            src={`https://meta.wenlambo.one/images/${id}.png`}
                            alt="lambo"
                            loading="lazy"
                            className="rounded-tl-3xl rounded-br-3xl border border-gray-500"
                          />
                          <img
                            src={imgLamboIdBg}
                            alt=""
                            loading="lazy"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2"
                          />
                          <div className="absolute font-bold text-[8px] bottom-0 flex items-center justify-center w-full">
                            #{id}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
                    <div className="text-white">
                      THERE ARE NO ASSETS IN YOUR AVALANCHE WALLET
                    </div>
                    <div className="text-[#FF0000] mt-4">
                      MINT OR BRIDGE NOW TO SEE ASSETS
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bridge;
