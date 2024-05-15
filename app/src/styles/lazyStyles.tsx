import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

let getRandomColor = () => {
  const keys = Object.keys(japaneseThemePalette);
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];
  const color = japaneseThemePalette[randomKey];

  // Handle empty or undefined color values
  if (!color || color === "") {
    return getRandomColor(); // Recursively call the function until a valid color is found
  }

  return color;
};

const popAnimation = keyframes`
0%, 100% { transform: scale(1); }
10%, 30% { transform: scale(1.5); }
20% { transform: scale(0.85); }
40%, 60% { transform: scale(1.4); }
50% { transform: scale(0.9); }
70%, 90% { transform: scale(1.3); }
80% { transform: scale(0.95); }

`;

export const PopAnimation = styled.div`
  animation: ${popAnimation} 2s ease-in-out infinite;
`;

const riseAnimation = keyframes`
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const RiseUpAnimation = styled.div`
  animation: ${riseAnimation} ${(props) => {
  return props.speed ? props.speed + "s" : "0.38s";
}}; ease-in-out;
`;

const riseDownAnimation = keyframes`
  from {
    transform: translateY(-40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const RiseDownAnimation = styled.div`
  animation: ${riseDownAnimation} ${(props) => {
  return props.speed ? props.speed + "s" : "0.38s";
}}; ease-in-out;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const FadeInComponent = styled.div`
  animation: ${fadeInAnimation} ${(props) => {
  return props.speed ? props.speed + "s" : "0.45s";
}}; ease-in;
`;

const panRight = keyframes`
  from {
    transform: translateX(60px);
  }
  to {
    transform: translateX(0); // Adjust as needed
  }
`;

const panLeft = keyframes`
  from {
    transform: translateX(-60px);
  }
  to {
    transform: translateX(0); // Adjust as needed
  }
`;
export const PanRightComponent = styled.div`
  animation: ${panRight} ${(props) => {
  return props.speed ? props.speed + "s" : "0.25s";
}}; ease;
`;

export const PanLeftComponent = styled.div`
  animation: ${panLeft} ${(props) => {
  return props.speed ? props.speed + "s" : "0.25s";
}}; ease;
`;
export const sineWave = keyframes`
0%, 100% {
  border-radius: 25% 75% 25% 75%;
}
25% {
  border-radius: 37.5% 62.5% 62.5% 37.5%;
}
50% {
  border-radius: 25% 75% 25% 75%;
}
75% {
  border-radius: 62.5% 37.5% 37.5% 62.5%;
}
`;
export const movingFace = keyframes`
0%, 100% {
  border-radius: 10px 50px 50px 10px;
  transform: translateY(0) rotate(0deg);
}
25% {
  border-radius: 50px 10px 10px 50px;
  transform: translateY(-5px) rotate(-2deg);
}
50% {
  border-radius: 10px 50px 50px 10px;
  transform: translateY(0) rotate(0deg);
}
75% {
  border-radius: 50px 10px 10px 50px;
  transform: translateY(5px) rotate(2deg);
}
`;
export const rectanglePump = keyframes`
0%, 100% {
  border-radius: 10px 50px 50px 10px;
}
25% {
  border-radius: 50px 10px 10px 50px;
}
50% {
  border-radius: 10px 50px 50px 10px;
}
75% {
  border-radius: 50px 10px 10px 50px;
}

`;

export const StyledNavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  max-width: 100%;
  min-width: 100%;
  opacity: 0.9;

  /* max-width: 100%; */
  transition: 0.2s all ease-in-out;

  border-radius: 2px;
  /* box-shadow: 0 3px 6px #0b186be2, 0 6px 6px rgba(0, 0, 0, 0.23); */
  &:hover {
    /* transform: scale(1.01); */
    /* box-shadow: 0 19px 38px  #0b186be2, 0 15px 12px rgba(0,0,0,0.22); */
  }

  position: fixed;
  background-color: black;
  z-index: 100;
  padding-top: 4px;
`;

export const StyledCollectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  justify-content: center;

  // margin-bottom: 12px;
  transition: 0.2s all ease-in-out;
  // padding: 12px;
  border-radius: 2px;
  /* box-shadow: 0 3px 6px #6b0b68e1, 0 6px 6px rgba(0, 0, 0, 0.23); */
  width: 100%;

  max-width: 600px;
  &:hover {
    /* transform: scale(1.01); */
    /* box-shadow: 0 19px 38px  #0b186be2, 0 15px 12px rgba(0,0,0,0.22); */
  }
`;
export const StyledModule = styled.button`
  border: 1px solid #636366;
  background-color: black;
  // background-size: cover;
  box-sizing: border-box;
  margin: 6px;
  width: 140px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  color: white;
  transition: 0.15s all ease-in-out;
  border: 2px solid
    ${(props) => {
      return props.module === "Lesson 4 Building Apps & Startups" ||
        props.module === "Lesson 2 Frontend Programming"
        ? "gold"
        : props.patreonObject.creatorBorder
        ? "black"
        : props.patreonObject.dealerBorder
        ? "#ffd164"
        : "#B271D1";
    }};

  text-shadow: 1px 1px 5px black;

  /* cursor: grab;
  }}; */

  &:hover {
    transform: scale(1.1);

    background: ${(props) => {
      return getRandomColor();
    }};

    animation: ${sineWave} 3s infinite ease-in-out;
  }

  background-image: url(${(props) => props.patreonObject.backgroundImgSrc});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-family: "Bungee";
`;

export const ComingSoonModule = styled.button`
  border: 1px solid #636366;
  background-color: black;
  background-size: cover;
  box-sizing: border-box;
  margin: 8px;
  width: 140px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  color: white;
  transition: 0.15s all ease-in-out;
  border: 5px dashed
    ${(props) => {
      return props.patreonObject.creatorBorder
        ? "#DA830D"
        : props.patreonObject.dealerBorder
        ? "black"
        : "#B271D1";
    }};

  text-shadow: 1px 1px 5px black;
  background-color: ${(props) => {
    return props.patreonObject.creatorBorder
      ? "#DA830D"
      : props.patreonObject.dealerBorder
      ? "#F8B125"
      : "#F099AD";
  }};

  cursor: grab;
  }};

  &:hover {
    transform: scale(1.1);

    background: #f5befa;

  }
`;

export const StyledLink = styled(Link)`
  &:hover {
    cursor: ${(props) => {
      return props.active ? "grab" : "not-allowed";
    }};
    transform: ${(props) => {
      return props.active &&
        props.pathSelectionAnimationData.path === props.path
        ? "scale(0.95)"
        : props.active &&
          !(props.pathSelectionAnimationData.path === props.path)
        ? "scale(1.02)"
        : "";
    }};

    background: ${(props) => {
      const isUnlocked = props.isUnlocked;
      const isActive = props.active;
      const isSelectedPath =
        props.pathSelectionAnimationData.path === props.path;
      const currentPath = props.path;

      let backgroundColor = "";

      // Function to convert a hex color to its blue version
      const toBlueVersion = (color) => {
        // Implement your logic to convert to blue version
        // return "#001eff"; // Example
        return "#000f89";
      };

      // Function to convert a hex color to its golden version
      const toGoldenVersion = (color) => {
        // Implement your logic to convert to golden version
        return "#ffd164"; // Example
      };

      if (isActive && isSelectedPath) {
        backgroundColor = "#4003ba";
      } else if (isActive && !isSelectedPath) {
        backgroundColor = "#4003ba;";
      }

      // Adjust color based on path
      if (!isUnlocked) {
        backgroundColor = "black";
      } else if (currentPath === "Engineer") {
        // Colors remain the same
      } else if (currentPath === "Creator") {
        backgroundColor = toBlueVersion(backgroundColor);
      } else if (currentPath === "Entrepeneur") {
        backgroundColor = toGoldenVersion(backgroundColor);
      }

      return backgroundColor;
    }};

    animation: ${rectanglePump} 3s infinite ease-in-out;

    text-shadow: 1px 1px 5px black;
    color: white;
  }

  background: ${(props) => {}};

  // border: 2px solid hotpink;
  border: 2px solid
    ${(props) => {
      const isUnlocked = props.isUnlocked;
      const isActive = props.active;
      const isSelectedPath =
        props.pathSelectionAnimationData.path === props.path;
      const currentPath = props.path;

      let backgroundColor = "";

      // Function to convert a hex color to its blue version
      const toBlueVersion = (color) => {
        // Implement your logic to convert to blue version
        // return "#001eff"; // Example
        return "#000f89";
      };

      // Function to convert a hex color to its golden version
      const toGoldenVersion = (color) => {
        // Implement your logic to convert to golden version
        return "#ffd164"; // Example
      };

      if (isActive && isSelectedPath) {
        backgroundColor = "#4003ba";
      } else if (isActive && !isSelectedPath) {
        backgroundColor = "#4003ba";
      }

      // Adjust color based on path
      if (!isUnlocked) {
        backgroundColor = "gray";
      } else if (currentPath === "Engineer") {
        // Colors remain the same
      } else if (currentPath === "Creator") {
        backgroundColor = toBlueVersion(backgroundColor);
      } else if (currentPath === "Entrepeneur") {
        backgroundColor = toGoldenVersion(backgroundColor);
      }

      return backgroundColor;
    }};

  width: 115px;

  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  // margin: 8px;
  margin-left: 8px;
  margin-right: 8px;

  color: white;
  transition: 0.15s all ease-in-out;
  text-shadow: 1px 1px 5px black;
  // color: #f5befa;
  border-radius: 0px;
  //      " #e216b4"

  box-shadow: ${(props) => {
    const isUnlocked = props.isUnlocked;
    const isActive = props.active;
    const isSelectedPath = props.pathSelectionAnimationData.path === props.path;
    const currentPath = props.path;

    let backgroundColor = "";

    // Function to convert a hex color to its blue version
    const toBlueVersion = (color) => {
      // Implement your logic to convert to blue version
      // return "#001eff"; // Example
      return " #000f89";
    };

    // Function to convert a hex color to its golden version
    const toGoldenVersion = (color) => {
      // Implement your logic to convert to golden version
      return " #ffd164"; // Example
    };

    // if (isActive && isSelectedPath) {
    //   backgroundColor = "1px 1px 3px 1px #ff64ff";
    // } else if (isActive && !isSelectedPath) {
    //   backgroundColor = "1px 1px 3px 1px #ff64ff";
    // }

    if (isSelectedPath) {
      backgroundColor = "1px 1px 3px 1px";
    }

    // Adjust color based on path
    if (!isUnlocked) {
      backgroundColor = "";
    } else if (currentPath === "Engineer") {
      backgroundColor += " #4003ba";
    } else if (currentPath === "Creator") {
      backgroundColor += toBlueVersion(backgroundColor);
    } else if (currentPath === "Entrepeneur") {
      backgroundColor += toGoldenVersion(backgroundColor);
    }

    return backgroundColor;
  }};

  /* cursor: ${(props) => {
    return props.active ? "grab" : "not-allowed";
  }}; */

  transform: ${(props) => {
    return props.pathSelectionAnimationData.path === props.path
      ? "scale(0.95)"
      : "";
  }};
  font-family: "Bungee";
`;
//

export const StyledPath = styled.button`
  box-sizing: border-box;
  background-color: #f5befa;

  /* max-width: 200px; */
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  /* padding: 10px;
  margin: 12px; */
  /* border-radius: 46%; */
  color: white;
  transition: 0.15s all ease-in-out;
  text-shadow: 1px 1px 5px black;

  cursor: ${(props) => {
    return props.active ? "grab" : "not-allowed";
  }};

  &:hover {
    transform: ${(props) => {
      return props.active ? "scale(1.1)" : "";
    }};

    /* background: #B993D6;  /* fallback for old browsers */
    /* background: -webkit-linear-gradient(to top, #8CA6DB, #B993D6);  Chrome 10-25, Safari 5.1-6 */
    /* background: linear-gradient(to top, #8CA6DB, #B993D6);  */
    background-color: #ff64ff;
    box-shadow: 0 3px 6px #0b186be2, 0 6px 6px #fff5ca;
    /* box-shadow: 0 14px 28px #340627e0, 0 10px 10px rgba(0, 0, 0, 0.22); */
  }
`;

export const StyledPromptButton = styled.button`
  background-color: ${(props) => {
    return props.loadingMessage
      ? "#48484A"
      : props.isDisabled
      ? "rgba(225, 229, 230, .12)"
      : "black";
  }};

  cursor: ${(props) => {
    return props.loadingMessage ? "not-allowed" : "grab";
  }};

  color: white;
  /* border: 2px solid #48484a; */

  /*       isPracticeComplete={isPracticeComplete}
  isVideoWatched={isVideoWatched} */

  border: 3px solid
    ${(props) => {
      return props?.isGold ? "gold" : props?.borderHighlight;
    }};
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px; */
  text-align: left;
  padding: 10px;
  width: 200px;
  margin-top: 24px;

  display: flex;
  align-items: center;
  transition: 0.15s all ease-in-out;
  -webkit-box-shadow: 0px 1px 15px -1px rgba(42, 63, 120, 1);
  -moz-box-shadow: 0px 1px 15px -1px rgba(42, 63, 120, 1);
  box-shadow: 0px 1px 15px -1px rgba(42, 63, 120, 1);

  &:hover {
    transform: scale(1.1);
  }
`;

export const StaticPromptButton = styled.div`
  background-color: ${(props) => {
    return props.loadingMessage
      ? "#48484A"
      : props.isDisabled
      ? "rgba(225, 229, 230, .12)"
      : "black";
  }};

  cursor: not-allowed;

  color: white;
  /* border: 2px solid #48484a; */

  /*       isPracticeComplete={isPracticeComplete}
  isVideoWatched={isVideoWatched} */

  border: 1px solid
    ${(props) => {
      return props?.isGold ? "gold" : props?.borderHighlight;
    }};
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px; */
  text-align: left;
  padding: 10px;
  width: 200px;
  margin-top: 24px;

  display: flex;
  align-items: center;
  transition: 0.15s all ease-in-out;
  -webkit-box-shadow: 0px 1px 15px -1px rgba(42, 63, 120, 1);
  -moz-box-shadow: 0px 1px 15px -1px rgba(42, 63, 120, 1);
  box-shadow: 0px 1px 15px -1px rgba(42, 63, 120, 1);
  border-radius: 10px;
`;

export let prettyColorPalette = {
  banner: "#F8B125",
  paths: "#F5BEFA",
  softYellowGlow: "#FFF5CA",
};

// holy ghost palette
export const kanyeColorPalette = {};

// zen garden palette
export let japaneseThemePalette = {
  // CherryBlossomPink: "#FFB7C5", // Cherry Blossom
  KyotoPurple: "#663399", // Sweet Potato Purple
  FujiSanBlue: "#6f97d3", // Mount Fuji Blue
  TokyoTwilight: "#706fd3", // Twilight in Tokyo
  // SakuraMochiPink: "#FF92A9", // Sakura Mochi
  WisteriaPurple: "#89729E", // Wisteria Flower
  GoldenAccent: "#bf8902", // Gold in Japanese Art
  WoodenArchitectureBrown: "#d3a86f", // Japanese Wood Architecture
  BambooForestGreen: "#4aa89c", // Bamboo Forest
  DeepCherryBlossomPink: "#C71585", // Deep Cherry Blossom
  ProsperityEmeraldGreen: "#31d660", // Symbol of Wealth
  StrongRed: "#DC143C", // Japanese Flag Red
  PhthaloBluePurple: "#000f89", // Indigo Blue Textile
  DarkMetallicSilver: "#5A5A5A", // Darkened Steel Samurai Sword
  // Lavender: "rgba(220,205,255, 1)",
  PowerPurple: "rgba(102, 3, 252, 1)",
  PowerPink: "#f7059d",
  OrangeGold: "#FFD68B",
  CobaltBlue: "#0044B0",
  iphoneBlue: "2C2C2E",
  roxPink: "",
  themePurple: "4003ba",
};

// opinionated
export let textBlock = (
  backgroundColor,
  shadowSize = 4,
  borderRadius = 4,
  color = "white",
  boxShadow = "0px 0px 0px 0px rgba(0,0,0, 1)",
  padding = 16
) => {
  return {
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    padding: padding,
    textShadow: `${shadowSize}px ${shadowSize}px ${shadowSize || 6}px black`,
    color: color,
    boxShadow: boxShadow,
  };
};

//lol
export let textBlock2 = (
  backgroundColor,
  shadowSize = 0,
  borderRadius = 4,
  color = "white",
  boxShadow = null
) => {
  return {
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    padding: 16,
    textShadow: `${shadowSize}px ${shadowSize}px ${shadowSize || 0}px black`,
    color: color,
    boxShadow: boxShadow,
  };
};

export const StyledListItem = {
  padding: 6,
};

export const responsiveBox = {
  width: "100%",
  maxWidth: 700,
};

export let paddingBlock = (backgroundColor) => {
  return {
    backgroundColor: backgroundColor,
    borderRadius: 12,
    padding: 16,
    color: "white",
  };
};

// export let roxMessageBlock = (backgroundColor) => {
//   return {
//     backgroundColor: backgroundColor,
//     borderRadius: 12,
//     padding: 16,
//     color: "white",
//   };
// };

export const StyledRoxHeader = styled.h1`
  cursor: pointer;
  font-family: "Bungee", sans-serif;
  // display: flex;
  // justify-content: center;

  transition: 0.05s all linear;

  width: fit-content;

  &:hover {
    transform: scale(1.02); // Scales up the text by 10% on hover
    color: #ebfaf9;
    text-shadow: 1px 1px 3px gold;
    text-decoration: underline;
  }
  text-decoration: underline;
`;
