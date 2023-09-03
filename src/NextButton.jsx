import React from 'react'

const NextButton = ({dispatch,answer,questions,index}) => {
  const totalQuestion = questions.length-1
  

  return (
    <>
    {answer != null && <button className='btn btn-ui' onClick={()=>dispatch({type:`${totalQuestion === index ? 'reset' : 'nextQuestion'}` })}>Next</button> }
    </>
  )
}

export default NextButton