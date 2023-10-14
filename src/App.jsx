import { useEffect, useState } from "react";
import "./App.css";

function User({ userData }) {
  return (
    <ul>
      {userData.map((data) => {
        return (
          <li key={data.id}>{data.title}</li>
        )
        // const result = data.title;
        // return (
        //   <li key={data.id}>
        //     {result}
        //   </li>
        // )
      })}

    </ul>
  )
}

async function fetchUserData(userId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const data = await response.json()
  return data
}

export default function App() {
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const onInputChangeHandler = (e) => {
    setUserId(e.target.value);
  }

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserData(userId)
        .then((data) => setUserData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <div className="container">
      <img src="./src/post.png" height="300px" />
      <h1>Posts by user</h1>
      <input type={"number"} value={userId} onChange={onInputChangeHandler} />
      {loading && <p>Loading...</p>}

      {userData && <User userData={userData} />}
    </div>
  )
}