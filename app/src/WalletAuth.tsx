import React from "react";
import { Badge, Button as DisableButton } from "react-bootstrap";
import { LightningAddress } from "@getalby/lightning-tools";
import { Button, Modal, launchModal } from "@getalby/bitcoin-connect-react";
import toast, { Toaster } from "react-hot-toast";

export const WalletAuth = ({ handleZeroKnowledgePassword }) => {
  // console.log("doc", document.getElementsByClassName("mt-12"));
  // const [invoice, setInvoice] = React.useState<string | undefined>(undefined);
  // const [preimage, setPreimage] = React.useState<string | undefined>(undefined);

  // React.useEffect(() => {
  //   (async () => {
  //     console.log("hello");
  //     try {
  //       const ln = new LightningAddress("levitatingnight182471@getalby.com");
  //       await ln.fetch();
  //       setInvoice(
  //         (
  //           await ln.requestInvoice({
  //             satoshi: 1,
  //             comment: "To Robots Building Education",
  //           })
  //         ).paymentRequest
  //       );
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

  // async function payInvoice() {
  //   try {
  //     if (!window.webln || !window.webln) {
  //       throw new Error("Please connect your wallet");
  //     }
  //     if (!invoice) {
  //       throw new Error("No invoice available");
  //     }
  //     const result = await window.webln.sendPayment(invoice);

  //     setPreimage(result?.preimage);
  //     if (!result?.preimage) {
  //       throw new Error("Payment failed. Please try again");
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  // console.log("window webln", window?.webln);

  return (
    <div>
      {/* <div >
        <Toaster />
      </div> */}
      {/* 
      <DisableButton variant="primary" disabled={true}>
        Connect Wallet (disabled)
      </DisableButton> */}
      <div
        style={{ zIndex: 10000000 }}
        id="robe-button"
        onClick={() => {
          console.log(document.getElementById("robe-button"));
        }}
      >
        <Button
          onModalOpened={() => {
            console.log("opening modal");

            console.log(
              "elements",
              document.getElementsByClassName("shadow-2xl")
            );
          }}
          // disabled={true}
          appName="Robots Building Education"
          onConnect={() => {
            localStorage.setItem("patreonPasscode", "bitcoin");
            toast("Connected!");

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
