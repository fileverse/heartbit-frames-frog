import { convertToSecondsOrMinutes } from "../utils";

const FullFrame = {
  width: "100%",
  height: "100%",
};

const FlexCss = {
  display: "flex",
};

const FlexColumnCss = {
  ...FullFrame,
  display: "flex",
  flexDirection: "column",
};

const FlexCenterCss = {
  alignItems: "center",
  justifyContent: "center",
};

interface FrameWrapperProps {
  children: string | JSX.Element;
  customStyle?: Hono.CSSProperties;
}
export const FrameWrapper = (props: FrameWrapperProps) => {
  const customStyle = props.customStyle || {};
  return (
    <div
      style={{
        background: "#fff",
        ...FlexColumnCss,
        ...FlexCenterCss,
        ...customStyle,
      }}
    >
      {props.children}
    </div>
  );
};

export const TextFrame = (props: { text: string }) => {
  return (
    <FrameWrapper>
      <div
        style={{
          fontSize: 60,
          color: "#000",
        }}
      >
        {props.text}
      </div>
    </FrameWrapper>
  );
};

export const ResultFrameImage = (props: { timeSpent: number }) => {
  const { timeSpent } = props;
  return (
    <FrameWrapper>
      <div
        style={{
          ...FlexColumnCss,
          ...FlexCenterCss,
          fontSize: 60,
          color: "#000",
          gap: 20,
        }}
      >
        <div
          style={{
            ...FlexCss,
          }}
        >
          Total Time Spent: {convertToSecondsOrMinutes(timeSpent)}
        </div>
        <div
          style={{
            ...FlexCss,
          }}
        >
          HeartBit Minted: {timeSpent * 10}
        </div>
      </div>
    </FrameWrapper>
  );
};
