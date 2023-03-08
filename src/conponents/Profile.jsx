import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
//Endoiubt POST https://www.melivecode.com/api/login Body > raw > JSON {"username": "karn.yong@melivecode.com","password": "melivecode","expiresIn": 60000} login get accessToken : ??
//Endpoint GET https://www.melivecode.com/api/auth/user chack token authorization > bearer Token > Token ใส่ Tokenที่เข้าlogin ผ่าน endpoint POST
function Profile() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  //Fetch Endpoint Get
  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearerเว้น1วรรค " + token);
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.status === "forbidden") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          }).then((value) => {
            navigate("/login");
          });
        }

        console.log(result);
      })

      .catch((error) => console.log("error", error));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //--------------------

  return (
    <div>
      <div><span>ชื่อ :</span> {user.fname}</div>
      <div><span>นามสกุล :</span>  {user.lname}</div>
      {/* <div> {user.username}</div> */}
      <div><span>email :</span> {user.email}</div>
      <div>
        <img src={user.avatar} alt={user.id} width={100} />
      </div>
      <div>
        <input type="button" value="logout" onClick={logout} />
      </div>
    </div>
  );
}
export default Profile;
