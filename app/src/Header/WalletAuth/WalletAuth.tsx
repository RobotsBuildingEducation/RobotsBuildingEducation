import { useEffect, useState } from "react";
import { Button } from "@getalby/bitcoin-connect-react";
import Form from "react-bootstrap/Form";

/**
 * WalletAuth Component
 * This component renders a Bitcoin wallet authentication button using the @getalby/bitcoin-connect-react library.
 * Upon successful connection, it sets a local storage item 'patreonPasscode' to 'bitcoin'.
 *
 * @param {Object} props The props object.
 * @returns {ReactElement} The WalletAuth component.
 */

export const WalletAuth = () => {
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("patreonPasscode") ===
      import.meta.env.VITE_BITCOIN_PASSCODE
    ) {
      setShowAuth(true);
    }
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {showAuth ? (
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
      ) : (
        <Form>
          <Form.Check
            style={{ textAlign: "left" }}
            type="switch"
            // id="custom-switch"
            label="Bitcoin mode"
            checked={showAuth}
            onChange={() => setShowAuth(!showAuth)}
          />
          {/* <Form.Check
              disabled={true}
              type="switch"
              // id="custom-switch"
              label="Spanish mode (disabled)"
              checked={showAuth}
              onChange={() => setShowAuth(!showAuth)}
            /> */}
        </Form>
      )}
    </div>
  );
};
