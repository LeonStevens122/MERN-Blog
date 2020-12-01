import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createBrowserHistory } from 'history';
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Input from "../form/Input";
import { GithubLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import 'font-awesome/css/font-awesome.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import {
   Card,
   Button,
   Form,
   Container,
   Row,
   Col,
   Alert
} from "react-bootstrap";
const keys = require("./keys");

const cors = require('cors')

const history = createBrowserHistory();
const location = history.location;

const passport = require("passport");

const Login = ({ message, loading, user, onChange, onBlur, onSubmit }) => {
    const { email, password, errors } = user;

    


    console.log('History :   ', location)

    //const googleClick = () => {
       
    //    axios.get('http://localhost:5000/auth/google')
    //        .then(response => console.log(response))
    //}
    //const gitClick = () => {
    //    axios.get('http://localhost:5000/auth/github')
    //        .then(response => console.log(response))
    //}

    const handleGithub = (e) => {
        // Prevents page reload
        e.preventDefault();

        // Initializes OAuth.io with API key
        // Sign-up an account to get one
        window.OAuth.initialize('Jc329NfJf3YGgubkkv8KsXJuAOs');

        // Popup facebook and ask for authorization
        window.OAuth.popup('github').then((github) => {
            console.log('github:', github);
            // Prompts 'welcome' message with User's name on successful login
            // #me() is a convenient method to retrieve user data without requiring you
            // to know which OAuth provider url to call
            github.me().then((data) => {
                console.log("data: ", data);
                console.log('history afet login', history);
                history.push('/blog');

            });

            // You can also call Github's API using #.get()
            github.get('/user').then(data => {
                console.log('self data:', data);
                console.log('history afet login', history);
                history.push('/blog');
            });
        });
    }
    const handleGoogle = (e) => {
        // Prevents page reload
        e.preventDefault();

        // Initializes OAuth.io with API key
        // Sign-up an account to get one
        window.OAuth.initialize('Jc329NfJf3YGgubkkv8KsXJuAOs');

        // Popup facebook and ask for authorization
        window.OAuth.popup('google').then((google) => {
            console.log('google:', google);
            // Prompts 'welcome' message with User's name on successful login
            // #me() is a convenient method to retrieve user data without requiring you
            // to know which OAuth provider url to call
            google.me().then((data) => {
                console.log("data: ", data);
                console.log('history afet login', history);
                history.push('/blog');

            });

            // You can also call Github's API using #.get()
            google.get('/user').then(data => {
                console.log('self data:', data);
                console.log('history afet login', history);
                history.push('/blog');
            });
        });
    }

    useEffect(() => {
        const oauthScript = document.createElement("script");
        oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

        document.body.appendChild(oauthScript);
    });

   return (
      <Container>
         <Row className="Background">
            <Col className="mx-auto" sm={11} md={7} lg={5}>
               <Card className="my-4">
                  <Form
                           noValidate
                           onSubmit={onSubmit}
                     className="p-sm-3 p-xs-1"
                  >
                     <Card.Body>
                        <Card.Title
                           as="h3"
                           className="text-center theme-color mb-4 mt-2"
                        >
                           Login
                        </Card.Title>
                        {message.length > 0 && (
                           <Alert variant="success">{message}</Alert>
                        )}
                        <Input
                           name="email"
                           type="email"
                           placeholder="Enter Email"
                           value={email}
                           onChange={onChange}
                           onBlur={onBlur}
                           text={{
                              module: "login",
                              label: "Email",
                              error: errors.email
                           }}
                        />
                        <Input
                           name="password"
                           type="password"
                           placeholder="Enter Password"
                           value={password}
                           onBlur={onBlur}
                           onChange={onChange}
                           text={{
                              module: "login",
                              label: "Password",
                              error: errors.password
                           }}
                        />
                        <Button
                                   variant="info"
                                   type="submit"
                                   className="mt-3"
                                   disabled={loading}
                                   
                        >
                           Submit
                        </Button>

                        <Card.Text className="mt-2">
                           Don't have an account?{" "}
                           <Link to={"/signup"}>SignUp</Link>
                               </Card.Text>
                          
                     </Card.Body>
                       </Form>

                      
                       <a onClick={handleGithub} className="btn btn-social btn-github">
                           <i className="fa fa-github"></i> Sign in with Github
                       </a>
                       <a onClick={handleGoogle} className="btn btn-social btn-github">
                           <i className="fa fa-google"></i> Sign in with Google
                       </a>
                      
                     

               </Card>
            </Col>
         </Row>
      </Container>
   );
};

Login.propTypes = {
   onSubmit: PropTypes.func.isRequired,
   onChange: PropTypes.func.isRequired,
   onBlur: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   message: PropTypes.string.isRequired,
   loading: PropTypes.bool.isRequired
};

export default Login;
