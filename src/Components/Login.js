import React, {useCallback, useContext} from 'react';
import {withRouter, Redirect} from 'react-router';
import {app} from '../base';
import {AuthContext} from '../Auth';

// Login Component
const Login = ({history}) => {
    //login method 
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                // this is firebase looking auth in you db
                await app
                .auth()
                .signInWithEmailAndPassword(email.value,password.value);
                history.push('/');
            } catch (error) {
                alert(error)
            }
        },
        [history]
    );
    
    const { currentUser} = useContext(AuthContext);
    if (currentUser)
    {
        return <Redirect to ='/'/>
    }
    return (
        <div>

            <form   onSubmit= {handleLogin}>
            <h1>Log In</h1>
            <div className="form-group" >
            <label >
                Email
                <input className="form-control"  name='email' type='email' placeholder='Email' />
            </label>

            </div>
            <div className="form-group">
            <label >
                Password
                <input className="form-control" name='password' type='password' placeholder= 'Password' />
            </label>
                
            </div>
            <button style={{background: '#93cede',borderColor: 'black' }}
                    type='submit' className='btn btn-block'>
                Log In
            </button>
            <button  style={{background: 'green',borderColor: 'black' }}
                     className='btn btn-block'
                     onClick = {
                () => {
                   return  history.push('/signup');
                }
            }>
                Sign Up
            </button>
        

            </form>
            
            
        </div>

    );
};
    export default withRouter(Login);