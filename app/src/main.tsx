import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// import DecisionMap from "./experimental/DecisionMap";
import { Dashboard } from "./Dashboard/Dashboard";
//...
import * as Sentry from "@sentry/react";
import { Ecash } from "./experimental/Ecash";

// import { WalletProvider } from "./BTC/CashuWalletContext";
// import WalletComponent from "./BTC/WalletComponent";

Sentry.init({
  dsn: "https://cb2225402203f85d1a82ffeeacd4aa4b@o4507320721080320.ingest.us.sentry.io/4507320724029440",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/robotsbuildingeducation\.com/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

// This file handles things before the app launches with route "/".
// It defines frontend routes and defines a legacy passcode that used to be used to enter the app.

//to visit the experimental component, visit https://robotsbuildingeducation.com/experimental/map

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sudo",
    element: <Dashboard />,
  },
  // {
  //   path: "/wallet",
  //   element: <Ecash />,
  // },
]);

localStorage.setItem("patreonPasscode", import.meta.env.VITE_PATREON_PASSCODE);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <WalletProvider>

  <RouterProvider router={router} />

  // </WalletProvider>
);
