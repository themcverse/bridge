import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import axios from "axios";

import "./Bridge.css";
import iconBridge from "../../assets/svg/grantsville/bridge-main-icon.svg";
import logoLambo from "../../assets/image/logo-wenlambo.png";
import iconHarmony from "../../assets/svg/icon-harmony.svg";
import iconAvax from "../../assets/svg/icon-avax.svg";
import iconBridging from "../../assets/svg/icon-bridging.svg";
import imgLamboIdBg from "../../assets/svg/grantsville/wenlambo-id-container.svg";
import imgBadge from "../../assets/image/wenlambonft-og-badge.jpg";

import {
  bridgeAddress,
  wenlamboAddress,
  multiCallAddress,
  avaxLamboAddress,
  avaxBridgeAddress,
  avaxMultiCallAddress,
  wenlamboBadgeAddress,
  avaxBadgeAddress,
} from "../../contracts/address";
import bridgeABI from "../../contracts/abis/Bridge.json";
import wenlamboABI from "../../contracts/abis/Wenlambo/Wenlambo.json";
import multiCallABI from "../../contracts/abis/MultiCall.json";
import badgeABI from "../../contracts/abis/Badge.json";

const Bridge = ({ account }) => {
  const [isBridging, setIsBridging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [bridgeContract, setBridgeContract] = useState(null);
  const [wenlamboContract, setWenlamboContract] = useState(null);
  const [multiCallContract, setMultiCallContract] = useState(null);
  const [wenlamboIds, setWenlamboIds] = useState([]);
  const [badgeContract, setBadgeContract] = useState(null);
  const [badgeIds, setBadgeIds] = useState([]);

  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxBridgeContract, setAvaxBridgeContract] = useState(null);
  const [avaxMultiCallContract, setAvaxMultiCallContract] = useState(null);
  const [avaxLamboIds, setAvaxLamboIds] = useState([]);
  const [avaxBadgeContract, setAvaxBadgeContract] = useState(null);
  const [avaxBadgeIds, setAvaxBadgeIds] = useState([]);

  const [idsForRetransfer, setIdsForRetransfer] = useState([]);

  const handleBridgeAll = async () => {
    try {
      if (isBridging) return;
      setIsBridging(true);
      const isApproved = await wenlamboContract.isApprovedForAll(
        account,
        bridgeAddress
      );
      // console.log(isApproved);
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
          ["avax", account],
        ]);
        const tx = await bridgeContract.queue(queue);
        // console.log(tx);
        await tx.wait();
        // console.log(result);
      } else {
        const queue = wenlamboIds.map((id) => [
          [wenlamboAddress, id],
          ["avax", account],
        ]);
        const tx = await bridgeContract.queue(queue);
        // console.log(tx);
        await tx.wait();
        // console.log(result);
      }
      // Badge bridge
      const isBadgeApproved = await badgeContract.isApprovedForAll(
        account,
        bridgeAddress
      );
      // console.log(isApproved);
      if (!isBadgeApproved) {
        const txApproval = await badgeContract.setApprovalForAll(
          bridgeAddress,
          true
        );
        await txApproval.wait();
      }
      const queue = badgeIds.map((id) => [
        [wenlamboBadgeAddress, id],
        ["avax", account],
      ]);
      const tx = await bridgeContract.queue(queue);
      // console.log(tx);
      await tx.wait();

      getWenlamboAssets(
        wenlamboContract,
        avaxContract,
        bridgeContract,
        avaxBridgeContract,
        multiCallContract,
        avaxMultiCallContract,
        badgeContract,
        avaxBadgeContract
      );
      setIsBridging(false);
    } catch (error) {
      setIsBridging(false);
      toast.error("Execution reverted");
    }
  };

  const getWenlamboAssets = async (
    wenlamboContract,
    avaxContract,
    bridgeContract,
    avaxBridgeContract,
    multiCallContract,
    avaxMultiCallContract,
    badgeContract,
    avaxBadgeContract
  ) => {
    try {
      setIsLoading(true);
      const ids = await wenlamboContract.tokensOfOwner(account);
      const myIds = ids.map((id) => id.toString());
      setWenlamboIds(myIds);
      const avaxIds = await avaxContract.tokensOfOwner(account);
      const myAvaxIds = avaxIds.map((id) => id.toString());
      setAvaxLamboIds(myAvaxIds);
      console.log("lambos\n", myIds);
      console.log("super cars\n", myAvaxIds);
      const numOfBadgeIds = await badgeContract.balanceOf(account);
      // const myBadgeIds = badgeIds.map((id) => id.toString());
      // setBadgeIds(badgeIds);
      const numOfAvaxBadgeIds = await avaxBadgeContract.balanceOf(account);
      // const myAvaxBadgeIds = avaxBadgeIds.map((id) => id.toString());
      setAvaxBadgeIds(numOfAvaxBadgeIds.toString());
      console.log(
        "badge counts:\n",
        numOfBadgeIds.toString(),
        numOfAvaxBadgeIds.toString()
      );
      // const id = await badgeContract.tokenOfOwnerByIndex(account, 0);
      // console.log("badge id:", id.toString());

      // Get Badge Ids
      const inputGetBadgeIds = [...Array(+numOfBadgeIds.toString())].map(
        (_, index) => ({
          target: badgeContract.address,
          callData: badgeContract.interface.encodeFunctionData(
            "tokenOfOwnerByIndex",
            [account, index]
          ),
        })
      );
      const txGetBadgeIds = await multiCallContract.aggregate(inputGetBadgeIds);
      const dataBadgeIds = txGetBadgeIds.returnData.map(
        (returnData, index) =>
          badgeContract.interface.decodeFunctionResult(
            "tokenOfOwnerByIndex",
            returnData
          )[0]
      );
      const badgeIds = dataBadgeIds.map((id) => id.toString());
      console.log("badgeids", badgeIds);
      setBadgeIds(badgeIds);

      // For History Refresh
      const historyLength = await bridgeContract.personalHistoryLength(account);
      // console.error(historyLength);
      const history = historyLength.toString();
      // console.log(history);

      const inputGetHistoryIds = [...Array(+history)].map((_, index) => ({
        target: bridgeContract.address,
        callData: bridgeContract.interface.encodeFunctionData(
          "personalHistory",
          [account, index]
        ),
      }));
      const txGetHistoryIds = await multiCallContract.aggregate(
        inputGetHistoryIds
      );
      const dataHistoryIds = txGetHistoryIds.returnData.map(
        (returnData, index) =>
          bridgeContract.interface.decodeFunctionResult(
            "personalHistory",
            returnData
          )[0]
      );
      // console.log(dataHistoryIds);

      const inputGetCompletions = dataHistoryIds.map((id) => ({
        target: avaxBridgeContract.address,
        callData: avaxBridgeContract.interface.encodeFunctionData(
          "externalCompletions",
          [id]
        ),
      }));
      const txGetCompletions = await avaxMultiCallContract.aggregate(
        inputGetCompletions
      );
      const dataCompletions = txGetCompletions.returnData.map(
        (returnData, index) =>
          avaxBridgeContract.interface.decodeFunctionResult(
            "externalCompletions",
            returnData
          )[0]
      );
      console.log(dataCompletions);
      const failedHistoryIds = dataCompletions
        .map((each, index) => (each === false ? dataHistoryIds[index] : null))
        .filter((each) => each !== null);

      if (failedHistoryIds.length > 0) {
        console.log("Failed lambo bridging ids:\n", failedHistoryIds);
        setIdsForRetransfer(failedHistoryIds);
      } else {
        console.log("Nothing to bridge again");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(
        "Something went wrong! Please refresh your browser and try again."
      );
      console.log(error);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing) {
      toast.info(
        "Your have already sent request. Please try again 1 min later!"
      );
      return;
    }
    let ids = [];
    if (idsForRetransfer.length === 0) {
      const historyLength = await bridgeContract.personalHistoryLength(account);
      const history = historyLength.toString();

      const inputGetHistoryIds = [...Array(+history)].map((_, index) => ({
        target: bridgeContract.address,
        callData: bridgeContract.interface.encodeFunctionData(
          "personalHistory",
          [account, index]
        ),
      }));
      const txGetHistoryIds = await multiCallContract.aggregate(
        inputGetHistoryIds
      );
      const dataHistoryIds = txGetHistoryIds.returnData.map(
        (returnData, index) =>
          bridgeContract.interface.decodeFunctionResult(
            "personalHistory",
            returnData
          )[0]
      );

      const inputGetCompletions = dataHistoryIds.map((id) => ({
        target: avaxBridgeContract.address,
        callData: avaxBridgeContract.interface.encodeFunctionData(
          "externalCompletions",
          [id]
        ),
      }));
      const txGetCompletions = await avaxMultiCallContract.aggregate(
        inputGetCompletions
      );
      const dataCompletions = txGetCompletions.returnData.map(
        (returnData, index) =>
          avaxBridgeContract.interface.decodeFunctionResult(
            "externalCompletions",
            returnData
          )[0]
      );
      console.log(dataCompletions);
      const failedHistoryIds = dataCompletions
        .map((each, index) => (each === false ? dataHistoryIds[index] : null))
        .filter((each) => each !== null);
      if (failedHistoryIds.length === 0) {
        toast.info("No Lambos to transfer again!");
        return;
      } else {
        ids = failedHistoryIds;
      }
    }

    setIsRefreshing(true);
    axios
      .all(
        ids.map((id) =>
          axios.post(`https://bridgeserver.mcverse.app/queueRequest`, {
            sourceChain: "harmony",
            id,
          })
        )
      )
      .then(
        setTimeout(() => {
          getWenlamboAssets(
            wenlamboContract,
            avaxContract,
            bridgeContract,
            avaxBridgeContract,
            multiCallContract,
            avaxMultiCallContract
          );
          toast.success("Request sent successfully!");
        }, 5000)
      );
    setTimeout(() => {
      setIsRefreshing(false);
    }, 60000);
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
    const wenlamboContract = new ethers.Contract(
      wenlamboAddress,
      wenlamboABI,
      signer
    );
    const multiCallContract = new ethers.Contract(
      multiCallAddress,
      multiCallABI,
      signer
    );
    const badgeContract = new ethers.Contract(
      wenlamboBadgeAddress,
      badgeABI,
      signer
    );

    const avaxProvider = new ethers.providers.JsonRpcProvider(
      "https://api.avax.network/ext/bc/C/rpc"
    );
    // Avax mainnet: "https://api.avax.network/ext/bc/C/rpc"
    // Avax testnet: "https://api.avax-test.network/ext/bc/C/rpc"
    const avaxContract = new ethers.Contract(
      avaxLamboAddress,
      wenlamboABI,
      avaxProvider
    );
    const avaxBridgeContract = new ethers.Contract(
      avaxBridgeAddress,
      bridgeABI,
      avaxProvider
    );
    const avaxMultiCallContract = new ethers.Contract(
      avaxMultiCallAddress,
      multiCallABI,
      avaxProvider
    );
    const avaxBadgeContract = new ethers.Contract(
      avaxBadgeAddress,
      badgeABI,
      avaxProvider
    );

    setBridgeContract(bridgeContract);
    setWenlamboContract(wenlamboContract);
    setAvaxContract(avaxContract);
    setAvaxBridgeContract(avaxBridgeContract);
    setMultiCallContract(multiCallContract);
    setAvaxMultiCallContract(avaxMultiCallContract);
    setBadgeContract(badgeContract);
    setAvaxBadgeContract(avaxBadgeContract);

    getWenlamboAssets(
      wenlamboContract,
      avaxContract,
      bridgeContract,
      avaxBridgeContract,
      multiCallContract,
      avaxMultiCallContract,
      badgeContract,
      avaxBadgeContract
    );
  }, []);

  return (
    <div className="p-4 pt-10 md:pt-0 mb-8 md:absolute md:left-[10%] md:top-[12%] md:w-[74vw] md:h-[68vh]">
      <div className="mx-auto ">
        <div className="bg-[#072637] bg-opacity-50 border border-[rgba(77,201,255,0.68)] shadow-[0_0_4px_#419BD5] rounded-[10px] p-4 flex flex-col sm:flex-row items-center gap-2">
          <img src={iconBridge} alt="" />

          <div className="text-sm font-raleway font-semibold tracking-[1px] px-2">
            <div className="text-[#FFD900]">
              Grantsville Super Cars are migrating from Harmony to the Avalanche
              Network.
            </div>
            <div className="mt-2 text-white">
              Please bridge your NFTs from Harmony to Avalanche. You should be
              on the Harmony network to bridge your NFTs to Avalanche.
            </div>
            <div className="mt-2 text-white">
              Please be patient with the bridge, there will be high volumes of
              traffic at times. Rest assured, your NFTs are in the queue and are
              safe. You may hit the REFRESH button below to see if your Super
              Cars have arrived in Avalanche.
            </div>
            <div className="mt-2 text-white">
              You may also check the status of your assets{" "}
              <a
                href="https://snowtrace.io/token/0xdAE165a6D46259E9b76882d19e9a2c90F99E2710#balances"
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
        <div className="absolute z-10 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-36 h-36">
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
            className="absolute left-0 -translate-x-1/2 -translate-y-1/2 top-1/2 sm:left-1/2 sm:top-0"
          />
          {+wenlamboIds.length + +badgeIds.length === 0 ? (
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
                  <div className="text-white font-raleway">
                    <div className="text-xs tracking-widest">WENLAMBONFT</div>
                    <div className="text-[#FDBC00] text-lg font-bold">
                      {wenlamboIds.length}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={imgBadge} alt="lambo" className="w-11" />
                  <div className="text-white font-raleway">
                    <div className="text-xs tracking-widest">BADGE</div>
                    <div className="text-[#FDBC00] text-lg font-bold">
                      {badgeIds.length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-6 max-h-[15vh] lg:max-h-[20vh] overflow-y-auto">
                {wenlamboIds.map((id) => (
                  <div className="relative" key={id}>
                    <img
                      src={`https://meta.wenlambo.one/images/${id}.png`}
                      alt="lambo"
                      loading="lazy"
                      className="border border-gray-500 rounded-tl-3xl rounded-br-3xl"
                    />
                    <img
                      src={imgLamboIdBg}
                      alt=""
                      loading="lazy"
                      className="absolute bottom-0 -translate-x-1/2 left-1/2"
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
            className="absolute left-0 -translate-x-1/2 -translate-y-1/2 top-1/2 sm:left-1/2 sm:top-0"
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
                      <div className="text-white font-raleway">
                        <div className="text-xs tracking-widest">
                          WENLAMBONFT
                        </div>
                        <div className="text-[#FDBC00] text-lg font-bold">
                          {avaxLamboIds.length}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={imgBadge} alt="lambo" className="w-11" />
                      <div className="text-white font-raleway">
                        <div className="text-xs tracking-widest">BADGE</div>
                        <div className="text-[#FDBC00] text-lg font-bold">
                          {avaxBadgeIds}
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
                        onClick={() => handleRefresh()}
                      >
                        refresh
                      </div>
                    )}
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
                            className="border border-gray-500 rounded-tl-3xl rounded-br-3xl"
                          />
                          <img
                            src={imgLamboIdBg}
                            alt=""
                            loading="lazy"
                            className="absolute bottom-0 -translate-x-1/2 left-1/2"
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
