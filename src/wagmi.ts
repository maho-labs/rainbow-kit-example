import { getDefaultConfig, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { mahoWallet } from "./wallets";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "0391cfa157960618711b7022ce503434",
  chains: [base, arbitrum],
  wallets: [{ groupName: "Recommended", wallets: [mahoWallet] }],
});
