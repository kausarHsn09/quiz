import React, { useEffect, useReducer } from "react";
import "./index.css";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
// "loading", "error", "ready", "active" , "finished"
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case 'nextQuestion':
      const totalQuestion = state.questions.length-1
      return{
        ...state,
        index:totalQuestion === state.index ? 0 : state.index+1 ,
        answer:null
      }
    case 'reset':
      return{
        ...state,
        index: 0,
        answer: null,
        points: 0,
      }
    default:
      throw new Error("jani Na");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { questions, status, index, answer, points } = state;
  const numberOFQuestion = questions.length;
  
  const arrPoint =questions.map((ques)=> ques.points)
  const MaxPoints = arrPoint.reduce((curr,index)=> curr+index,0)

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      
      <Main>
      <Progress 
      numberOFQuestion={numberOFQuestion}
      index={index}
      points={points}
      MaxPoints={MaxPoints}
      />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOFQuestion={numberOFQuestion}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
          <Question
            questions={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <NextButton
           questions={questions}
           index={index}
           dispatch={dispatch}
           answer={answer}/>
          </>
        )}
      </Main>
     
    </div>
  );
};

export default App;
