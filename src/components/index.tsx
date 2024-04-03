import { Button, FrameContext } from "frog";

import { TextFrame, ResultFrameImage } from "./FrameComponents";
import {
  State,
  BTN_MINT,
  BTN_START,
  BTN_RELOAD,
  FrameState,
  updateState,
  convertToSecondsOrMinutes,
} from "../utils";
import { HeartBitCore, SupportedChain } from "@fileverse/heartbit-core";

export const getFrame = async (context: FrameContext) => {
  const { deriveState, buttonValue } = context;
  const state = deriveState((prevState) =>
    updateState(prevState as State, buttonValue)
  ) as State;

  if (state.frameState === FrameState.initial) return getInitialFrame();

  const { verifiedAddresses } = (context.var.interactor || {}) as any;
  const ethAddress = verifiedAddresses?.ethAddresses?.[0];

  if (!ethAddress)
    return {
      image: <TextFrame text="Please verify your address" />,
      intents: [],
    };

  if (state.frameState === FrameState.inprogress)
    return getProgressFrame(state);

  if (state.frameState === FrameState.completed) {
    const { endTimeMillis, startTimeMillis } = state;

    const coreSdk = new HeartBitCore({
      chain: process.env.NETWORK as SupportedChain,
    });
    await coreSdk.unSignedMintHeartBit({
      account: ethAddress,
      startTime: Math.floor(startTimeMillis / 1000),
      endTime: Math.floor(endTimeMillis / 1000),
      hash: "ipfs://QmZ",
      apiKey: process.env.API_KEY as string,
    });

    return getResultFrame(state);
  }

  return {
    image: <TextFrame text="Invalid Frame" />,
    intents: [],
  };
};

const getInitialFrame = () => {
  return {
    image: <TextFrame text="Press start to begin!" />,
    intents: [<Button value={BTN_START}>{BTN_START}</Button>],
  };
};

const getProgressFrame = (state: State) => {
  const { startTimeMillis } = state;
  const currentTimeMillis = Date.now();
  const elapsedTime = Math.floor((currentTimeMillis - startTimeMillis) / 1000);
  const timeSpent = convertToSecondsOrMinutes(elapsedTime);
  return {
    image: <TextFrame text={`You have spent ${timeSpent} on this frame`} />,
    intents: [
      <Button value={BTN_RELOAD}>{BTN_RELOAD}</Button>,
      <Button value={BTN_MINT}>{BTN_MINT}</Button>,
    ],
  };
};

const getResultFrame = (state: State) => {
  const { startTimeMillis, endTimeMillis } = state;
  const elapsedTime = Math.floor((endTimeMillis - startTimeMillis) / 1000);
  return {
    image: <ResultFrameImage timeSpent={elapsedTime} />,
    intents: [
      <Button.Link href="https://warpcast.com/fileverse">
        Follow Fileverse
      </Button.Link>,
    ],
  };
};
