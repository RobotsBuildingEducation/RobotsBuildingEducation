//dependencies
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Button } from "react-bootstrap";

//local files
import {
  createDecisionMap,
  generateProblem,
  requestFeedback,
  TreeNode,
  SelectedPath,
  CopyableMarkdown,
  getRandomTree,
} from "./Leetmigo.compute";
import { colorPalette, responsiveBox } from "./Leetmigo.styles";
import { useChatStream } from "../../../common/ui/Elements/Stream/useChatCompletion";
import { RoxanaLoadingAnimation } from "../../../App.compute";

/**
 * RenderLeetmigo component renders the main application.
 * @returns {JSX.Element} The rendered component.
 */
export const RenderLeetmigo = () => {
  let mapImage = createDecisionMap();

  const [currentNode, setCurrentNode] = useState(mapImage);
  const [selectedPath, setSelectedPath] = useState([]);
  const [contentStack, setContentStack] = useState([]);
  const [codeStack, setCodeStack] = useState([]);
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [isGeneratingProblem, setIsGeneratingProblem] = useState(false);
  const [generationError, setGenerationError] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [feedbackResult, setFeedbackResult] = useState(null);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  const {
    messages: problemMessages,
    loading: problemLoading,
    submitPrompt: submitProblemPrompt,
    resetMessages: resetProblemMessages,
  } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
  });
  const {
    messages: feedbackMessages,
    loading: feedbackLoading,
    submitPrompt: submitFeedbackPrompt,
    resetMessages: resetFeedbackMessages,
  } = useChatStream({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    model: "gpt-4o",
    temperature: 0.9,
  });

  /**
   * Handles the selection of a node from the tree.
   * @param {string} childKey - The key of the selected child node.
   */
  const handleSelect = (childKey) => {
    const newNode = currentNode.children[childKey];
    setCurrentNode(newNode);
    setSelectedPath((prev) => [...prev, childKey]);
    setContentStack((prev) => [
      ...prev,
      newNode?.children?.content?.content || "",
    ]);
    setCodeStack((prev) => [...prev, newNode?.children?.code?.content || ""]);
  };

  /**
   * Handles the undo action to go back to the previous node in the selected path.
   */
  const handleUndo = () => {
    if (selectedPath.length > 0) {
      const newPath = [...selectedPath];
      newPath.pop();
      setSelectedPath(newPath);

      const newContentStack = [...contentStack];
      newContentStack.pop();
      setContentStack(newContentStack);

      const newCodeStack = [...codeStack];
      newCodeStack.pop();
      setCodeStack(newCodeStack);

      let node = mapImage;
      newPath.forEach((key) => {
        node = node.children[key];
      });
      setCurrentNode(node);
    }
  };

  /**
   * Handles the reset action to reset the selected path, content stack, and code stack.
   */
  const handleReset = () => {
    setCurrentNode(mapImage);
    setSelectedPath([]);
    setContentStack([]);
    setCodeStack([]);
  };

  /**
   * Handles the generation of a new problem by calling the generateProblem function.
   */
  const handleGenerateProblem = async () => {
    setGeneratedProblem("");

    setGenerationError(false);
    setIsGeneratingProblem(true);
    resetProblemMessages();
    let problemSet = getRandomTree();

    let prompt = `You are generating an easy to medium level technical coding interview question so that users can prepare for technical interviews using a decision framework. Do not provide the answer. In minimalist markdown (i.e dont make unnecesasry headers called "Title"), where all headers are kept the same small size with ####, provide a title, a description, input and output examples, constraints and a hint using the following decision framework and select a genuinely random topic based on the trees here.: ${JSON.stringify(
      problemSet
    )}
    
  
    However, despite being minimalist, make sure to provide clear, effective and helpful communication the example and constraints.
    `;

    try {
      // const result = await generateProblem();
      await submitProblemPrompt([{ role: "user", content: prompt }]);
      // console.log("result", result);
      // setGeneratedProblem(result);
    } catch (error) {
      setGenerationError(true);
    }
  };

  /**
   * Handles the submission of feedback by calling the requestFeedback function.
   */
  const handleFeedbackSubmit = async () => {
    setFeedbackResult("");
    setGenerationError(false);
    setIsGeneratingFeedback(true);
    resetFeedbackMessages();

    let prompt = `You are providing constructive feedback for a student's coding decisions and code. The individual has followed a decision path and written some code. Provide detailed feedback while considering the decision path and the code provided. Here are 5 things to consider to help you understand the nature of the data you're workign with:

    1. Problem JSON: ${JSON.stringify(generatedProblem)}
    
    2. Decision Path JSON: ${JSON.stringify(generatedProblem)}
    
    3. What the user submitted for feedback (IMPORTANT INSTRUCTION: analyze this closely.): ${feedback}
    
    4. Content JSON (IMPORTANT INSTRUCTION: This is not the code the user has written, this is UI content they've created to inform you of the general strategy they're working with to make choices. Do not analyze the code found here under any circumstances): ${JSON.stringify(
      contentStack
    )}
    
    5. Code and solution JSON (IMPORTANT INSTRUCTION: This is not the code the user has written, this is UI content they've created to inform you of the general strategy they're working with to make choices. Do not analyze the code found here under any circumstances): ${JSON.stringify(
      codeStack
    )}
    
    
    Provide your feedback in minimalist markdown, where all headers are kept the same small size with ####,
    
    Additionally, in your feedback don't forget to include what the user has done well too. Fit that in naturally. However, do not confuse that with tolerating or accepting the wrong answer or direction. If the person is wrong, redirect them in the right way and make it clear that the process was incorrect.
    `;

    try {
      await submitFeedbackPrompt([{ role: "user", content: prompt }]);
      // setFeedbackResult(result);
    } catch (error) {
      setGenerationError(true);
    }
  };

  let problemMessagesRef = useRef();
  let problemMessagesTopRef = useRef();
  useEffect(() => {
    if (problemMessages?.length > 0) {
      const lastMessage = problemMessages[problemMessages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          // const result = JSON.parse(lastMessage.content);
          setGeneratedProblem(lastMessage.content);
          setIsGeneratingProblem(false);
        } catch (error) {
          console.error(
            "Error parsing JSON content:",
            lastMessage.content,
            error
          );
          setGeneratedProblem(null);
        }
      }
    }
    if (problemMessagesRef.current) {
      problemMessagesRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [problemMessages]);

  useEffect(() => {
    if (
      !isGeneratingProblem &&
      problemMessages.length > 0 &&
      problemMessagesTopRef.current
    ) {
      problemMessagesTopRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isGeneratingProblem, problemMessages]);

  let feedbackMessagesRef = useRef();
  let feedbackMessagesTopRef = useRef();

  useEffect(() => {
    if (feedbackMessages?.length > 0) {
      const lastMessage = feedbackMessages[feedbackMessages.length - 1];
      if (!lastMessage.meta.loading) {
        try {
          // const result = JSON.parse(lastMessage.content);
          setFeedbackResult(lastMessage.content);
          setIsGeneratingFeedback(false);
        } catch (error) {
          console.error(
            "Error parsing JSON content:",
            lastMessage.content,
            error
          );
          setFeedbackResult(null);
        }
      }
    }

    if (feedbackMessagesRef.current) {
      feedbackMessagesRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [feedbackMessages]);

  // Scroll to the top of the messages container when loading is complete
  useEffect(() => {
    if (
      !isGeneratingFeedback &&
      feedbackMessages.length > 0 &&
      feedbackMessagesTopRef.current
    ) {
      feedbackMessagesTopRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [isGeneratingFeedback, feedbackMessages]);

  return (
    <div style={responsiveBox}>
      <div style={{ backgroundColor: colorPalette.chill, padding: 24 }}>
        Generate a problem and then use the following decision paths to learn
        common algorithm solutions and strategies. Submit your solution or
        request feedback on your progress to improve your interview skills.
      </div>
      <br />
      <br />
      <div ref={problemMessagesTopRef} />

      <Button
        variant="dark"
        onMouseDown={handleGenerateProblem}
        disabled={isGeneratingProblem}
      >
        Create algorithm problem
      </Button>
      <br />
      <br />

      {isGeneratingProblem ? (
        <div style={{ maxWidth: 700, width: "100%" }}>
          <RoxanaLoadingAnimation header={"creating"} />{" "}
          <div style={{ whiteSpace: "pre-wrap" }}>
            {problemMessages
              .map((msg, index) =>
                index === 0 ||
                index % 2 === 0 ||
                index !== problemMessages.length - 1 ? null : (
                  <Markdown key={index}>{msg.content}</Markdown>
                )
              )
              .reverse()}{" "}
            <div ref={problemMessagesRef} />
          </div>
        </div>
      ) : null}

      {generatedProblem ? (
        <>
          <div
            style={{
              ...responsiveBox,
              backgroundColor: "white",
              color: "black",
              borderRadius: 50,
              padding: 50,
            }}
          >
            <CopyableMarkdown content={generatedProblem} />
          </div>
          <br />
          <br />
          Select a path and make decisions to choose a solution for your
          algorithm problem.
          <TreeNode node={currentNode} onSelect={handleSelect} />
          {selectedPath.length === 0 ? null : (
            <>
              <SelectedPath
                path={selectedPath}
                contentStack={contentStack}
                codeStack={codeStack}
                onUndo={handleUndo}
                onReset={handleReset}
              />
            </>
          )}
          <br />
          <br />
          <div ref={feedbackMessagesTopRef} />
          <div>
            <label>Get feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter or explain your solution and request feedback"
              rows="8"
              style={{ width: "100%", padding: "10px" }}
            ></textarea>
            <br />
            <br />
            <Button
              variant="dark"
              onMouseDown={handleFeedbackSubmit}
              disabled={isGeneratingFeedback}
            >
              Submit Feedback Request
            </Button>
            <br />
            <br />
            {isGeneratingFeedback ? (
              <div style={{ maxWidth: 700, width: "100%" }}>
                <RoxanaLoadingAnimation header={"creating"} />{" "}
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {feedbackMessages
                    .map((msg, index) =>
                      index === 0 ||
                      index % 2 === 0 ||
                      index !== feedbackMessages.length - 1 ? null : (
                        <Markdown key={index}>{msg.content}</Markdown>
                      )
                    )
                    .reverse()}
                  <div ref={feedbackMessagesRef} />
                </div>
              </div>
            ) : null}
          </div>
          {feedbackResult && (
            <div
              style={{
                ...responsiveBox,
                backgroundColor: "white",
                color: "black",
                borderRadius: 50,
                padding: 50,
              }}
            >
              <Markdown>{feedbackResult}</Markdown>
            </div>
          )}
        </>
      ) : null}

      {generationError && <p>Error generating problem. Please try again.</p>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
