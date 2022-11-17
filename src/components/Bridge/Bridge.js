import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { PulseLoader, PuffLoader } from "react-spinners";

import "./Bridge.css";
import iconBridge from "../../assets/svg/grantsville/bridge-main-icon.svg";
import logoLambo from "../../assets/image/logo-wenlambo.png";
import iconGville from "../../assets/svg/grantsville/icon-gville.svg";
import iconLockedHville from "../../assets/svg/grantsville/icon-locked-hville.svg";
import iconHarmony from "../../assets/svg/icon-harmony.svg";
import iconAvax from "../../assets/svg/icon-avax.svg";
import iconBridging from "../../assets/svg/icon-bridging.svg";
// import imgLambo from "../../assets/image/grantsville/wenlambo.png";
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
  const [asset, setAsset] = useState("");
  const [isBridging, setIsBridging] = useState(false);
  // const [isLamboBridged, setIsLamboBridged] = useState(false);
  const [isHvilleBridged, setIsHvilleBridged] = useState(false);

  const [bridgeContract, setBridgeContract] = useState(null);
  const [wenlamboContract, setWenlamboContract] = useState(null);
  const [wenlamboGarageContract, setWenlamboGarageContract] = useState(null);
  const [wenlamboIds, setWenlamboIds] = useState([]);
  const [lockedHville, setLockedHville] = useState(0);
  const [unlockedHville, setUnlockedHville] = useState(0);

  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxLamboIds, setAvaxLamboIds] = useState([]);
  const [avaxLockedHville, setAvaxLockedHville] = useState(0);

  const handleBridgeAll = async (assetType) => {
    try {
      if (isBridging) return;
      setIsBridging(true);
      if (assetType === "all") {
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

        const tx = await bridgeContract.queue([
          [wenlamboAddress, wenlamboIds[0]],
          ["fuji", account],
        ]);
        console.log(tx);
        const result = await tx.wait();
        console.log(result);
        getWenlamboAssets(
          wenlamboContract,
          wenlamboGarageContract,
          avaxContract
        );
      }
      if (assetType === "hville") {
        // setTimeout(() => {
        //   setIsHvilleBridged(true);
        //   setIsBridging(false);
        // }, 3000);
      }
      setIsBridging(false);
    } catch (error) {
      setIsBridging(false);
      toast.error("Execution reverted");
    }
  };

  const getWenlamboAssets = async (
    wenlamboContract,
    wenlamboGarageContract,
    avaxContract
  ) => {
    try {
      const ids = await wenlamboContract.tokensOfOwner(account);
      const myIds = ids.map((id) => id.toString());
      setWenlamboIds(myIds);
      const avaxIds = await avaxContract.tokensOfOwner(account);
      const myAvaxIds = avaxIds.map((id) => id.toString());
      setAvaxLamboIds(myAvaxIds);
      const attributes = await wenlamboGarageContract.getTokenAttributesMany(
        myIds
      );
      console.log(attributes);
      const lockedHville =
        await wenlamboGarageContract.getTotalLockedForAddress(account);
      console.log(lockedHville);
      const totalUnlocked = attributes.reduce(
        (acc, each) =>
          acc + parseFloat(ethers.utils.formatUnits(each["unlocked"], 18)),
        0
      );
      console.log(totalUnlocked);
      setLockedHville(ethers.utils.formatUnits(lockedHville[0], 18));
      setUnlockedHville(totalUnlocked);
    } catch (error) {
      console.log(error);
    }
  };

  const test = async () => {
    try {
      const rrr = await bridgeContract.historyLength();
      console.log("---- test ----\n", rrr, rrr.toString());
      const chain = await bridgeContract.chain();
      console.log("chain:", chain);

      console.log("account: ", account);
      const ids = await wenlamboContract.tokensOfOwner(account);
      console.log(
        "lambo - ids: ",
        ids.map((id) => id.toString())
      );
    } catch (error) {
      console.error(error);
    }
  };
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
      "https://api.avax-test.network/ext/bc/C/rpc"
    );
    const avaxContract = new ethers.Contract(
      avaxLamboAddress,
      wenlamboABI,
      avaxProvider
    );

    setBridgeContract(bridgeContract);
    setWenlamboContract(wenlamboContract);
    setWenlamboGarageContract(wenlamboGarageContract);
    setAvaxContract(avaxContract);

    getWenlamboAssets(wenlamboContract, wenlamboGarageContract, avaxContract);
  }, []);

  return (
    <div className="absolute left-[10%] top-[12%] w-[74vw] h-[68vh]">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="">
          <div className="bg-[#072637] bg-opacity-50 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px] p-4 flex items-center gap-2">
            <img src={iconBridge} alt="" />
            {/* <button
              className="text-white border border-white bg-cyan-600"
              onClick={() => test()}
            >
              CLICK
            </button> */}
            <div className="text-sm font-raleway font-semibold tracking-[1px] px-2">
              <div className="text-[#FFD900]">
                WenLamboNFTs and $HVILLE are migrating from Harmony to the
                Avalanche Network.
              </div>
              <div className="text-white mt-2">
                Please bridge your NFTs and $HVILLE from Harmony to Avalanche.
                You should be on the Harmony network to bridge your NFTs to
                Avalanche.
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center">
            <div
              className={`${
                asset === "all"
                  ? "bg-[rgba(255,217,0,0.22)] border-[3px] border-[#FFD900]"
                  : "bg-[rgba(255,255,255,0.22)]"
              } rounded-full flex items-center justify-center w-20 h-20 cursor-pointer`}
              style={{ flex: "0 0 80px" }}
              onClick={() => setAsset("all")}
            >
              <img
                src={logoLambo}
                alt="wenlambo"
                loading="lazy"
                className="w-14 h-14"
              />
            </div>
            <div
              className={`grow text-[11px] ${
                asset === "all" ? "text-[#FFD900]" : "text-white"
              } font-raleway font-semibold tracking-[1px] px-2`}
            >
              {asset === "all"
                ? "BRIDGING WENLAMBONFTS & LOCKED HVILLE"
                : "SELECT TO BRIDGE WENLAMBONFTS"}
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`${
                asset === "hville"
                  ? "bg-[rgba(255,217,0,0.22)] border-[3px] border-[#FFD900]"
                  : "bg-[rgba(255,255,255,0.22)]"
              } rounded-full flex items-center justify-center w-20 h-20 cursor-pointer`}
              style={{ flex: "0 0 80px" }}
              // onClick={() => setAsset("hville")}
              onClick={() => setAsset("")}
            >
              <img
                src={iconGville}
                alt="hville"
                loading="lazy"
                className="w-14 h-14"
              />
            </div>
            <div
              className={`grow text-[11px] ${
                asset === "hville" ? "text-[#FFD900]" : "text-white"
              } font-raleway font-semibold tracking-[1px] px-2`}
            >
              {asset === "hville"
                ? "BRIDGING UNLOCKED HVILLE"
                : "SELECT TO BRIDGE HVILLE"}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-14 grid grid-cols-2 gap-20 min-h-[45vh]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 z-10 text-center">
          {asset === "" ? (
            <div
              className="bg-[rgba(255,217,0,0.2)] border-4 border-white shadow-[0_0_4px_#FFD900] rounded-full font-raleway font-bold text-lg text-white text-opacity-50 tracking-[1px] leading-[138px]"
              style={{ textShadow: "0px 0px 4px #FFAE00" }}
            >
              BRIDGE ALL
            </div>
          ) : (
            <>
              {isBridging ? (
                <>
                  <img src={iconBridging} alt="bridging" className="relative" />
                  {/* <span class="animate-ping absolute top-0 left-0 h-20 w-20 rounded-full bg-sky-400 opacity-75 z-[-1]"></span> */}
                  {/* <div className="absolute animate-ping top-0 left-0 w-10 h-10 rounded-full bg-green-500 opacity-75 z-[-1]"></div> */}
                </>
              ) : (
                <div
                  className="bg-[#55C3FF] border-4 border-[#FFCE0D] shadow-[0_0_4px_#FFD900] rounded-full font-raleway font-bold text-xl text-[#1861A9] tracking-[1px] leading-[138px] cursor-pointer"
                  style={{
                    textShadow: "0px 0px 4px #FFAE00",
                    boxShadow: "inset 0px 0px 53px 4px #054F78",
                  }}
                  onClick={() => handleBridgeAll(asset)}
                >
                  BRIDGE ALL
                </div>
              )}
            </>
          )}
        </div>
        <div className="relative bg-[#072637] bg-opacity-70 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px] ">
          <img
            src={iconHarmony}
            alt="harmony"
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
          />
          {/* {asset === "" && (
            <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
              <div className="text-[#87C5E4]">
                THERE ARE NO ASSETS IN YOUR HARMONY WALLET
              </div>
              <div className="text-[#FFD900] mt-4">NO ACTION REQUIRED</div>
            </div>
          )} */}
          {asset === "all" && (
            <>
              {wenlamboIds.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
                    <div className="text-[#87C5E4]">
                      THERE ARE NO ASSETS IN YOUR HARMONY WALLET
                    </div>
                    <div className="text-[#FFD900] mt-4">
                      NO ACTION REQUIRED
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <img src={logoLambo} alt="lambo" className="w-11" />
                      <div className="font-raleway text-white">
                        <div className="text-xs tracking-widest">
                          WENLAMBONFT
                        </div>
                        <div className="text-[#FDBC00] text-lg font-bold">
                          {wenlamboIds.length}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={iconLockedHville} alt="hville" />
                      <div className="font-raleway text-white">
                        <div className="text-xs tracking-widest">
                          LOCKED HVILLE
                        </div>
                        <div className="text-[#0986C7] text-lg font-bold">
                          {(+lockedHville).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 mt-6">
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
            </>
          )}
          {asset === "hville" && (
            <div className="flex items-center justify-center">
              {isHvilleBridged ? (
                <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
                  <div className="text-[#87C5E4]">
                    THERE ARE NO ASSETS IN YOUR HARMONY WALLET
                  </div>
                  <div className="text-[#FFD900] mt-4">NO ACTION REQUIRED</div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <img src={iconGville} alt="hville" />
                  <div className="font-raleway text-white">
                    <div className="text-xs tracking-widest">
                      UNLOCKED HVILLE
                    </div>
                    <div className="text-lg font-bold">
                      {unlockedHville.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="relative bg-[#072637] bg-opacity-70 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px]">
          <img
            src={iconAvax}
            alt="avax"
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
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
              {asset === "all" && (
                <>
                  {avaxLamboIds.length > 0 ? (
                    <div className="p-10">
                      <div className="flex items-center gap-4">
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
                        <div className="flex items-center gap-2">
                          <img src={iconLockedHville} alt="hville" />
                          <div className="font-raleway text-white">
                            <div className="text-xs tracking-widest">
                              LOCKED HVILLE
                            </div>
                            <div className="text-[#0986C7] text-lg font-bold">
                              {(+avaxLockedHville).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 mt-6">
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
              {asset === "hville" && (
                <div className="flex items-center justify-center h-full">
                  {isHvilleBridged ? (
                    <div className="flex items-center gap-2">
                      <img src={iconGville} alt="hville" />
                      <div className="font-raleway text-white">
                        <div className="text-xs tracking-widest">
                          UNLOCKED HVILLE
                        </div>
                        <div className="text-lg font-bold">3,282</div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-raleway text-sm font-semibold tracking-[1px] text-center max-w-xs">
                      <div className="text-white">
                        THERE ARE NO ASSETS IN YOUR AVALANCHE WALLET
                      </div>
                      <div className="text-[#FF0000] mt-4">
                        MINT OR BRIDGE NOW TO SEE ASSETS
                      </div>
                    </div>
                  )}
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
