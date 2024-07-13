import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSendTransaction } from "wagmi";
import { encodeFunctionData, parseAbi, parseEther } from "viem";

function App() {
  const { address } = useAccount();

  const { data: hash, isPending, sendTransaction } = useSendTransaction();

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
              const abi = parseAbi([
                "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
              ]);

              const data = encodeFunctionData({
                abi: abi,
                functionName: "supply",
                args: [
                  "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
                  1000000n,
                  address,
                  0,
                ],
              });

              // console.log(data);

              const res = await sendTransaction({
                to: "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
                data: data,
              });

              console.log(res);

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
        </div>
      ) : (
        <ConnectButton label="Connect with Maho ✨" />
      )}
    </div>
  );
}

export default App;
