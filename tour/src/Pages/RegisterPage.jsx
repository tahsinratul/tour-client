import React, { use } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
// import {toast} from 'react-toastify';
import {
  getAuth,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";

const RegisterPage = () => {

  const {createUser,loginUserIwthGoogle} = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

    const loginUserWithgoogle = () => {
      loginUserIwthGoogle(googleProvider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setTimeout(() => {navigate('/')}, 1000);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }


  const handleRegister = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passRegex.test(password)) {
      toast.error('Password must be at least 6 characters long and contain at least one uppercase letter and one lowercase letter.');
      return;
    }

    createUser(email, password).then((result) => {
      const user = result.user;
      updateProfile(user, {
        displayName: name,
        photoURL: image,});
      // console.log(user);
       setTimeout(() => {
          navigate(location.state?.from?.pathname || "/");
        }, 1000);
    });
  }

    return (<div>
      <title>Tourista | Register</title>
      <div className="hero w-[30rem] mx-auto my-20">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-slate-900">Register now!</h1>
          </div>
          <div className="card bg-slate-800 w-96 shrink-0 rounded-4xl border">
            <div className="card-body">
              <form onSubmit={handleRegister} className="fieldset">
                <label className="label font-bold text-white">Name</label>
                <input type="text" name="name" className="input" placeholder="John Doe" />
                <label className="label font-bold text-white">Image</label>
                <input type="text" name="image" className="input" placeholder="Your Image URL" />
                <label className="label font-bold text-white">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />
                <label className="label font-bold text-white">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <button type="submit" className="btn items-center w-80 mt-4">Register</button>
              </form>
              <p className="text-white">Already have an account?<Link to="/login" className="link link-hover text-lg font-medium ml-1 text-white">Login</Link></p>
              <div className="divider text-white">OR</div>
              <button onClick={loginUserWithgoogle}  className="btn items-center w-80"><FaGoogle></FaGoogle>Sign in with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default RegisterPage;