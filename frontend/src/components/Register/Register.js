import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Success from "../Success/Success";
import Error from "../Error/Error";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [redirect, setRedirect] = useState(Cookies.get("auth"));
  const [isregister, setIsRegister] = useState(false);
  const [submit, setSubmit] = useState(false);

  const register = () => {
    const data = {
      username: username,
      password: password,
      email: email,
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://127.0.0.1:3001/register", data).then((response) => {
      setSubmit(true);
      if (response.data === "SUCCESS") {
        console.log("Status Code : ", response.status);
        setIsRegister(true);
      }
      if (response.data === "UNSUCCESS") {
        setInvalid(true);
        console.log(response.data);
      }
    });
  };

  return (
    <>
      {isregister ? <Navigate to={"/signin"} /> : ""}
      {redirect ? <Navigate to={"/"} /> : ""}
      <Navbar loggedin={false} />
      <form className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Sign Up Here</h1><br></br>
        <label htmlFor="inputUsername" className="sr-only">
          Username
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Username"
          name="username"
          value={username}
          required=""
          autoFocus=""
          onChange={(e) => setUsername(e.target.value)}
        /><br></br>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="email"
          name="email"
          value={email}
          required=""
          autoFocus=""
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          required=""
          onChange={(e) => setPassword(e.target.value)}
        /><br></br>
        <label htmlFor="inputConfirmPassword" className="sr-only">
          Confirm Password
        </label>
        <input
          type="password"
          id="inputConfirmPassword"
          name="confirmpassword"
          className="form-control"
          placeholder="Confirm Password"
          value={confirmPassword}
          required=""
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br></br>

        <a
          className="btn btn-lg btn-block default-button mt-2"
          type="submit"
          onClick={register}

          
        >
          Register
        </a><br></br>
        {password === confirmPassword ? (
          password !== "" && confirmPassword !== "" && submit === false ? (
            <Success message="Password matches" />
          ) : (
            ""
          )
        ) : (
          <Error message="Password doesn't matches" />
        )}

        {invalid ? <Error message="Username already exists" /> : ""}
      </form>
    </>
  );
}
