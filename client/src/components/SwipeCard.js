import React, { useState, useMemo, useRef } from 'react'
// import background from './Courses.PNG'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import Info from './info'
import Auth from '../utils/auth';
import Typography from '@mui/material/Typography';
import { QUERY_OWNER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_owner, QUERY_CHAT } from '../utils/queries';
import { ADD_LIKE , CREATE_CHAT} from '../utils/mutations';
const db1 = [
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
  const userlo = Auth.getProfile().data._id
  const { loading, data } = useQuery(QUERY_OWNER);
  const db = data?.owner || [];
  const [addLike, { error }] = useMutation(ADD_LIKE);
  const [createChat, { errorchat }] = useMutation(CREATE_CHAT);
  const [ownerNum, setOwnerNum] = useState()
  const [iterNum, setIterNum] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()

console.log(ownerNum)
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
    setIterNum(iterNum+1);
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const canGoBack = currentIndex < db.length - 1
  const canSwipe = currentIndex >= 0
  console.log(ownerNum)
  // set last direction and decrease current index
  const swiped = async (direction, nameToDelete, index, last) => {
    setOwnerNum(last)
    console.log(nameToDelete)
    const {_id, password, username,} = nameToDelete
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    console.log(lastDirection)
    if(direction=="right"){
      try {
        const owner = await addLike({
          variables:{
          user1:userlo, user2:last
        }});
        let obj = nameToDelete.likes.find(like => like._id == userlo);
        console.log(obj);
       if(obj){
        const chat = await createChat({
          variables:{
          user1:userlo, user2:last
        }});
       }
        console.log(owner)
      } catch (err) {
        console.error(err);
      }
    }
   
    updateCurrentIndex(index - 1)
    console.log(lastDirection)
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
            key={owner._id}
            onSwipe={(dir) => swiped(dir, owner, index, owner._id)}
            onCardLeftScreen={() => outOfFrame(owner._id, index)}
          >
            <div
              style={{ backgroundImage: `url(./test_images/Jill.jpg)` }}
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