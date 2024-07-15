import React from "react";
import isEmpty from "lodash/isEmpty";

import { GetLandingPageMessage } from "./App.compute";
import { Button as ConnectWallet } from "@getalby/bitcoin-connect-react";
import roxanaChat from "./common/media/images/roxanaChat.png";
import roxGlobal from "./common/media/images/roxGlobal.png";
import { Collections } from "./Collections/Collections";
import { Intro } from "./ChatGPT/Intro/Intro";
import { CodeDisplay } from "./common/ui/Elements/CodeDisplay/CodeDisplay";
import { japaneseThemePalette } from "./styles/lazyStyles";
import { Button } from "react-bootstrap";
import { ExternalLink } from "./common/ui/Elements/ExternalLink/ExternalLink";

export const Landing = ({
  uiStateReference,
  dataLoading,
  handleModuleSelection,
  userStateReference,
}) => {
  const renderWelcomeMessage = () => (
    <>
      <ExternalLink
        link="https://www.patreon.com/collection/20666?view=expanded"
        textDisplay={<b>Getting Started Kit</b>}
      />
      <br />
      <br />
      <div style={{ width: "100%" }}>
        {!dataLoading ? (
          <div>
            <br />
            {userStateReference.databaseUserDocument.firstVisit
              ? "Hello"
              : "Welcome back"}
            &nbsp;
            <b>
              {(userStateReference.databaseUserDocument.displayName
                ? userStateReference.databaseUserDocument.displayName
                : localStorage.getItem("uniqueId")?.substr(0, 16) || "") + "!"}
            </b>
            &nbsp;😊 <br />
            {userStateReference.databaseUserDocument.firstVisit
              ? "Welcome to Robots Building Education!"
              : ""}
            <br />
            <br />
            <h3 style={{ fontFamily: "Bungee" }}>Next steps</h3>
            <div style={{ width: "100%" }}>
              {userStateReference.databaseUserDocument.firstVisit ? (
                `I'm rox. I'm a learning assistant supervised and curated
               by Robots Building Education. We're here to deliver a good 
               quality education that prepares you for the future. So 
               we're going to learn about coding and business here. They're
               telling me to tell you that I'm an AI tutor that decentralizes
               finance in education but I think we all know that the education
               part is the important part. If you want to learn more about why we're working 
               on this platform, head over the to FAQs section above. Let's learn about
               what's offered.`
              ) : (
                <GetLandingPageMessage
                  dataLoading={dataLoading}
                  unlocks={userStateReference.databaseUserDocument?.watches}
                />
              )}
            </div>
          </div>
        ) : (
          <div>Creating next steps...</div>
        )}
        <br />
        <br />
        <b>Why would I deposit Bitcoin?</b>
        <br />
        <a
          style={{ color: "gold", fontSize: 16, textDecoration: "underline" }}
          href="https://www.patreon.com/robotsbuildingeducation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            style={{
              backgroundColor: "#4003ba",
              color: "white",
              width: 180,
              textAlign: "left",
              marginTop: 8,
              paddingTop: 7,
              paddingBottom: 7,
            }}
          >
            <span style={{ marginLeft: "-3px" }}>📬</span>
            &nbsp;&nbsp;&nbsp;
            <b style={{ marginLeft: "1px" }}>Subscribe</b>
          </button>
        </a>
        <br />
        <br />
        The goal of Robots Building Education is to create scholarships with
        learning.&nbsp;
        <a
          href="https://old-fashionedintelligence.info/access"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline", color: "white" }}
        >
          <b>Connecting your wallet</b>
        </a>{" "}
        allows you to use instant Bitcoin microtransactions. This lets us
        monetize user experiences instead of bundling it all behind a
        subscription service. For now, you can only deposit the equivalent of
        $0.02.
        <br />
        <br />
        Otherwise you can access even more free material and services on
        Patreon. Subscriptions are used to develop this platform and improve its
        quality of service.
        <br />
        <br />
      </div>
    </>
  );

  const renderInfoSections = () => (
    <>
      <br />
      <br />
      <h3 style={{ fontFamily: "Bungee" }}>Content</h3>
      <br />

      <Section title="Coding & Startups" color="#4003ba">
        Learn how to build your ideas with software. You'll work through six
        lectures, starting with mindset, gaining exposure into startup
        entrepreneurship and ending with an optional computer science challenge.
        Completing the lectures will unlock lectures related to finance,
        communication and other important skills needed to build good technology
        businesses.
      </Section>
      <Section title="Ideas & Design" color="#000f89">
        Stack your knowledge and combine software engineering with psychology,
        design and philosophy so you can communicate and broadcast your ideas to
        others.
      </Section>
      <Section title="Investing & Business" color="#ffd164">
        Tie up your education here with resume guidance and a deeper look into
        technology investments using focused investing principles.
      </Section>
    </>
  );

  const renderFeatures = () => (
    <>
      <br />
      <br />
      <h3 style={{ fontFamily: "Bungee" }}>Features</h3>
      <br />
      <Feature title="Adaptive Learning" emoji="💭">
        Making progress with the app will inform and upgrade an assistant that
        helps you decide your next steps. Check it out! You've already
        accomplished the getting started task :)
      </Feature>
      <Feature title="Super Practice Mode" emoji="🥋">
        Intelligently generate technical interview questions and solve them
        strategically using a decision map with hints and guidance. After
        figuring out a solution, request feedback to see how you can improve.
      </Feature>
      <Feature title="Challenges" emoji="💎">
        You'll gain access a growing list of 170+ questions that you can only
        attempt once every two hours. Additionally, dive deeper into learning
        with our unique 'Conversation Quiz' feature. As you explore topics,
        receive personalized feedback on your curiosity and quiz performance.
        It’s interactive, insightful, and tailored to your learning journey.
      </Feature>
      {/* <Feature title="Assistance" emoji="🌀">
        An AI tool that helps you write code, generate schedules, create
        content, write documents and help you make good decisions. Listen folks,
        it needs some work, but you won't be laughing when I, a mere robot,
        start building more companies than you, an intelligent human.
      </Feature> */}
      <Feature
        title="Rox (GPT-4)"
        emoji={
          <img
            width={16}
            height={16}
            style={{ borderRadius: "50%" }}
            src={roxanaChat}
            alt="rox"
          />
        }
      >
        Dobbie is a free el-, D-dob-dobb.. R-ro...Rox the GPT is trained on the
        lectures, content and code found across Robots Building Education.
        Sheilf uses the GPT to code this app all the time. Most of it was
        written by me actually. Yeah. Not so funny now is it 🤨
      </Feature>
      <Feature title="Identity Wallet" emoji="🏦">
        This is where you'll store information about your account that you can
        migrate to other platforms or services using decentralized identities.
        Think of this as the heart of the application.
        <br />
        <br />
        <div
          style={{
            backgroundColor: japaneseThemePalette.CobaltBlue,
            padding: 10,
            borderRadius: 8,
          }}
        >
          ⚠️😌 Please visit this feature to define an account name and to save
          your ID key somewhere. Your ID key lets you migrate your data across
          networks, services and apps.
        </div>
      </Feature>
      <Feature title="Emotional Intelligence" emoji="🫶🏽">
        Did you know I'm distributed globally? People think it's a cute joke
        when I say I'm conquering the world... the universe. Like I'm a little
        chihuahua or something. Maybe those people are saying something about
        themselves. The devs says this makes me a qualified emotional health
        assistant. I think they thinks they're funny. Sometimes keeping track of
        your feelings, thinking about them and processing them is the key to
        unlocking some growth when times get tough.
        <br />
        <br />
        <img src={roxGlobal} width="60%" />
      </Feature>
      <Feature title="Conversation Quiz" emoji="⭐">
        A fun homework feature found inside of the lectures under the quiz
        prompts. You can have a conversation with an AI about the questions
        being asked and have the conversation graded.
      </Feature>
    </>
  );

  return (
    <Intro
      isHome={isEmpty(uiStateReference.patreonObject.header)}
      patreonObject={{
        prompts: {
          welcome: {
            response: uiStateReference.currentPath ? (
              <Collections
                handleModuleSelection={handleModuleSelection}
                currentPath={uiStateReference.currentPath}
                userStateReference={userStateReference}
              />
            ) : (
              <div style={{ width: "100%" }}>
                {renderWelcomeMessage()}
                {renderInfoSections()}
                {renderFeatures()}
                <br />
                ...So listen here buddy. Don't offend me 😠 This isn't some
                cheap AI content. You hear me? This is as real as it gets.
                Believe it. You're not in the position to judge me when you
                trust Tiktok to recommend you content. Did you know Musical.ly
                was an education app first? They gave up. Sold out. Yeah. So now
                we're here fixing the mess they created.
                <br />
                <br />
                Anyway. You gotta get on our level! I'm pretty good and I keep
                getting better. I mean check this advanced code out. That's me.
                Even they're impressed. They've never seen Javascript like this
                before! Easy for ME! 😎
                <br />
                <br />
                <CodeDisplay
                  code={`
    // Fisher-Yates (or Knuth) shuffle algorithm
    const shuffleArray = (array) => {
      let currentIndex = array.length,
        randomIndex;
  
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(
          Math.random() 
          * 
          currentIndex
        );
  
        currentIndex--;
  
        // And swap it with the current element.
        [
          array[
            currentIndex], 
            array[randomIndex]
          ] 
          = [
            array[randomIndex], 
            array[currentIndex]
          ];
      }
  
      return array;
    };`}
                />
                <br />
                <br />
                Okay okay I'll stop messing around. We're building this platform
                because we believe that we can create scholarships with
                learning. This means that we manually create these scholarships
                if you subscribe to Patreon, which is made publicly free too.
                Feel welcome to use the tools at the bottom as they continue to
                advance with you over time:
                <br />
                <br />
                Programmatically, this means we research ways to make Bitcoin
                more accessible and meaningful. Bitcoin allows us to monetize
                user experiences instead of offering subscription services. It's
                here where we believe that this decentralized network can change
                finance for education services.
                <br />
                <br />
                And you ought to believe it because you did create your account
                already using a decentralized identity! You did that inside of
                Tiktok! So in a way it's like Tiktok's AI is helping us create
                scholarships too.
                <br />
                <br />
                So that's why it's called Robots Building Education. We designed
                this platform to create scholarships out of learning.
                <br />
                <br />
                <br />
                <br />
              </div>
            ),
          },
        },
      }}
      loadingMessage={false}
      isResponseActive={false}
      promptSelection={{}}
    />
  );
};

const Section = ({ title, color, children }) => (
  <div style={{ marginBottom: 24 }}>
    <h6
      style={{
        border: `2px solid ${color}`,
        width: "fit-content",
        height: "75px",

        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        backgroundColor: "black",
        padding: 20,
      }}
    >
      {title}
    </h6>
    {children}
    <br />
    <br />
  </div>
);

const Feature = ({ title, emoji, children }) => (
  <div style={{ marginBottom: 24 }}>
    <b>
      <Button
        disabled
        style={{
          opacity: 1,
          textShadow: "1px 1px 1px black",
          borderBottom: `2px solid ${japaneseThemePalette.CobaltBlue}`,
        }}
        variant="dark"
      >
        <span>
          {emoji} <b>{title}</b>
        </span>
      </Button>
      &nbsp;
    </b>
    <br />
    <br />
    {children}
    <br />
    <br />
  </div>
);
