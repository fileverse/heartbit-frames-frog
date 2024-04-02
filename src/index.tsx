import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { FrameContext, Frog } from "frog";
import { devtools } from "frog/dev";
import { getFrame } from "./components";
import { FrameState, State } from "./utils";
import { neynar } from "frog/middlewares";

type EnvBinding = {
  NETWORK: string;
};
export const app = new Frog<{ State: State; Bindings: EnvBinding }>({
  // Supply a Hub to enable frame verification.
  initialState: {
    startTimeMillis: 0,
    frameState: FrameState.initial,
  },
});

const neynarMiddleware = neynar({
  apiKey: "NEYNAR_FROG_FM",
  features: ["interactor"],
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", neynarMiddleware, async (c) => {
  const { image, intents } = await getFrame(c as FrameContext);

  return c.res({
    image,
    intents,
    imageOptions: { width: 1910, height: 1000 },
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

devtools(app, { serveStatic });

serve({
  fetch: app.fetch,
  port,
});
