import { useEffect, useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../database/firebaseResources";
import { DiscordButton } from "./DiscordButton/DiscordButton";
import { FadeInComponent, RiseUpAnimation } from "../../styles/lazyStyles";
import FAQSection from "./FAQs/FAQs";
import { WalletAuth } from "../WalletAuth/WalletAuth";
import { Title } from "../../common/svgs/Title";

/**
 * `LearnMore` component that provides additional information and resources to the user.
 *
 * This component displays a section with a stylized "rox.ai" title and two buttons. The first button links to a news page, while the second opens a modal with FAQs and a Discord connection button. It uses animations for visual enhancement and tracks the modal's open state to manage its visibility.
 *
 * Props:
 * @param {Object} languageMode - Contains localized strings for button labels and other UI elements, allowing for dynamic language switching.
 *
 * State:
 * @state {boolean} isModalOpen - Tracks whether the FAQ and Discord modal is open.
 *
 * Behavior:
 * - On clicking the news button, logs an event to Firebase Analytics and navigates the user to an external news page.
 * - On clicking the about button, toggles the modal's visibility, showing or hiding additional resources including FAQs and a Discord invite.
 * - Utilizes `FadeInComponent` and `RiseUpAnimation` for entrance animations, enhancing user experience with visual effects.
 * - The modal provides a centralized way to access FAQs and connect with the Discord community, promoting engagement.
 */
export const LearnMore = ({ languageMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    // Show the first component immediately or after a certain condition is met
    setShowFirst(true);

    // Delay showing the second component
    const timer1 = setTimeout(() => setShowSecond(true), 25); // 300ms delay

    // Delay showing the third component
    const timer2 = setTimeout(() => setShowThird(true), 50); // Additional 300ms delay

    // Clear timeouts if the component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {showFirst && (
          <RiseUpAnimation speed={0.3}>
            <Button
              variant="dark"
              style={{
                color: "white",
                textShadow: "0px 0px 4px black",
                margin: 6,
                width: 180,
                display: "flex",
              }}
              onClick={() => {
                logEvent(analytics, "select_content", {
                  content_type: "button",
                  item_id: "About",
                });
                setIsModalOpen(true);
              }}
            >
              <div style={{ height: 24, width: 24 }}>&nbsp;</div>
              <div>&nbsp; {languageMode.buttons["9"]}</div>
            </Button>
          </RiseUpAnimation>
        )}
        {/* {showSecond && (
          <RiseUpAnimation speed={0.3}>
            <a
              style={{ color: "white" }}
              href={
                "https://primal.net/p/npub14vskcp90k6gwp6sxjs2jwwqpcmahg6wz3h5vzq0yn6crrsq0utts52axlt"
              }
              target={"_blank"}
            >
              <Button
                variant="dark"
                style={{
                  color: "white",
                  textShadow: "0px 0px 4px black",
                  margin: 6,
                  width: 180,
                  display: "flex",
                }}
                onClick={() => {
                  logEvent(analytics, "select_content", {
                    content_type: "button",
                    item_id: "Primal Social Wallet",
                  });
                }}
              >
                <div>
                  {" "}
                  <svg
                    style={{ marginBottom: 2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 256 256"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1_943)">
                      <path
                        d="M155.506 253.036C146.645 254.976 137.44 255.999 127.997 255.999C102.077 255.999 77.9567 248.295 57.8008 235.051C52.7974 227.894 50.5525 223.955 48.915 221.081C48.1036 219.657 47.4413 218.495 46.6664 217.332C39.0311 205.053 35.0362 189.28 34.1651 170.748C31.4666 113.326 66.3642 76.6573 102.015 70.6387C124.613 66.8235 142.572 70.6872 156.347 78.0534C144.169 74.666 129.652 74.4622 113.102 79.2C72.9831 92.1309 59.6091 131.451 65.3414 174.994C75.3453 229.555 128.842 249.111 155.506 253.036Z"
                        fill="url(#paint0_linear_1_943)"
                      />
                      <path
                        d="M41.2387 222.111C33.7762 208.86 27.0184 189.088 26.1739 171.123C23.3092 110.164 60.5628 69.5235 100.683 62.7503C155.371 53.5175 185.775 85.8934 196.256 109.923C196.695 109.628 196.873 109.043 196.641 108.539C179.408 71.0662 143.765 45.3331 102.592 45.3331C55.8419 45.3331 14.127 78.8691 0 128.71C0.200633 165.642 16.0426 198.871 41.2387 222.111Z"
                        fill="url(#paint1_linear_1_943)"
                      />
                      <path
                        d="M199.997 233.844C190.764 240.137 180.665 245.253 169.916 248.977C164.755 248.078 159.037 246.959 155.011 246.171C153.103 245.797 151.574 245.498 150.666 245.332C126.318 240.885 82.7834 225.195 73.246 173.749C70.5513 153.063 72.4812 134.02 79.3156 118.916C86.0487 104.035 97.6686 92.6275 115.39 86.8682C135.987 81.2567 153.055 84.0378 165.732 90.8469C162.612 90.1887 159.386 89.8437 156.085 89.8437C128.652 89.8437 106.414 113.671 106.414 143.063C106.414 154.799 109.959 165.648 115.966 174.447C115.966 174.447 133.16 206.926 179.966 204.023C221.7 201.434 243.373 163.999 245.956 150.172C247.298 142.986 248 135.575 248 127.999C248 61.7256 194.274 7.99997 128.001 7.99997C77.851 7.99997 34.8866 38.7631 16.9488 82.4478C10.8898 90.3409 5.6727 99.0914 1.46875 108.554C10.8367 47.0899 63.9194 0 128.001 0C198.693 0 256 57.3073 256 127.999C256 171.996 233.803 210.805 199.997 233.844Z"
                        fill="url(#paint2_linear_1_943)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_943"
                        x1="79.9357"
                        y1="106.044"
                        x2="79.7404"
                        y2="219.805"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0.0297309" stop-color="#FA3C3C" />
                        <stop offset="1" stop-color="#BC1870" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_1_943"
                        x1="62.5099"
                        y1="52.0175"
                        x2="56.1717"
                        y2="165.81"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF9F2F" />
                        <stop offset="1" stop-color="#FA3C3C" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_1_943"
                        x1="151.999"
                        y1="253.332"
                        x2="152.351"
                        y2="121.334"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#5B09AD" />
                        <stop offset="1" stop-color="#BC1870" />
                      </linearGradient>
                      <clipPath id="clip0_1_943">
                        <rect width="256" height="256" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>&nbsp; Connect</div>
              </Button>
            </a>
          </RiseUpAnimation>
        )} */}

        {showThird && (
          <RiseUpAnimation>
            <div style={{ margin: 6, textAlign: "left" }}>
              <WalletAuth />
              <br />
              {/* 
              <Form>
                <Form.Check
                  type="switch"
                  // id="custom-switch"
                  label="Spanish mode"
                  checked={false}
                  disabled
                />
              </Form> */}
            </div>
          </RiseUpAnimation>
        )}
      </div>

      <Modal
        centered
        show={isModalOpen}
        fullscreen
        style={{ backgroundColor: "black" }}
        keyboard={true}
        onHide={() => setIsModalOpen(false)}
      >
        <Modal.Header
          closeButton
          closeVariant="white"
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
          }}
          onHide={() => setIsModalOpen(false)}
        >
          <Title title={""} closeFunction={() => setIsModalOpen(false)} />
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FAQSection />
          <br />
          <br />

          <DiscordButton />
        </Modal.Body>
      </Modal>
    </>
  );
};
