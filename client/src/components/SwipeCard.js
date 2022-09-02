import React, { useState } from 'react'
import './App.css'
import Switch from 'react-ios-switch'
import petExamples from '../examples/petExamples'
import ownerExamples from '../examples/ownerExamples'

function SwipeCard () {
const [showOwnerExamples, setShowOwnerExamples] = useState(true)

  return (
    <div className='SwipeCard'>
      {showOwnerExamples ? <ownerExamples /> : <petExamples />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showOwnerExamples} onChange={setShowOwnerExamples} />
      </div>
    </div>
  )
}

export default SwipeCard
