import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 } from "react-router-dom";

//components
import Header from './components/header'
import Footer from './components/footer';

//pages
import HomePage from './pages/HomePage'
import CreateSchoolPage from './pages/CreateSchoolPage'

import './Assets/css/default.min.css'

function App() {
  return (
    <Router >
    <div className="App">
      <Header />
        <Switch>
          <Route path="/create-school" component={CreateSchoolPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
