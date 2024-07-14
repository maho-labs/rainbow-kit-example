import { Wallet, getWalletConnectConnector } from "@rainbow-me/rainbowkit";
import { customAlphabet } from "nanoid";
import { postEvent } from "@telegram-apps/sdk";

export interface MyWalletOptions {
  projectId: string;
}

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const mahoWallet = ({ projectId }: MyWalletOptions): Wallet => ({
  id: "maho",
  name: "Maho Wallet",
  iconUrl: "https://dev.maho.gg/logos/simple.svg",
  iconBackground: "#0c2f78",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=my.wallet",
    ios: "https://apps.apple.com/us/app/my-wallet",
    chrome: "https://chrome.google.com/webstore/detail/my-wallet",
    qrCode: "https://my-wallet/qr",
  },
  mobile: {
    getUri: (uri: string) => {
      const nanoid = customAlphabet(alphabet, 21);
      const id = nanoid();

      fetch(
        `https://api.maho.gg/post?id=${id}&uri=${encodeURIComponent(uri)}`
      ).then((res) => console.log(res));

      postEvent("web_app_open_tg_link", {
        path_full: `/dev_maho_gg_bot/wallet?startapp=${id}`,
      });

      return `tg://resolve?domain=dev_maho_gg_bot&appname=wallet&startapp=${id}`;
    },
  },
  desktop: {
    getUri: (uri: string) => {
      const nanoid = customAlphabet(alphabet, 21);
      const id = nanoid();

      fetch(
        `https://api.maho.gg/post?id=${id}&uri=${encodeURIComponent(uri)}`
      ).then((res) => console.log(res));

      postEvent("web_app_open_tg_link", {
        path_full: `/dev_maho_gg_bot/wallet?startapp=${id}`,
      });

      return `tg://resolve?domain=dev_maho_gg_bot&appname=wallet&startapp=${id}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: "https://my-wallet/learn-more",
      steps: [
        {
          description:
            "We recommend putting My Wallet on your home screen for faster access to your wallet.",
          step: "install",
          title: "Open the My Wallet app",
        },
        {
          description:
            "After you scan, a connection prompt will appear for you to connect your wallet.",
          step: "scan",
          title: "Tap the scan button",
        },
      ],
    },
  },
  extension: {
    instructions: {
      learnMoreUrl: "https://my-wallet/learn-more",
      steps: [
        {
          description:
            "We recommend pinning My Wallet to your taskbar for quicker access to your wallet.",
          step: "install",
          title: "Install the My Wallet extension",
        },
        {
          description:
            "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          step: "create",
          title: "Create or Import a Wallet",
        },
        {
          description:
            "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          step: "refresh",
          title: "Refresh your browser",
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({ projectId }),
});
