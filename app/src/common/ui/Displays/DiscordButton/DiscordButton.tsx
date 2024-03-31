import { logEvent } from "firebase/analytics";
import { analytics } from "../../../../database/firebaseResources";

/**
 * Renders a Discord connection button and a Patreon link.
 *
 * This component displays a Discord widget and a Patreon promotional link. Clicking the link logs an event to Firebase Analytics and redirects the user to a specified Patreon page. The component uses inline styling for layout and appearance.
 *
 * The Discord widget allows users to interact with Discord within the component. The Patreon link, styled as a button, uses Firebase Analytics to track clicks, identifying the promotion's effectiveness.
 *
 * No props are required.
 *
 * Example usage:
 * `<DiscordButton />`
 */
export const DiscordButton = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
      minWidth: 375,
      maxWidth: "100%",
    }}
  >
    <h1 style={{ fontFamily: "Bungee" }}>Connect</h1>
    <iframe
      src="https://discord.com/widget?id=115318178929704963&theme=dark"
      width="375"
      height="300"
      allowTransparency={true}
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
    <br />
    <a
      onClick={() =>
        logEvent(analytics, "select_promotion", {
          creative_name: `https://www.patreon.com/RobotsBuildingEducation`,
          creative_slot: `About Slot`,
          promotion_id: `Robots Building Education`,
          promotion_name: "advertising_launch",
        })
      }
      href="https://www.patreon.com/RobotsBuildingEducation/about"
      target={"_blank"}
      style={{
        color: "white",
        boxShadow: "0px 0px 11px 0px rgba(255,38,74,0.75)",
        borderRadius: 12,

        maxWidth: 600,
        width: "100%",
        marginBottom: 125,
      }}
    >
      <img
        src="https://res.cloudinary.com/dtkeyccga/image/upload/v1704759921/Patreon_tiers_9_odravd.png"
        style={{ borderRadius: 12, width: "100%" }}
      />
      &nbsp;&nbsp;<div style={{ padding: 5 }}>Get subscriber passcode</div>
    </a>

    <br />
  </div>
);
