import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router";
import Error from "../Error/Error";

export default function CheckShop() {
  const [shop, setShop] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const checkshop = () => {
    const data = {
      shop: shop,
      username: Cookies.get("username"),
    };
    axios.post("http://127.0.0.1:3001/checkshop", data).then((response) => {
      if (response.data === "SUCCESS") {
        setRedirect(true);
        console.log("ok");
      }
      if (response.data === "UNSUCCESS") {
        console.log("not ok");
        setInvalid(true);
      }
    });
  };
  return (
    <>
      {redirect ? <Navigate to="/shop" /> : ""}
      <Navbar />
      <div className="container shop-content">
        <div className="row">
          <div className="col-md-12">
            <h1>Enter Shop Name</h1>
            <br></br>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input
              type="search"
              id="create-shop-search"
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            />
            <a
              className="btn btn-light action-button default-button"
              role="button"
              href="#"
              onClick={checkshop}
            >
              Check Availability
            </a>
          </div>
        </div>
        {invalid ? <Error message="Shop Name Unavailable" /> : ""}
      </div>
    </>
  );
}
