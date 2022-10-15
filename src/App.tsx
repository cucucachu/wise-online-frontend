import React from 'react';

//components
import Footer from './components/footer';

//pages
import HomePage from './pages/HomePage'

// import './Assets/scss.'

import './Assets/css/default.min.css'
// import './Assets/css/default.css'
// import './Assets/css/bootstrap-grid.min.css'
import './Assets/css/app.css'
import AuthContextProvider from './contexts/AuthContext';
import {ProctorConfigProvider} from './contexts/ProctorConfigContext';

import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: "https://8c2d5ace9f394b2fbdbf1290b20d6aad@o1198625.ingest.sentry.io/6558733",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function App() {
  return (
      <div className="App">
        <ProctorConfigProvider>
          <AuthContextProvider>
              <HomePage />
            <Footer />
          </AuthContextProvider>
        </ProctorConfigProvider>
      </div>
  );
}

export default App;
