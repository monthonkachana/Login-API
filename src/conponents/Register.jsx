import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Endpoint POST https://www.melivecode.com/api/users/create
function Register() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  //--------------
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Fech
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", " application/json ");

    var raw = JSON.stringify({
      fname: inputs.fname,
      lname: inputs.lname,
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      avatar: inputs.avatar
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
    fetch("https://www.melivecode.com/api/users/create" , requestOptions)
    .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            navigate("/");
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Fristname :
          <input
            type="text"
            name="fname"
            value={inputs.fname || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Lastname :
          <input
            type="text"
            name="lname"
            value={inputs.lname || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Username :
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password :
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email :
          <input
            type="text"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Avater :
          <input
            type="text"
            name="avater"
            value={inputs.avater || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
