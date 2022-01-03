import { Navbar, Container, Image, NavDropdown, Badge } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { OrderContext } from "../context/orderContext";
import { API } from "../config/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

import Login from "../components/Login";
import Register from "../components/Register";

import brand from "../images/Icon (1).png";
import defaultProfile from "../images/user.jpg";
import cart from "../images/Vector.png";
import user from "../images/user 2.png";
import out from "../images/logout 1.png";

export default function NavbarUser() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);
  const registerClose = () => setShowRegister(false);
  const registerShow = () => setShowRegister(true);

  const [showLogin, setShowLogin] = useState(false);
  const loginClose = () => setShowLogin(false);
  const loginShow = () => setShowLogin(true);

  const { orderMenus } = useContext(OrderContext);

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const [profile, setProfile] = useState({});

  // Fetching profile data from database
  const getProfile = async () => {
    try {
      const response = await API.get("/user");
      // Store product data to useState variabel
      setProfile(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    // status();
  }, []);

  return (
    <>
      <Navbar className="nav">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <Image src={brand} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="default justify-content-end">
            {state.user.role === "user" ? (
              <Navbar.Collapse className="default justify-content-end">
                <Link to="/add-cart">
                  <div className="card-cart">
                    <div className="card-img">
                      <Image src={cart}></Image>
                    </div>

                    <div className="wrap-cart">
                      <Badge className="cart bg-danger">
                        {orderMenus.subtotal}
                      </Badge>
                    </div>
                  </div>
                </Link>

                <NavDropdown
                  className="dropdown"
                  title={
                    <Image
                      className="poto"
                      src={
                        profile.image === "http://localhost:5000/uploads/null"
                          ? defaultProfile
                          : profile.image
                      }
                    ></Image>
                  }
                  id="nav-dropdown"
                >
                  <NavDropdown.Item className="textDropdown" eventKey="4.1">
                    <Link to="/profile">
                      <Image className="img" src={user}></Image>
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="textDropdown"
                    eventKey="4.4"
                    onClick={logout}
                  >
                    <Image className="img" src={out}></Image>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            ) : (
              <Navbar.Text>
                <button className="btnLogin" onClick={loginShow}>
                  Login
                </button>
                <button className="btnRegister" onClick={registerShow}>
                  Register
                </button>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Register showRegister={showRegister} registerClose={registerClose} />
      <Login showLogin={showLogin} loginClose={loginClose} />
    </>
  );
}
