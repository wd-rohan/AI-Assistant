import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Customize2() {
  const { userData, backendImage, selectedImage, setUserData, serverUrl } =
    useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || "",
  );

  const handleUpdateAssistant = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true },
      );
      setLoading(false);
      console.log(result.data);
      setUserData(result.data);
      Navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative">
      <IoMdArrowRoundBack
        className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]"
        onClick={() => Navigate("/customize")}
      />

      <h1 className="text-white mb-[40px] text-[30px] text-center">
        Enter Your <span className="text-blue-200"> Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg. shifra"
        className="w-full h-[60px] max-w-[600px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px] "
        disabled={loading}
        onChange={(e) => {
          setAssistantName(e.target.value);
        }}
        value={assistantName}
        required
      />
      {assistantName && (
        <button
          className="min-w-[300px] h-[90]px mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
          onClick={() => {
            handleUpdateAssistant();
          }}
        >
          {!loading ? "Finally Created Your Assitant" : "loading"}
        </button>
      )}
    </div>
  );
}

export default Customize2;
