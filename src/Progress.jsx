import React from "react";

const Progress = ({ numberOFQuestion, index,points,MaxPoints }) => {
  return (
    <header className="progress">
      <progress max={numberOFQuestion} value={index}  />

      <p>
        Questions <strong>{index + 1}</strong>/{numberOFQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{MaxPoints}
      </p>
    </header>
  );
};

export default Progress;
