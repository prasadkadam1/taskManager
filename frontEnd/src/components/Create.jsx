import React, { useState } from 'react'
import { json, useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    password: ""
  })
  let { name, email, age, password } = state
  let handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  let handleSubmit = async (e) => {
    e.preventDefault()
    let resp = await fetch(`http://localhost:5000/`, {
      method: "POST",
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
      age: "",
      password: ""
    })
    navigate("/read")
  }
  return (
    <div>
      <form className='container' >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Name</label>
          <input type="text" name='name' value={name} onChange={handleChange} className="form-control" id="username" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">password</label>
          <input type="text" name='password' value={password} onChange={handleChange} className="form-control" id="username" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name='email' value={email} className="form-control" id="exampleInputEmail1" onChange={handleChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
          <input type="number" name='age' value={age} className="form-control" id="exampleInputPassword1" onChange={handleChange} />
        </div>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Create