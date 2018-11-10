import React from "react";
import { FoldingCube } from "better-react-spinkit";

export default function PreviewLoader() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
          flexDirection: "column"
        }}
      >
        <FoldingCube size={200} color="white" />
        <p
          style={{
            color: "white",
            marginTop: "50px",
            letterSpacing: "1.5px",
            fontFamily: "georgia",
            fontSize: "35px"
          }}
        >
          loading
        </p>
      </div>
    </>
  );
}
