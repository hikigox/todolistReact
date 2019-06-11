import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import {AuthProvider} from './Auth';
import PrivateRoute from './privateRoute';
import './App.css';

const App = () => {
    return(
      <AuthProvider>
      <Router>
        <div className='App-header'>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />

        </div>
      </Router>
      </AuthProvider>
    )
}



export default App;
