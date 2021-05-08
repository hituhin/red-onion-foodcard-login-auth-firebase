import "./App.css";
import logo from "./photo/logo2.png";

import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare, FaGithub, FaTwitter } from "react-icons/fa";

import firebaseConfig from "./firebase.config";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";

// if (!firebase.apps.length) {
//   firebase.initializeApp({ firebaseConfig });
// } else {
//   firebase.app();
// }

firebase.initializeApp(firebaseConfig);

function App() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const [user, setUser] = useState({
    isSignedUp: false,
    name: "",
    email: "",
    password: "",
  });
  const handleBlur = (event) => {
    let isFildValid = false;
    if (event.target.name === "email") {
      isFildValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isFildValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 8;
      const passwordHashNumber = /\d{1}/.test(event.target.value);
      isFildValid = isPasswordValid && passwordHashNumber;
      // console.log(isFildValid);
    }
    if (isFildValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      console.log(newUserInfo);
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = " ";
          newUserInfo.success = true;
          setUser(newUserInfo);
          // updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // let errorMessage = error.message;
        });
    }
  };
  // const updateUserName = (name) => {
  //   const user = firebase.auth().currentUser;

  //   user
  //     .updateProfile({
  //       displayName: name,
  //     })
  //     .then(function () {
  //       // Update successful.
  //       console.log("Name Update successfully");
  //     })
  //     .catch(function (error) {
  //       // An error happened.
  //       console.log(error);
  //     });
  // };

  const handleGoogleSignUp = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const handleFacebookSignUp = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  };

  return (
    <Container>
      <div className="App">
        <div>
          <img src={logo} alt="" className="logo" />
          <div>
            <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      onBlur={handleBlur}
                      name="name"
                      required
                    />
                    <br />
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      onBlur={handleBlur}
                      name="email"
                      required
                    />
                    <br />
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onBlur={handleBlur}
                      name="password"
                      required
                    />
                    <br />
                    <Form.Control
                      type="password"
                      placeholder="Re-Submit Password"
                    />
                    <br />
                    <Form.Control type="submit" value="Sign Up" />
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={6} md={4}></Col>
            </Row>
          </div>
        </div>
        <div>
          <div>
            <h1>OR</h1>
          </div>
          <button onClick={handleGoogleSignUp}>
            <FcGoogle size={50}></FcGoogle>
          </button>
          <button onClick={handleFacebookSignUp}>
            <FaFacebookSquare size={50}></FaFacebookSquare>
          </button>
          <button>
            <FaTwitter size={50}></FaTwitter>
          </button>
          <button>
            <FaGithub size={50}></FaGithub>
          </button>
        </div>
      </div>
    </Container>
  );
}

export default App;
