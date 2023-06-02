/// <reference types="react-scripts" />
declare module "*.png";
declare module "*.svg";
declare module "*.mp4";

interface WindowChain {
  ethereum?: {
    isMetaMask?: true;
    request?: (...args: any[]) => void;
  };
}
