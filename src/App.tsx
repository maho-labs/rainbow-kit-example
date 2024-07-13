import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useChainId,
  useSignMessage,
  useWalletClient,
  useWriteContract,
  useSendTransaction,
} from "wagmi";
import { abi } from "./abi";
import { encodeFunctionData } from "viem";
import { config } from "./wagmi";

function App() {
  const { address } = useAccount();

  const { status, sendTransaction } = useSendTransaction({ config });

  const { writeContract } = useWriteContract();

  const { data, signMessage } = useSignMessage();

  const wallet = useWalletClient({
    account: address,
  });

  console.log(data);

  const id = useChainId();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {address ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <ConnectButton label="Connect with Maho ✨" />
          </div>

          {status === "pending" ? (
            <p>Please confirm the transaction request in your wallet...</p>
          ) : (
            <button
              style={{
                padding: 10,
                borderRadius: 10,
                border: "none",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px 0px",
                backgroundColor: "#fff",
                fontWeight: "bold",
                fontFamily: "inherit",
                fontSize: 16,
              }}
              onClick={async () => {
                console.log(
                  sendTransaction({
                    to: "0x180da54e177C517518cf53D47597171792CC1F14",
                    data: "0x",
                    value: 0n,
                    // encodeFunctionData({
                    //   abi: abi,
                    //   functionName: "transfer",
                    //   args: [
                    //     "0x180da54e177C517518cf53D47597171792CC1F14",
                    //     1000000n,
                    //   ],
                    // }),
                  })
                );

                // const encoded = encodeFunctionData({
                //   abi: abi,
                //   functionName: "transfer",
                //   args: ["0x180da54e177C517518cf53D47597171792CC1F14", 1000000n],
                // });
                // console.log(encoded);
                // wallet.data &&
                //   (await wallet.data.sendTransaction({
                //     to: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
                //     data: encoded,
                //   }));
              }}
            >
              Send 1 USDC 💸
            </button>
          )}
        </div>
      ) : (
        <ConnectButton label="Connect with Maho ✨" />
      )}
    </div>
  );
}

export default App;
