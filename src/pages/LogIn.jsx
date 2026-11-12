import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../services/api/users';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';

function Login () {
  const [showPassword, setShowPassword] = useState(false);
  const [, dispatch] = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm({
      mode: "onChange"
    });
    const navigate =useNavigate();
  
    const onSubmit = async (loginData) => {
      try {
        const data = await loginUser(loginData);
        const token = data?.token || data?.accessToken || data?.data?.token;
        if (!token) {
          throw new Error("Login succeeded but the server did not return an access token.");
        }
        localStorage.setItem("auth-token", token);
        dispatch({ type: "setToken", payload: token });
        toast.success(data.message || "Login successful!");
        reset();
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Login failed. Please try again.");
      }
    };
   


  return (
    <div className='bg-[url(/img/login.jpg)] bg-cover h-full w-full'>
      <div className="min-h-screen flex items-center justify-center backdrop-blur-sm">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/30 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600">Please enter your credentials</p>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              { ...register("email", {
                required: "Email Address is required",
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              placeholder="Enter your email"
            />
            {errors.email && (<p className='text-center text-red-500'>{errors.email.message}</p>)}
          </div>
          
          <div className="relative">
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              {...register("password", {
                required: "User Password is required"
              })}
                placeholder='***********'
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 bottom-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && (<p className='text-center text-red-500'>{errors.password.message}</p>)}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B0500] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Login"}
              
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#0B0500]">
            Register here
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
