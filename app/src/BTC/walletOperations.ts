// walletOperations.js
import { useWallet } from "./CashuWalletContext";
import { toast } from "react-toastify";

export const useWalletOperations = () => {
  const { state, dispatch } = useWallet();

  const requestMint = async (amount) => {
    try {
      const mintQuoteResponse = await state.wallet.getMintQuote(amount);
      const mintQuote = mintQuoteResponse.quote; // Extract the quote string
      toast.success("Mint quote requested successfully");
      return mintQuote;
    } catch (error) {
      toast.error("Failed to request mint quote");
      console.error(error);
    }
  };

  const mintTokens = async (amount, quote) => {
    try {
      const mintResponse = await state.wallet.mintTokens(amount, quote);
      toast.success("Tokens minted successfully");
      return mintResponse;
    } catch (error) {
      toast.error("Failed to mint tokens");
      console.error(error);
    }
  };

  const payInvoice = async (invoice, proofs, meltQuote) => {
    try {
      const paymentResponse = await state.wallet.payLnInvoice(
        invoice,
        proofs,
        meltQuote
      );
      toast.success("Invoice paid successfully");
      return paymentResponse;
    } catch (error) {
      toast.error("Failed to pay invoice");
      console.error(error);
    }
  };

  return {
    requestMint,
    mintTokens,
    payInvoice,
  };
};
