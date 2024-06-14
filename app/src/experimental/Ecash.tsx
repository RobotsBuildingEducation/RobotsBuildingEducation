// // src/App.js
// import React, { useState, useEffect } from "react";
// import {
//   configureStore,
//   createAsyncThunk,
//   createSlice,
//   PayloadAction,
// } from "@reduxjs/toolkit";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import {
//   CashuMint,
//   CashuWallet,
//   MintKeys,
//   Proof,
//   SendResponse,
//   MeltQuoteResponse,
//   MeltTokensResponse,
// } from "@cashu/cashu-ts";

// // Types
// interface Wallet {
//   id: string;
//   keys: MintKeys;
//   proofs: Proof[];
//   url: string;
//   active: boolean;
// }

// interface WalletState {
//   balance: { [unit: string]: number };
//   balanceLocked: boolean;
//   keysets: { [key: string]: Wallet };
// }

// const updateKeysetLocalStorage = (keysets: { [key: string]: Wallet }) => {
//   localStorage.setItem("keysets", JSON.stringify(Object.values(keysets)));
// };

// // Initial State
// const initialState: WalletState = {
//   balance: {},
//   balanceLocked: false,
//   keysets: {},
// };

// // Redux Slice
// const walletSlice = createSlice({
//   name: "walletSlice",
//   initialState,
//   reducers: {
//     updateKeysetActiveStatus: (
//       state,
//       action: PayloadAction<{ id: string; active: boolean }>
//     ) => {
//       const { id, active } = action.payload;
//       const keyset = state.keysets[id];
//       if (keyset) {
//         keyset.active = active;
//       }
//     },
//     setBalance: (state, action: PayloadAction<{ [unit: string]: number }>) => {
//       if (state.balanceLocked) {
//         return;
//       }
//       state.balance = action.payload;
//     },
//     lockBalance: (state) => {
//       state.balanceLocked = true;
//     },
//     unlockBalance: (state) => {
//       state.balanceLocked = false;
//     },
//     addKeyset: (
//       state,
//       action: PayloadAction<{ keyset: MintKeys; url: string; active?: boolean }>
//     ) => {
//       const { keyset, url } = action.payload;
//       const toAdd: Wallet = {
//         id: keyset.id,
//         keys: keyset,
//         proofs: [],
//         url,
//         active: action.payload.active || false,
//       };
//       const newKeysetState = { ...state.keysets, [keyset.id]: toAdd };
//       state.keysets = newKeysetState;
//       updateKeysetLocalStorage(newKeysetState);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(initializeKeysets.fulfilled, (state, action) => {
//         state.keysets = action.payload.keysets.reduce((acc, keyset) => {
//           acc[keyset.id] = keyset;
//           return acc;
//         }, {} as { [key: string]: Wallet });
//         state.balance = action.payload.balance;
//       })
//       .addCase(setMainKeyset.fulfilled, (state, action) => {
//         if (!action.payload) return;
//         const { keysetId, active = true } = action.payload;
//         const keyset = state.keysets[keysetId];
//         if (keyset) {
//           keyset.active = active;
//           Object.values(state.keysets).forEach((k) => {
//             if (k.id !== keysetId) {
//               k.active = false;
//             }
//           });
//           updateKeysetLocalStorage(state.keysets);
//         }
//       });
//   },
// });

// export const {
//   setBalance,
//   lockBalance,
//   unlockBalance,
//   addKeyset,
//   updateKeysetActiveStatus,
// } = walletSlice.actions;
// export default walletSlice.reducer;

// // Async Thunks
// const initializeKeysets = createAsyncThunk(
//   "wallet/initializeKeysets",
//   async (_, { rejectWithValue }) => {
//     const keysets = JSON.parse(
//       localStorage.getItem("keysets") || "[]"
//     ) as Wallet[];
//     const proofs = JSON.parse(
//       localStorage.getItem("proofs") || "[]"
//     ) as Proof[];
//     const balance = proofs.reduce(
//       (acc, proof) => {
//         acc.usd += proof.amount;
//         return acc;
//       },
//       { usd: 0 }
//     );
//     return { keysets, balance };
//   }
// );

// const setMainKeyset = createAsyncThunk(
//   "wallet/setMainKeyset",
//   async (keysetId: string, { getState, dispatch }) => {
//     const state = getState() as RootState;

//     const toSetMain = state.wallet.keysets[keysetId];

//     if (!toSetMain) {
//       throw new Error("Keyset not found");
//     }

//     if (toSetMain.active) {
//       console.log("This keyset is already active.");
//       return;
//     }

//     try {
//       const pubkey = localStorage.getItem("pubkey");
//       console.log("Posting to /api/users/", pubkey);
//       await fetch(`/api/users/${pubkey}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ mintUrl: toSetMain.url, pubkey }),
//       });
//     } catch (e) {
//       throw new Error(`Failed to update user: ${e}`);
//     }

//     return { keysetId, active: true };
//   }
// );

// // Store
// const store = configureStore({
//   reducer: {
//     wallet: walletSlice.reducer,
//   },
// });

// // Custom Hook: useCashu
// const useCashu = () => {
//   const dispatch = useDispatch();
//   const wallet = useSelector((state) => state.wallet);
//   const wallets = useSelector((state) => state.wallet.keysets);

//   const getProofs = (keysetId) => {
//     const allProofs = JSON.parse(window.localStorage.getItem("proofs") || "[]");
//     if (!keysetId) return allProofs;
//     return allProofs.filter((proof) => proof.id === keysetId);
//   };

//   useEffect(() => {
//     dispatch(initializeKeysets());
//   }, [dispatch]);

//   useEffect(() => {
//     const localProofs = getProofs();
//     const balanceState = wallet.balance["usd"];
//     const newBalance = localProofs.reduce((a, b) => a + b.amount, 0);
//     if (balanceState !== newBalance) {
//       dispatch(setBalance({ usd: newBalance }));
//     }
//   }, [wallet.balance, dispatch]);

//   const requestMintInvoice = async ({ unit, amount }, keyset) => {
//     const wallet = new CashuWallet(new CashuMint(keyset.url), { ...keyset });
//     const { quote, request } = await wallet.getMintQuote(amount);
//     return { quote, request };
//   };

//   const handlePayInvoice = async (invoice, amount) => {
//     const activeWallet = Object.values(wallets).find((w) => w.active);
//     if (!activeWallet) throw new Error("No active wallet found");

//     const wallet = new CashuWallet(new CashuMint(activeWallet.url), {
//       keys: activeWallet.keys,
//     });
//     dispatch(lockBalance());
//     dispatch(setSending("Sending..."));

//     try {
//       const proofs = getProofs(activeWallet.id);
//       const sendResponse = await wallet.send(amount, proofs);
//       if (sendResponse && sendResponse.send) {
//         const invoiceResponse = await wallet.payLnInvoice(
//           invoice,
//           sendResponse.send
//         );
//         if (!invoiceResponse || !invoiceResponse.isPaid) {
//           dispatch(setError("Payment failed"));
//         } else {
//           dispatch(setSuccess(`Sent $${amount}!`));
//         }
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       dispatch(unlockBalance());
//     }
//   };

//   return {
//     handlePayInvoice,
//     requestMintInvoice,
//   };
// };

// // Components
// const Send = () => {
//   const { handlePayInvoice } = useCashu();
//   const [invoice, setInvoice] = useState("");
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSend = async () => {
//     try {
//       await handlePayInvoice(invoice, parseInt(amount));
//       setMessage(`Successfully sent ${amount} tokens!`);
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Send Tokens</h2>
//       <input
//         type="text"
//         placeholder="Invoice"
//         value={invoice}
//         onChange={(e) => setInvoice(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={handleSend}>Send</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// const Receive = () => {
//   const { requestMintInvoice } = useCashu();
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [mintRequest, setMintRequest] = useState(null);

//   const handleReceive = async () => {
//     try {
//       const response = await requestMintInvoice(
//         { unit: "usd", amount: parseInt(amount) },
//         wallet
//       );
//       setMintRequest(response.request);
//       setMessage(`Mint request: ${response.request}`);
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h2>Receive Tokens</h2>
//       <input
//         type="text"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <button onClick={handleReceive}>Receive</button>
//       {message && <p>{message}</p>}
//       {mintRequest && <p>Mint Request: {mintRequest}</p>}
//     </div>
//   );
// };

// // Main Component
// export const Ecash = () => {
//   return (
//     <Provider store={store}>
//       <div className="App">
//         <header className="App-header">
//           <h1>Cashu Wallet</h1>
//         </header>
//         <main>
//           <Send />
//           <Receive />
//         </main>
//       </div>
//     </Provider>
//   );
// };
