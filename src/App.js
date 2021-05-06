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

  const [user, setUser] = useState({
    isSignedUp: false,
    name: "",
    email: "",
    password: "",
  });
  const handleBlur = (event) => {
    let isFildValid = true;
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
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          console.log(error.message);
          // ..
        });
    }
  };

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
          <button>
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
