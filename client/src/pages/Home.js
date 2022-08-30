import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_OWNER } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_OWNER, {
    fetchPolicy: "no-cache"
  });

  const ownerList = data?.owner || [];

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to Tech Matchup!</h1>
      </div>
      <div className="card-body m-5">
        <h2>Here is a list of OWNER you can vote on:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {ownerList.map((owner) => {
              console.log(ownerList)
              return (
                <li key={owner._id}>
                  <div>{owner.name}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-footer text-center m-3">
        <h2>Ready to create a new matchup?</h2>
        <Link to="/matchup">
          <button className="btn btn-lg btn-danger">Create Matchup!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
