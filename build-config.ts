import type { ReactComponentBuildConfig, WebComponentBuildConfig } from "../../tasks/build/builder/src/types.ts";

export const webComponentList: WebComponentBuildConfig[] = [
  {
    name: "jb-message",
    path: "./lib/JBMessage.ts",
    outputPath: "./dist/JBMessage.js",
    umdName: "JBMessage",
  },
];
export const reactComponentList: ReactComponentBuildConfig[] = [];