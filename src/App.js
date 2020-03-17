import React from 'react';

//components
import Header from './components/header'
import Footer from './components/footer';
import HomePage from './pages/HomePage'

import './Assets/css/default.min.css'

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
