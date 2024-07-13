import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
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
      <ConnectButton label="Connect with Maho ✨" />
    </div>
  );
}

export default App;
