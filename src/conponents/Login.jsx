import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Login() {
  //เปลื่ยน { ค่า }หน้า
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const MySwal = withReactContent(Swal);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(inputs);

    //--- postman post https://www.melivecode.com/api/login
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
      expiresIn: 2000000, //20 min
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/login", requestOptions)
      //.then((response) => response.json or text ()) อย่าลืมเปลื่ยน เป็นไฟล์ที่ต้องส่งไป
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        //example "username": "karn.yong@melivecode.com","password": "melivecode",

        if (result.status === "ok") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            // keep token
            localStorage.setItem("token", result.accessToken);
            navigate("/profile");
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          });
        }
      })

      .catch((error) => console.log("error", error));

    //---
    console.log(inputs);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
