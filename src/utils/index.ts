export enum FrameState {
  initial = "initial",
  inprogress = "inprogress",
  completed = "completed",
}

export type State = {
  startTimeMillis: number;
  endTimeMillis: number;
  frameState: FrameState;
};

const BTN_VALUE_MAP = {
  BTN_START: "Start",
  BTN_RELOAD: "Reload",
  BTN_MINT: "Mint HeartBit",
};

export const { BTN_START, BTN_RELOAD, BTN_MINT } = BTN_VALUE_MAP;

export const convertToSecondsOrMinutes = (time: number) => {
  if (time < 60) return `${time} seconds`;
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return minutes === 1
    ? `${minutes} min ${seconds} s`
    : `${minutes} mins ${seconds} s`;
};

export const updateState = (state: State, buttonValue: string | undefined) => {
  if (buttonValue === BTN_START) {
    state.startTimeMillis = Date.now();
    state.frameState = FrameState.inprogress;
  }
  if (buttonValue === BTN_MINT) {
    state.frameState = FrameState.completed;
    state.endTimeMillis = Date.now();
  }
};
