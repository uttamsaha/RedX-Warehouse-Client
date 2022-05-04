import React, { useRef } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import './Login.css'

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  let showError;
  const emailRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  if (error) {
    showError = (
      <div>
        <p className="text-danger">Error: {error?.message}</p>
      </div>
    );
  }
  if (loading || sending) {
    return <Loading></Loading>;
  }
  if (user) {
    //redirecting after login
    navigate(from, { replace: true });
  }
  const handleSignIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);
  };

  //reset password

  const resetPassword = async (event) => {
    // const email = event.target.email.value;
    const email = emailRef.current.value;
    console.log(email);
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Email Sent");
    } else {
      toast("Please Enter email to reset your password..");
    }
  };
  return (
    <div>
        <div className='login-container'>
        <div className='login-area'>
                <h4>LOGIN TO REDX</h4>
                    <form onSubmit={handleSignIn} className='login-items'>
                    <label htmlFor="username">Email</label>
                    <input type="email" className='login' name="email" placeholder='your-email@gmail.com' required ref={emailRef}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='login' name="password" placeholder="Your Password" required/>
                    {showError}
                    <input type="submit" className='login-btn' value="Login" />
                    </form>
                    <p className='p'>New to RedX? <Link className='a' to="/register">Create an Account</Link></p>
                    <p className='p'>Forgot password? <button onClick={resetPassword} className='btn btn-link a'>Rest Password</button></p>
                    <SocialLogin></SocialLogin>
                    
        </div>
    </div>
    <ToastContainer />
    </div>
  )
}

export default Login;