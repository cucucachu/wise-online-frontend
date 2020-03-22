import React from 'react';

//components
import Footer from './components/footer';

//pages
import HomePage from './pages/HomePage'

import './Assets/css/default.min.css'
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
      <div className="App">
        <AuthContextProvider>
          
            <HomePage />
          <Footer />
        </AuthContextProvider>
      </div>
  );
}

export default App;
