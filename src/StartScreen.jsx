import React from 'react'

const StartScreen = ({numberOFQuestion,dispatch}) => {
  return (
    <div className='start'>
        <h2>Welcome to React quiz</h2>
        <h3>{numberOFQuestion} question test your React Mastery</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:'start'})}>Let's start</button>
    </div>
    
  )
}

export default StartScreen