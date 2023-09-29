import { useState } from "react";
import logo from "./download.jpeg";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name + " " + email + " " + password + " " + phone);
  };
  return (
    <div className="bg-orange-400 min-h-screen flex items-center justify-center font-normal font-['Battambang'] text-black">
      <div className="bg-pink-50 w-[1100px] h-[503px] rounded-2xl relative grid-cols-2 md:w-1/2 md:px-16">
        <h2 className="left-[120px] top-[30px] absolute text-stone-900 text-[30px]">
          Create a new account
        </h2>

        <div className="rounded-2xl absolute flex flex-col left-[130px] top-[100px] flex-wrap p-px">
          <input
            className="p-3"
            type="text"
            placeholder="Full name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-5 p-3"
          />

          <input
            type="number"
            placeholder="Phone no"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-5 p-3"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-5 p-3"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-5 bg-[#FFD19B] border-slate-950 py-2 px-4 rounded-full text-bold"
          >
            Signup
          </button>
        </div>

        <div className="left-[530px] right-[26px] bottom-[20px] top-[60px] absolute rounded-1x1">
          <img src={logo} className="w-[500px] h-[350px] sm : block" />
        </div>
      </div>
    </div>
  );
};

export default Signup;