import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [number_allowed, setNumber_allowed] = useState(false);
  const [char_allowed, setchar_allowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwdSelect = useRef(null)
  const copyTextBtn =useCallback((
    ()=>{
      window.navigator.clipboard.writeText(password)
      passwdSelect.current?.select();
      passwdSelect.current?.setSelectionRange(0,35)
    } ),[password])
  const passwdGen = useCallback(() => {
    let lettersUpperLower =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let number = "12345678901234567890";
    let char = "!@#$%^&*()_+{}<>?[];|``~";
    let result = "";
    let res = lettersUpperLower;
    res += lettersUpperLower;
    res += number_allowed ? number : "";
    res += char_allowed ? char : "";
    for (let ele = 0; ele < length; ele++) {
      let randomIndex = Math.floor(Math.random() * res.length);

      result += res.charAt(randomIndex);
    }
    setPassword(result);
  }, [length, number_allowed, char_allowed,password]);
  useEffect(() => {
    passwdGen();
  }, [length, number_allowed, char_allowed]);
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full my-8 bg-gray-800 rounded-xl text-orange-700">
        <h1 className="text-teal-400 text-2xl">Password Generator</h1>
        <div className="">
          <input
            type="text"
            value={password}
            className=" mt-0.5 mb-0.5 bg-amber-50 text-orange-500 p-1 w-xl rounded-tl-2xl rounded-bl-2xl "
            ref={passwdSelect}
          />
          <button className=" mt-0.5 mb-0.5 bg-orange-500 text-amber-50 p-1 rounded-tr-2xl rounded-br-2xl" 
          onClick={copyTextBtn}>
            Copy
          </button>
          <div>
            <input
              type="range"
              max={35}
              min={6}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label className="p-1">Length : {length}</label>
            <input
              type="checkbox"
              defaultChecked={number_allowed}
              className="ml-4"
              onChange={() => setNumber_allowed((prev) => !prev)}
            />
            <label> Number</label>
            <input
              type="checkbox"
              className="ml-4"
              defaultChecked={char_allowed}
              onChange={() => {
                setchar_allowed((prev) => !prev);
              }}
            />
            <label> character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
