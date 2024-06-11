import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

// Define the animation for the web5 theme
const subtleSwirl = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Define the flip animation
const flip = keyframes`
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
`;

// Create a CardContainer styled component with conditional styles based on theme
const CardContainer = styled.div`
  text-shadow: 0px 0.25px 0px black;
  width: 100%;
  max-width: 400px;
  height: ${({ flip }) => (flip ? "525px" : "200px")};
  border-radius: 16px;
  perspective: 1000px;
  transition: 0.65s all ease-in-out;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${({ flip }) =>
    flip &&
    css`
      transform: rotateY(180deg);
    `}
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  ${({ theme }) =>
    theme === "web5"
      ? css`
          background: linear-gradient(135deg, #2c2c2c, #1a1a1a, #0f0f0f);
          background-size: 200% 200%;
          animation: ${subtleSwirl} 6s ease infinite;
          color: yellow;
          font-family: "IBM Plex Mono";
          font-size: 0.8em;
        `
      : css`
          background: linear-gradient(135deg, #ff6f91, #d783ff, #c471ed);
          background-size: 200% 200%;
          animation: ${subtleSwirl} 6s ease infinite;
          color: #fff;
          font-family: "IBM Plex Mono";
          font-size: 1.2em;
        `}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  padding: 20px;
  text-align: center;
  overflow-y: auto;
`;

const CardNumber = styled.div`
  font-size: 1.2em;
  letter-spacing: 2px;
`;

const CardHolder = styled.div`
  font-size: 0.8em;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => (theme === "web5" ? "black" : "#ff42b7")};
  color: ${({ theme }) => (theme === "web5" ? "cyan" : "white")};
  cursor: pointer;
  font-family: "Bungee";
`;

export const IdentityCard = ({ number, name, theme = "nostr" }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const nostrContent = (
    <div
      className="info_box"
      style={{
        textAlign: "left",
      }}
    >
      You will create an account using the nostr protocol when you create a
      name. The nostr protocol lets you own your own social network and allows
      you to choose how you receive and publish content. It uses a public key
      (your ID) and a secret key (your password) to manage identity. Without a
      name,{" "}
      <a
        target="_blank"
        href="primal.net/p/npub1mgt5c7qh6dm9rg57mrp89rqtzn64958nj5w9g2d2h9dng27hmp0sww7u2v"
      >
        you'll be connected to a shared account with rox.
      </a>
    </div>
  );

  const web5Content = (
    <div
      className="info_box"
      style={{
        textAlign: "left",
      }}
    >
      Your identity wallet manages the data that can migrate to other platforms,
      services or applications. Different identities are used to manage
      different networks. <br />
      <br />
      <b>
        Make sure to save your ID somewhere else so you can migrate your profile
        to your preferred social media or browser. If you lose this ID, you lose
        your account since your identity is anonymous with rox.
        <br />
        <br />
        Don't trust, verify:{" "}
        <a href="https://github.com/RobotsBuildingEducation/RobotsBuildingEducation/blob/main/app/src/ProofOfWork/ActionBar/IdentityWallet/IdentityWallet.tsx">
          the code
        </a>
      </b>
    </div>
  );

  return (
    <CardContainer flip={isFlipped}>
      <CardInner flip={isFlipped}>
        <CardFace theme={theme}>
          <CardNumber>{number}</CardNumber>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <CardHolder>{name}</CardHolder>
            </div>
            <div>
              <div
                style={{
                  width: "fit-content",
                  height: "30px",
                  backgroundColor: theme === "web5" ? "black" : "#ff42b7",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "underline",
                  fontFamily: "Bungee",
                  color: theme === "web5" ? "cyan" : "white",
                }}
              >
                <Button theme={theme} onClick={() => setIsFlipped(true)}>
                  {theme}
                </Button>
              </div>
            </div>
          </div>
        </CardFace>
        <CardBack theme={theme}>
          <div style={{ height: "100%", padding: 12 }}>
            {theme === "web5" ? web5Content : nostrContent}
            <Button theme={theme} onClick={() => setIsFlipped(false)}>
              Back
            </Button>
            <br />
            <br />
          </div>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};
