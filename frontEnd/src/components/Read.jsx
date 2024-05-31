import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Read = () => {
  let [users, setUsers] = useState([])

  let fetching = async () => {
    let resp = await fetch(`http://localhost:5000/`)
    let data = await resp.json()
    // console.log(data)
    setUsers(data)
  }
  useEffect(() => {
    fetching()
  }, [])
  let handleDelete = async (val) => {
    console.log(val._id)
    const resp = await fetch(`http://localhost:5000/${val._id}`, {
      method: "DELETE"
    })
    const respo = await fetch(`http://localhost:5000/`)
    let data = await respo.json()
    console.log(data)
    setUsers(data)
  }
  return (
    <div className='d-flex m-4 flex-wrap'>
      {users.length > 0 && users.map((val, i) => {
        return (
          <div className="card m-3" style={{ width: "18rem" }} key={i}>
            <div className="card-body">
              <h5 className="card-title">Name : {val.name}</h5>
              <p className="card-text">Email : {val.email}</p>
              <p className="card-text">Age : {val.age}</p>
              <Link to={`/read/${val._id}`} className="btn btn-primary mx-3">Update</Link>
              <button className="btn btn-primary mx-3" onClick={() => { handleDelete(val) }}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Read