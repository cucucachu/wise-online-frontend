import React, {Component} from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";

import loginIcon from '../Assets/images/login-icon.png';

class StudentLogin extends Component {
  render(){
      const studentData = [
        {
          name: 'React Router',
          id: 'react-router',
          description: 'Declarative, component based routing for React',
          resources: [
            {
              name: 'URL Parameters',
              id: 'url-parameters',
              description: "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
              url: 'https://tylermcginnis.com/react-router-url-parameters/'
            },
            {
              name: 'Programmatically navigate',
              id: 'programmatically-navigate',
              description: "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
              url: 'https://tylermcginnis.com/react-router-programmatically-navigate/'
            }
          ]
        },
        {
          name: 'React.js',
          id: 'reactjs',
          description: 'A JavaScript library for building user interfaces',
          resources: [
            {
              name: 'React Lifecycle Events',
              id: 'react-lifecycle',
              description: "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
              url: 'https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/'
            },
            {
              name: 'React AHA Moments',
              id: 'react-aha',
              description: "A collection of 'Aha' moments while learning React.",
              url: 'https://tylermcginnis.com/react-aha-moments/'
            }
          ]
        },
        {
          name: 'Functional Programming',
          id: 'functional-programming',
          description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.',
          resources: [
            {
              name: 'Imperative vs Declarative programming',
              id: 'imperative-declarative',
              description: 'A guide to understanding the difference between Imperative and Declarative programming.',
              url: 'https://tylermcginnis.com/imperative-vs-declarative-programming/'
            },
            {
              name: 'Building User Interfaces with Pure Functions and Function Composition',
              id: 'fn-composition',
              description: 'A guide to building UI with pure functions and function composition in React',
              url: 'https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/'
            }
          ]
        }
      ]
      return(
        <div className="container">
            <img src={loginIcon} className="page-icon" alt="login icon"/>
            <div className="spacer-vertical"></div>
            <h1>Login to Wise</h1>
            <form>
            <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Email</span>
                    <input type="email" className="" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                
                <div className="spacer-vertical"></div>
                <div className="input-wrapper">
                    <span className="input-label">Student ID</span>
                    <input type="password" className="" />
                </div>
                <div className="input-wrapper">
                    <div className="text-plain" style={{width: '58%'}}>
                        <Link to="#">What's my student ID?</Link>
                    </div>
                </div>
                <div className="spacer-vertical"></div>
                <div className="">
                    <Link to="/student/dashboard"><button className="btn">Submit</button></Link>
                </div>
            </form>
    </div>
      )
  }
}

export default StudentLogin;


