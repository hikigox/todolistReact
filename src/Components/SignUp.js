import React,{ useCallback} from 'react';
import {withRouter} from 'react-router';
import {app} from '../base';
// 
const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
            .auth()
            .createUserWithEmailAndPassword(email.value,password.value);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    },[history]);

    return (
        <div>
            <h1>
                Sign Up
            </h1>
            <form onSubmit={handleSignUp}>
                <div className='from-group'>
            <label>
            Email
        <input  className="form-control" name ='email' type='email' placeholder='Email' />
        </label>
        

                </div>
        <div className='from-group'>
        <label>
            Password
        <input  className="form-control" name ='password' type='password' placeholder='Password' />
        </label>

</div>
        <button className='btn btn-block' style={{backgroundColor: 'green'}} type='submit'>
            Sign Up
        </button>

            </form>
        </div>
    );

};

export default withRouter(SignUp);