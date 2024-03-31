import Editor from "react-simple-code-editor";
import styled from "styled-components";
import Markdown from "react-markdown";
import { transform } from "@babel/standalone";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { LiveError, LivePreview, LiveProvider } from "react-live";
import { useState } from "react";
import { Typewriter } from "../../../../common/ui/Displays/Typewriter/Typewriter";

const StyledPromptHeaderButton = styled.button`
  background-color: transparent;
  border-radius: 8px;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  color: white;
  font-family: Bungee;
  font-size: 24px;
`;
// import { marked } from "marked";
const Container = styled.div`
  font-family: "Arial", sans-serif;
  color: #4a4a4a;
  background-color: #f9f0f9;
  padding: 20px;
  border-radius: 10px;
`;

const Header = styled.header`
  color: #ff66c4;
  text-align: center;
  u h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

const InformationSection = styled.section`
  background-color: #ffe6f0;
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0;
`;

const CodeBreakdownSection = styled.div`
  margin: 20px 0;
`;

const CodeBreakdownItem = styled.div`
  background-color: #fff;
  border: 1px solid #ff99d6;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;

const CodeSnippet = styled.div`
  background-color: #f0f0f0;
  border-left: 4px solid #ff66c4;
  padding: 5px;
  font-family: "Courier New", monospace;
`;

const Description = styled.div`
  color: #ff66c4;
  font-weight: bold;
  margin-top: 10px;
`;

const Explanation = styled.div`
  background-color: #ffe6f0;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: #ffccf9;
  border-radius: 5px;
  margin-top: 20px;
`;

const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #1e1e1e; // Dark background
`;

const Section = styled.div`
  border: 1px solid #393939; // Slightly lighter border for contrast
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #282828; // Dark section background
`;

const ScriptHeader = styled.h2`
  color: #4fc3f7; // Bright color for headers
  margin-bottom: 10px;
`;

const ScriptLines = styled.div`
  color: #fff; // White text for readability
  margin-bottom: 15px;
`;

const InstructionList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  color: #bdbdbd; // Light grey for instructions
`;

const Instruction = styled.li`
  margin-bottom: 5px;
`;

const LetterContainer = styled.div`
  font-family: "Arial", sans-serif;

  max-width: 800px;
  //   margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  color: black;
`;

const Paragraph = styled.p`
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 16px;
  color: black;
`;

const LetterHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LetterFooter = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const useCollapsible = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => setIsOpen(!isOpen);

  return [isOpen, toggle];
};

const GrantApplicationLetter = ({ letterText }) => {
  const renderParagraphs = (text) => {
    return text
      .split("\n")
      .map((paragraph, index) => (
        <Paragraph key={index}>{paragraph}</Paragraph>
      ));
  };

  return (
    <LetterContainer>
      {/* <LetterHeader> */}
      {/* Dynamic header content can be inserted here */}
      {/* </LetterHeader> */}
      {renderParagraphs(letterText)}
      {/* <LetterFooter> */}
      {/* Dynamic footer content can be inserted here */}
      {/* </LetterFooter> */}
    </LetterContainer>
  );
};

function executeComponentString(componentString) {
  // Transpile the JSX string to JavaScript
  const { code } = transform(componentString, { presets: ["react"] });

  // Execute the transpiled code
  return eval(code);
}
// import { transform } from "babel-standalone";

const ScriptSection = ({ sectionData }) => {
  return (
    <Section>
      <ScriptHeader style={{ fontFamily: "Bungee" }}>
        {sectionData.header}
      </ScriptHeader>
      <ScriptLines>
        {sectionData.script_lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </ScriptLines>
      <InstructionList>
        {sectionData.instructions.map((instruction, idx) => (
          <Instruction key={idx}>{instruction}</Instruction>
        ))}
      </InstructionList>
    </Section>
  );
};

const ScriptDisplayComponent = ({ scriptData, isOpen }) => {
  return (
    isOpen && (
      <ScriptContainer>
        {scriptData.map((item, index) => (
          <ScriptSection key={index} sectionData={item} />
        ))}
      </ScriptContainer>
    )
  );
};

export const SoftwareEngineerComponent = ({ code }) => {
  const [isOpen, toggleOpen] = useCollapsible();

  return (
    <div>
      <StyledPromptHeaderButton onClick={toggleOpen}>
        Software Engineer's Task
      </StyledPromptHeaderButton>
      <br />
      <br />
      {isOpen && (
        <div>
          <div
            style={{
              color: "#696969",
              backgroundColor: "#faf3e0",
              width: "100%",
              padding: 20,
              wordBreak: "break-word",
              display: "flex",
              flexDirection: "column",
              borderRadius: 30,
            }}
          >
            <pre>
              <Editor
                value={code}
                // onValueChange={handleChange}
                highlight={(input) => highlight(input, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  width: "100%",
                  // border: "1px solid black",
                  borderRadius: 7,
                  whiteSpace: "pre-wrap", // Ensure text wraps within the container
                }}
                disabled
              />
            </pre>
          </div>
          <br />
          <br />
          <div style={{ border: "1px solid gray", padding: 24 }}>
            <LiveProvider code={code}>
              {/* {executeComponentString(cofounder)} */}
              <LivePreview />
              <br />
              <LiveError />
            </LiveProvider>
          </div>
        </div>
      )}
      {/* <pre>{code}</pre> */}
    </div>
  );
};

export const ContentCreatorComponent = ({ script }) => {
  const [isOpen, toggleOpen] = useCollapsible();

  return (
    <div>
      <StyledPromptHeaderButton onClick={toggleOpen}>
        Content Creator's Script
      </StyledPromptHeaderButton>
      {/* {script.map((section, index) => (
        <div key={index}>
          <h3>{section.header}</h3>
          {section.script_lines.map((line, lineIndex) => (
            <p key={lineIndex}>{line}</p>
          ))}
          <ul>
            {section.instructions.map((instruction, instIndex) => (
              <li key={instIndex}>{instruction}</li>
            ))}
          </ul>
        </div>
      ))}
    </div> */}
      <ScriptDisplayComponent scriptData={script} isOpen={isOpen} />
    </div>
  );
};
//let's write a scholarship to yale's computer science program
//let's apply to yale's computer science program

export const ExecutiveAssistantComponent = ({ schedule, business }) => {
  const [isOpen, toggleOpen] = useCollapsible();

  if (business) {
    return (
      <div>
        <StyledPromptHeaderButton onClick={toggleOpen}>
          Executive Assistant's Document
        </StyledPromptHeaderButton>
        <br />
        <br />

        {isOpen && (
          <LetterContainer>
            {business?.map((item, index) => {
              console.log("itemitemitem", item);
              return (
                <div key={index}>
                  <div
                    style={{ color: "white", wordBreak: "break-word" }}
                    //   dangerouslySetInnerHTML={{ __html: marked(item?.document) }}
                  />

                  <Markdown>{item?.document}</Markdown>
                  {/* {marked.parse(item?.document)} */}
                  {/* <p>{item.document}</p> */}
                </div>
              );
            })}
          </LetterContainer>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <StyledPromptHeaderButton onClick={toggleOpen}>
          Executive Assistant's Schedule
        </StyledPromptHeaderButton>
        <br />
        <br />

        {isOpen && (
          <LetterContainer>
            {schedule?.map((item, index) => (
              <div key={index}>
                <h3>{item.subject}</h3>
                <p>{item.details}</p>
                <p>Duration: {item.duration}</p>
                <p>Reason: {item.reason}</p>
              </div>
            ))}
          </LetterContainer>
        )}
      </div>
    );
  }
};

export const InvestorComponent = ({ insight }) => {
  const [isOpen, toggleOpen] = useCollapsible();
  return (
    <div>
      <StyledPromptHeaderButton onClick={toggleOpen}>
        Investor Insights
      </StyledPromptHeaderButton>
      <br />
      <br />
      {isOpen &&
        insight?.map((company, index) => (
          <div key={index}>
            {/* <h4>{company.company}</h4> */}
            {/* <p>Revenue: {company.revenue}</p>
        <p>Profit: {company.profit}</p>
        <p>Costs: {company.costs}</p> */}
            <div>{company.report}</div>
          </div>
        ))}
    </div>
  );
};
