import React, { useEffect, useRef } from "react";
import { RoxanaLoadingAnimation } from "../../../../../../App.compute";

export const Chat = ({ conversation, gradeResult }) => {
  const requestStyle = {
    textAlign: "left",
    backgroundColor: "#4003ba",
    padding: "20px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "0px",
    marginBottom: "10px",
    maxWidth: "70%",

    alignSelf: "flex-end",
  };

  const responseStyle = {
    textAlign: "left",
    backgroundColor: "#2C2C2E",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "70%",
    alignSelf: "flex-start",
    borderBottomLeftRadius: "0px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomRightRadius: "50px",
  };
  const loadingStyle = {
    textAlign: "left",
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    maxWidth: "70%",
    alignSelf: "flex-start",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
    borderBottomLeftRadius: "50px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "15px",
    backgroundColor: "black",
    overflowY: "scroll",
    height: 300,
  };
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  if (conversation) {
    return (
      <div style={containerStyle}>
        {conversation?.map((item, index) => (
          <React.Fragment key={index}>
            {item?.request ? (
              <div style={requestStyle}>
                {item.request ? item.request : null}
              </div>
            ) : null}

            <div
              style={item.response.length > 0 ? responseStyle : loadingStyle}
            >
              {item.response.length > 0 ? (
                item.response
              ) : (
                <RoxanaLoadingAnimation />
              )}
            </div>
          </React.Fragment>
        ))}
        <div ref={bottomRef}></div>
      </div>
    );
  } else {
    return null;
  }
};
