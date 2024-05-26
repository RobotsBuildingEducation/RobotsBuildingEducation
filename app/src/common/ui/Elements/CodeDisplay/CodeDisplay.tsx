import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

export let CodeDisplay = ({ code }) => {
  return (
    <div
      style={{
        color: "#696969",
        backgroundColor: "#faf3e0",
        width: "100%",
        padding: 20,
        // wordBreak: "break-word",
        display: "flex",
        flexDirection: "column",
        borderRadius: 15,
        boxShadow: "4px 4px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <pre>
        <Editor
          value={code}
          highlight={(input) => highlight(input, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "100%",

            borderRadius: 7,
          }}
          disabled
        />
      </pre>
    </div>
  );
};
