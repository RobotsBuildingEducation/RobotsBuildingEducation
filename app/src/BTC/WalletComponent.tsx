// WalletComponent.js
import React, { useState } from "react";
import { useWallet } from "./CashuWalletContext";
import { useWalletOperations } from "./walletOperations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WalletComponent = () => {
  const { state } = useWallet();
  const { requestMint, mintTokens, payInvoice } = useWalletOperations();
  const [amount, setAmount] = useState(0);
  const [invoice, setInvoice] = useState("");

  const handleMintRequest = async () => {
    const mintQuote = await requestMint(amount);
    if (mintQuote) {
      // Assume the invoice is paid and call mintTokens
      const mintResponse = await mintTokens(amount, mintQuote);
      if (mintResponse) {
        toast.success("Tokens minted successfully");
      }
    }
  };

  const handlePayInvoice = async () => {
    try {
      // Assuming you have the necessary proofs and melt quote (simplified for this example)
      const proofs = []; // Replace with actual proofs
      const meltQuote = {}; // Replace with actual melt quote
      const paymentResponse = await payInvoice(invoice, proofs, meltQuote);
      if (paymentResponse) {
        toast.success("Invoice paid successfully");
      }
    } catch (error) {
      toast.error("Failed to pay invoice");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Identity Wallet</h1>
      <p>Wallet: {state.wallet ? "Initialized" : "Not Initialized"}</p>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount to Mint
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <button onClick={handleMintRequest} className="btn btn-primary mb-3">
        Request Mint
      </button>
      <div className="mb-3">
        <label htmlFor="invoice" className="form-label">
          Invoice to Pay
        </label>
        <input
          type="text"
          className="form-control"
          id="invoice"
          value={invoice}
          onChange={(e) => setInvoice(e.target.value)}
        />
      </div>
      <button onClick={handlePayInvoice} className="btn btn-primary">
        Pay Invoice
      </button>
      <ToastContainer />
    </div>
  );
};

export default WalletComponent;
