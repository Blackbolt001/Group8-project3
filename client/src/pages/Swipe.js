import React from 'react';
import SwipeCard from '../components/SwipeCard'
import cn from "classnames";
import { ReactComponent as Hand } from "./hand.svg";

import "./styles.scss";

const LikeButton = () => {
    const [liked, setLiked] = useState(null);


const Swipe = () => {

    return(
        
        <div>
             <SwipeCard/>
        </div>
    )
};

return (
    <button
      onClick={() => setLiked(!liked)}
      onAnimationEnd={() => setClicked(false)}
      className={cn("like-button-wrapper", {
        liked,
      })}
    >
      <div className="like-button">
        <Hand />
        <span>Like</span>
      </div>
    </button>
  );
};

export default Swipe;