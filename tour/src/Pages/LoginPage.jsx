import React, { useContext, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router"; // fixed import
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    document.title = "Tourista | Login";
  }, []);

  const loginWithGoogle = () => {
    loginUserWithGoogle(googleProvider)
      .then(() => {
        toast.success("Google login successful!");
        setTimeout(() => {
          navigate(location.state?.from?.pathname || "/");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate(location.state?.from?.pathname || "/");
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <main>
      <div className="hero my-20">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-slate-900">Login now!</h1>
          </div>
          <div className="card w-96 shrink-0 bg-slate-800 rounded-4xl border">
            <div className="card-body">
              <form onSubmit={handleLogin} className="form">
                <label className="label font-bold text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="label font-bold text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <button
                  type="submit"
                  className="btn items-center mt-4 w-80"
                  aria-label="Login with Email and Password"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-white">
                Don't have an account?
                <Link
                  to="/register"
                  className="link link-hover text-white text-lg font-medium ml-1"
                >
                  Register
                </Link>
              </p>
              <div className="divider text-white">OR</div>
              <button
                onClick={loginWithGoogle}
                className="btn items-center w-80"
                aria-label="Sign in with Google"
              >
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
