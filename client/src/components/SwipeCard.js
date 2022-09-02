import React, { useState } from 'react'
import './App.css'
import Switch from 'react-ios-switch'
import Advanced from '../examples/Advanced'
import Simple from '../examples/Simple'
import TinderCard from 'react-tinder-card'


function App () {
  const [showAdvanced, setShowOwnerAdvanced] = useState(true)
const db = [
  {
    name: 'Bill',
    url: './test_images/Bill.jpg',
    username: 'BillyBob',
    interests: 'Bowling and coffee',
    age: '54',
    pet: {
      pet_name: "Scrappy Doo",
      breed: "Mutt",
      age: "1",
      nature: "Hyper",
      gender: "Male"
    }
  },
  {
    name: 'Torrence',
    url: './test_images/Torrence.jpg',
    username: 'Torrence&Chaz',
    age: '23',
    interests: 'Latest fashion',
    pet: {
      pet_name: "Chaz",
      breed: "Buldog",
      age: "3",
      nature: "Lazy",
      gender: "Male"
    }
  },
  {
    name: 'Will',
    url: './test_images/Will.jpg',
    username: 'I am Legend',
    age: '38',
    interests: 'Mannequins',
    pet: {
      pet_name: "Sam",
      breed: "German Shepherd",
      age: "4",
      nature: "Well Trained",
      gender: "Female"
    }
  },
  {
    name: 'Ray',
    url: './test_images/Ray.jpg',
    username: 'MantaRay',
    interests: 'House Decoration',
    age: '32',
    pet: {
      pet_name: "Marshmallow",
      breed: "Husky",
      age: "4",
      nature: "Sleepy",
      gender: "Female"
    }
  },
  {
    name: 'Jill',
    url: './test_images/Jill.jpg',
    username: 'Jill on a Hill',
    interests: 'Gardening!',
    age: '32',
    pet: {
      pet_name: "Daisy",
      breed: "Labrador",
      age: "5",
      nature: "Calm",
      gender: "Female"
    }
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

  return (
    <div className='app'>
      {showAdvanced ? <Advanced/> : <Simple/>}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show advanced example</p> <Switch checked={showAdvanced} onChange={setShowOwnerAdvanced} />
   </div>
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
          <TinderCard>
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
            <div className={`ownerInfo ${isVisible ? 'hidden' : 'visible'}`}>
              <div>
                <ul>
                    Pet Info
                    <li>Pet's Name: {owner.pet.pet_name}</li>
                    <li>Pet's Breed: {owner.pet.breed}</li>
                    <li>Pet's Age: {owner.pet.age}</li>
                    <li>Pet's Nature: {owner.pet.nature}</li>
                    <li>Pet's Gender: {owner.pet.gender}</li>
                </ul>
                <ul>
                    Owner Info
                    <li>Username: {owner.name}</li>
                    <li>Age: {owner.age}</li>
                    <li>Interests: {owner.interests}</li>
                </ul>
              </div>
            </div>
              <h3 className="name">{owner.name}</h3>
            </div>
          </TinderCard>
            </div>
        ))}

      </div>
    </div>
  )
}

export default App
