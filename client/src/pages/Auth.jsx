import { useState , useCallback } from "react";
import Input from "./Components/Input";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function Auth() {

  const Navigate = useNavigate();
  const [ version , setVersion ]  = useState(false);
  const [ limit , setLimit ]  = useState(true);
  const [ name , setName ]  = useState('');
  const [ email , setEmail ]  = useState('');
  const [ password , setPassword ]  = useState('');

  const handleChange = useCallback(() => {
    setVersion((current) => !current);
  },[]);

  const handleLimit = useCallback((message , type) => {
    if(limit){
      if(type === 'error'){
        toast.error(message);
      }else{
        toast.success(message);
    }
    setLimit((current) => !current);
    setTimeout(() => {
      setLimit((current) => !current);
    }, 3000);
  }

  },[ limit , setLimit ]);

  const handleSignUp = useCallback(async () => {
    if(!name || !email || !password) return handleLimit('Please fill all the fields' , 'error');
    try{
      const res = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password
      })

      const { data } = res;

      if(data?.message){
        handleLimit( data.message , 'success');
      }
      
      setName('');

      setVersion((current) => !current);

    } catch {
      handleLimit( "User not Registered", 'error');
    }
  },[name , email , password , handleLimit]);

  const handleSignIn = useCallback(  async () => {
    if(!email || !password) return handleLimit('Please fill all the fields' , 'error');
    try{
      await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      }).then(() => {
        handleLimit('Login Successfully' , 'success');
      })
      setName('');
      setEmail('');
      setPassword('');

      Navigate('/profile');

    } catch {
      handleLimit( "Login failed", 'error');
    }
  },[email,password , handleLimit , Navigate]);

  const handleSubmit = useCallback(() => {
    if(version){
      handleSignIn();
    }else{
      handleSignUp();
    }
  },[ version , handleSignIn , handleSignUp ]);

  return (
    <div className="w-full h-full bg-[url('Images/Background.png')] bg-no-repeat bg-cover bg-fixed">
      <div className="w-full h-full md:bg-zinc-900/65 bg-black">
        <div className="flex flex-col w-full h-full">
          <nav className="py-3 px-12 ">
            <img src="Images/netflix-logo.png" alt="Logo" className="h-10"/>
          </nav>
          <div className="bg-black/65 md:w-[500px] w-full h-auto md:mx-auto mx-auto mt-12 md:py-12 md:px-20 px-8 py-3">
            <div className="flex flex-col justify-start gap-10">
              <h1 className="text-white text-4xl md:text:6xl font-semibold">{`${ version ? 'Sign In' : 'Sign up'}`}</h1>
              <div className="flex flex-col gap-5">
                { !version && <Input label="Name" type="text" value={name} setValue={setName} /> }
                <Input label="Email" type="text" value={email} setValue={setEmail}/>
                <Input label="Password" type="password" value={password} setValue={setPassword}/>
              </div>
              <div>
                <button 
                  className="
                    bg-red-700 
                    text-white 
                      w-full 
                      h-full 
                      text-xl 
                      text-center 
                      py-3 
                      rounded-md 
                      hover:opacity-90
                  "
                  onClick={handleSubmit}
                >
                        {`${ version ? "Sign In" : "Sign up"}`}
                </button>
              </div>
              <hr className="border border-gray-700" /> 
              <div className="text-gray-400  flex flex-row gap-2 justify-center">
                <p>
                  {`${ version ? 'New to Netflix?' : 'Already have an account?' }`}
                </p>
                <span className="hover:underline hover:text-white" onClick={handleChange} >
                  {`${ version ? 'Sign up' : 'Log In'}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;