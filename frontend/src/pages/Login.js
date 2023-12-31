import { useState } from "react";
import { useLogin } from "../hooks/useLogin"
const Login = () => {
  const [email, setEmail] = useState("");
  const { login, error, isLoading} = useLogin();
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    await login(email);
  } 
  return (
    <form>
      <label htmlFor="email">Enter your Email:</label>
      <input 
      type="text" 
      name="email" 
      id="email" 
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
      }}
      />

      {error && <h1>{error}</h1>}
      <button onClick={handleSubmit} disabled={isLoading}>Login</button>
    </form>
  )
}
export default Login