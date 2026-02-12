import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext, { userDataContext } from "../context/UserContext";
function SignIn() {
  const Navigate = useNavigate();
  const { serverUrl, setUserData, userData } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
      setUserData(result.data);
      console.log(result);
      Navigate("/");
      setLoading(false);
    } catch (error) {
      setErr(error.response.data.message);
      console.log(error);
      setUserData(null);
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="w-full h-[100vh] bg-cover flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <form
          className="w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px]"
          onSubmit={handleSignIn}
        >
          <h1 className="text-white text-[30px] font-semibold">
            Login to <span className="text-blue-400"> Virtual Assitant</span>
          </h1>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 rounded-full text-[18px]"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-5"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!showPassword && (
              <IoIosEye
                className="absolute top-1/2 right-5 -translate-y-1/2 w-6 h-6 text-white cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
            {showPassword && (
              <IoIosEyeOff
                className="absolute top-1/2 right-5 -translate-y-1/2 w-6 h-6 text-white cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>{" "}
          {err.length > 1 && <p className="text-red-500">{err}</p>}
          <button
            className="min-w-[150px] h-[60]px mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
            disabled={loading}
          >
            {loading ? "Loading" : "Sign In"}
          </button>
          <p
            className="text-[white] text-[18px] cursor-pointer"
            onClick={() => {
              Navigate("/signup");
            }}
          >
            Want to create n new account ?{" "}
            <span className="text-blue-400">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
