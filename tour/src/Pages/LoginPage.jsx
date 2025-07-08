import React, { use } from "react";
import { FaGoogle } from "react-icons/fa";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const LoginPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { loginUser, loginUserIwthGoogle } = use(AuthContext);

  const googleProvider = new GoogleAuthProvider();

  const loginwithGoogle = () => {
    loginUserIwthGoogle(googleProvider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setTimeout(() => {navigate(location.state?.from?.pathname || "/")}, 1000);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        setTimeout(() => {
          navigate(location.state?.from?.pathname || "/");
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <title>Tourista | Login</title>
      <div className="hero my-20">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-slate-900">Login now!</h1>
          </div>
          <div className="card  w-96 shrink-0 bg-slate-800 rounded-4xl border">
            <div className="card-body">
              <form onSubmit={handleLogin} className="form">
                <label className="label font-bold text-white">Email</label>
                <input type="email" name="email" className="input" placeholder="Email" />
                <label className="label font-bold text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="btn items-center mt-4 w-80"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-white">
                Don't have an account?
                <Link to="/register" className="link link-hover text-white text-lg font-medium ml-1">
                  Register
                </Link>
              </p>
              <div className="divider text-white">OR</div>
              <button onClick={loginwithGoogle} className="btn items-center w-80">
                <FaGoogle></FaGoogle>Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
