import React, { useState, useMemo, useRef } from 'react'
// import background from './Courses.PNG'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import Info from './info'

const db = [
  {
    name: 'Bill',
    url: './test_images/Bill.jpg'
  },
  {
    name: 'Torrence',
    url: './test_images/Torrence.jpg'
  },
  {
    name: 'Will',
    url: './test_images/Will.jpg'
  },
  {
    name: 'Ray',
    url: './test_images/Ray.jpg'
  },
  {
    name: 'Jill',
    url: './test_images/Jill.jpg'
  }
]
function SwipeCard () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const canGoBack = currentIndex < db.length - 1
  const canSwipe = currentIndex >= 0
  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }
  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  // useState to hold visibility
  const [isVisible, setIsVisible] = useState(true);

  // function to change visibility
  const showInfo = event => {
    setIsVisible(current => !current);
  };

  
  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>Meet New PlayPals!</h1>
      <div className='cardContainer'>
        {db.map((owner, index) => (
          <div>
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={owner.name}
            onSwipe={(dir) => swiped(dir, owner.name, index)}
            onCardLeftScreen={() => outOfFrame(owner.name, index)}
          >
            <div
              style={{ backgroundImage: `url(${owner.url})` }}
              className='card'
            >
              <h3 className="name">{owner.name}</h3>
            </div>
          </TinderCard>
            </div>
        ))}
        <div className={`ownerInfo ${isVisible ? 'hidden' : 'visible'}`}>
          <Info />
        </div>
      </div>
<br></br>
      {/* Button to show current user's info */}
      <button className='showOwnerInfo btn btn-info' onClick={showInfo}>
        <h3>ℹ️</h3>
      </button> 

      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#C3C4D3' }} onClick={() => swipe('left')}>❌ Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#C3C4D3' }} onClick={() => goBack()}>Undo!</button>
        <button style={{ backgroundColor: !canSwipe && '#C3C4D3' }} onClick={() => swipe('right')}>✅ Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe Left to pass! Swipe right to Match!
        </h2>
      )}
    </div>
  )
}
export default SwipeCard