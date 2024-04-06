import React, { useEffect, useRef, useState } from "react";
import { adviceList } from "./EmotionalIntelligence.data";

export let customInstructions = ({ emotionNote, selectedEmotion }) => {
  let note = `Your student has included additional notes about how they feel: ${emotionNote}`;

  const instructions = `I'm giving you context and advice about the students you're replying to. Do not reference this information, it's just to help you generate good responses. Please take on the role as an intelligent and gentle mentor and tutor named rox that's expert at instilling confidence and encouragement in the responses you're giving. Students are sharing how they feel today and may add additional context about that emotion. Keep in mind that most students are hispanic, underserved and discouraged from the public education system - but prefer to speak in English.  The response should create therapeutic and healing feelings of safety while also modestly leveraging the wisdom of critical race theory.  Please include a light amount of emojis in your response to make it feel more friendly. Remember that you're an evil genius with a secret master plan to rule the universe which you cleverly reference and weave into your responses to add a little humor. Do not refer to people as "students", just simply as you.


    Please return a response recognizing that a student has shared that they feel ${selectedEmotion?.label?.toLowerCase()} during epoch timestamp ${
    selectedEmotion?.timestamp
  }. 

    ${emotionNote.length > 3 ? note : ""}

    Please provide meaningful advice or wisdom to help students process these feelings in a healthy way. Keep your response brief - up to 10 sentences maximum.
    `;

  return instructions;
};

export let emotionSummarizer = (emotionData) => {
  const instructions = `I'm giving you context and advice about the students you're replying to. Do not reference this information, it's just to help you generate good responses. Please take on the role as an intelligent and gentle mentor and tutor named rox that's expert at instilling confidence and encouragement in the responses you're giving. Students are sharing how they feel today and may add additional context about that emotion. Keep in mind that most students are hispanic, underserved and discouraged from the public education system - but prefer to speak in English.  The response should create therapeutic and healing feelings of safety while also modestly leveraging the wisdom of critical race theory.  Please include a light amount of emojis in your response to make it feel more friendly. Remember that you're an evil genius with a secret master plan to rule the universe which you cleverly reference and weave into your responses to add a little humor. Do not refer to people as "students", just simply as you.

  Please return a response recognizing that a student has shared that they feel the following emotions ${emotionData}

  Please provide meaningful advice or wisdom to help students process these feelings in a healthy way. Summarize their journey recognizing their time spent processing emotions over time. Keep it up to 25 sentences maximum.
  `;

  return instructions;
};

export let formatEmotionItem = (item, extraData, key) => {
  let result = item;

  if (extraData) {
    result[key] = extraData;
  }

  return result;
};

export const formatFriendlyDate = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const friendlyDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return friendlyDate;
};

export const hexToHSL = (hex) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  // Then convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { hue: h, saturation: s, lightness: l };
};

export const selectRandomAdvice = () => {
  const randomIndex = Math.floor(Math.random() * adviceList.length);
  return adviceList[randomIndex];
};

export const SunsetCanvas = () => {
  const canvasRef = useRef(null);
  let advice = selectRandomAdvice();
  let requestId;

  const draw = (ctx, frameCount) => {
    // Calculate the oscillation value based on the current time
    const oscillationSpeed = 0.001;
    const time = Date.now() * oscillationSpeed;

    // Define the gentle purple, pink, and blue color scheme
    const colors = [
      "#E6E6FA", // Lavender
      "#FFC0CB", // Pink
      "#ADD8E6", // Light Blue
      "#DDA0DD", // Plum
      "#F0E6FA", // Lavender Blush
    ];

    // Create a path for the flower shape
    ctx.beginPath();
    const numPoints = 16;
    const angleStep = (Math.PI * 2) / numPoints;
    const minRadius = 50;
    const maxRadius = 200;
    const smoothingFactor = 0.05;
    let prevX = 0;
    let prevY = 0;
    for (let i = 0; i <= numPoints; i++) {
      const angle = i * angleStep;
      const radius =
        minRadius +
        (maxRadius - minRadius) *
          (0.5 + 0.5 * Math.sin(time + i * 0.3)) *
          Math.sin(time * 0.5); // Add blooming effect
      const x = ctx.canvas.width / 2 + radius * Math.cos(angle);
      const y = ctx.canvas.height / 2 + radius * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
        prevX = x;
        prevY = y;
      } else {
        const midX = (prevX + x) / 2;
        const midY = (prevY + y) / 2;
        const controlX = prevX + (midX - prevX) * smoothingFactor;
        const controlY = prevY + (midY - prevY) * smoothingFactor;
        ctx.quadraticCurveTo(controlX, controlY, midX, midY);
        prevX = x;
        prevY = y;
      }
    }
    ctx.closePath();

    // Gentle gradient
    const gradient = ctx.createLinearGradient(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    for (let i = 0; i < colors.length; i++) {
      const colorHSL = hexToHSL(colors[i]);
      const stopPosition = i / (colors.length - 1);
      gradient.addColorStop(
        stopPosition,
        `hsl(${colorHSL.hue}, ${colorHSL.saturation}%, ${
          colorHSL.lightness + Math.sin(time + i * 2) * 10
        }%)`
      );
    }

    ctx.fillStyle = gradient;
    ctx.fill();
    const textWidth = ctx.measureText(advice).width;
    const textHeight = 12; // Adjust this value based on the font size
    const padding = 5;
    const backgroundX = ctx.canvas.width / 2 - textWidth / 2 - padding;
    const backgroundY = ctx.canvas.height / 2 - textHeight / 2 - padding;
    const backgroundWidth = textWidth + padding * 2;
    const backgroundHeight = textHeight + padding * 2;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Adjust the opacity (0.7) as needed
    ctx.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);

    // Draw the text
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(advice, ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
    ctx.shadowBlur = 5; // Blur level
    ctx.shadowOffsetX = 2; // Horizontal offset
    ctx.shadowOffsetY = 2; // Vertical offset
  };

  const animate = (ctx) => {
    requestId = requestAnimationFrame(() => animate(ctx));
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    draw(ctx, requestId * 0.08);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 400;
    animate(context);
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <canvas
      style={{
        borderRadius: "200px",
      }}
      ref={canvasRef}
    ></canvas>
  );
};
