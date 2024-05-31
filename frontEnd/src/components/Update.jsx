import React, { useEffect, useState } from 'react'
import { json, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  // console.log(id)
  const [state, setState] = useState({
    name: "",
    email: "",
    age: ""
  })
  let { name, email, age } = state
  let handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }



  // let handleUpdate = async (e) => {
  //   e.preventDefault()
  //   let resp = await fetch(`http://localhost:5000/`, {
  //     method: "POST",
  //     body: JSON.stringify(state),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })

  //   const result = await resp.json()
  //   if (resp.ok) {
  //     // console.log(result)
  //     setState(result)
  //   }
  //   if (!resp.ok) {
  //     console.log(resp.error)
  //   }

  //   navigate("/read")
  // }

  let handleUpdate = async (e) => {
    e.preventDefault()
    let resp = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await resp.json()
    if (resp.ok) {
      console.log(result)
    }
    if (!resp.ok) {
      console.log(resp.error)
    }
    setState({
      name: "",
      email: "",
      age: ""
    })
    navigate("/read")
  }


  const getSingleUser = async () => {
    const resp = await fetch(`http://localhost:5000/${id}`)
    const result = await resp.json()

    if (resp.ok) {
      // console.log(result)
      setState({ ...result })
      // console.log(state)
    }
    if (!resp.ok) {
      console.log(resp.error)
    }

  }
  useEffect(() => { getSingleUser() }, [])
  return (
    <div>
      <form className='container' >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Name</label>
          <input type="text" name='name' value={name} onChange={handleChange} className="form-control" id="username" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name='email' value={email} className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
          <input type="number" name='age' value={age} className="form-control" id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleUpdate} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Update