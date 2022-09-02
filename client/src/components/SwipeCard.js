import React, { useState } from 'react'
import './App.css'
import Switch from 'react-ios-switch'
import Advanced from '../examples/Advanced'
import Simple from '../examples/Simple'

function App () {
  const [showAdvanced, setShowOwnerAdvanced] = useState(true)

  return (
    <div className='app'>
      {showAdvanced ? <Advanced/> : <Simple/>}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowOwnerAdvanced} />
      </div>
    </div>
  )
}

export default App
