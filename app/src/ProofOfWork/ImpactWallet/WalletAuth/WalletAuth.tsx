import { Badge } from "react-bootstrap";
import { Button } from "@getalby/bitcoin-connect-react";

/**
 * WalletAuth Component
 * This component renders a Bitcoin wallet authentication button using the @getalby/bitcoin-connect-react library.
 * Upon successful connection, it sets a local storage item 'patreonPasscode' to 'bitcoin'
 * and executes the handleZeroKnowledgePassword callback with true to indicate a successful connection.
 *
 * Props:
 * - handleZeroKnowledgePassword: A callback function to handle the post-authentication logic.
 *
 * @param {Object} props The props object.
 * @param {Function} props.handleZeroKnowledgePassword The callback function after authentication.
 * @returns {ReactElement} The WalletAuth component.
 */
export const WalletAuth = ({ handleZeroKnowledgePassword }) => {
  return (
    <div>
      <div style={{ zIndex: 10000000 }}>
        <Button
          appName="Robots Building Education"
          onConnect={() => {
            localStorage.setItem("patreonPasscode", "bitcoin");

            handleZeroKnowledgePassword(null, null, true);
          }}
        />
        <Badge bg="light" style={{ color: "black" }}>
          🧪 experimental feature
        </Badge>
      </div>
    </div>
  );
};