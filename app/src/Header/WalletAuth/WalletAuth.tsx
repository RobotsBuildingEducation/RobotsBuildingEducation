import { Button } from "@getalby/bitcoin-connect-react";

/**
 * WalletAuth Component
 * This component renders a Bitcoin wallet authentication button using the @getalby/bitcoin-connect-react library.
 * Upon successful connection, it sets a local storage item 'patreonPasscode' to 'bitcoin'.
 *
 * @param {Object} props The props object.
 * @returns {ReactElement} The WalletAuth component.
 */

export const WalletAuth = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          appName="Robots Building Education"
          onConnect={() => {
            localStorage.setItem(
              "patreonPasscode",
              import.meta.env.VITE_BITCOIN_PASSCODE
            );
          }}
          onDisconnect={() => {
            localStorage.setItem(
              "patreonPasscode",
              import.meta.env.VITE_PATREON_PASSCODE
            );
          }}
        />
      </div>
    </div>
  );
};
