import { useContext, useState } from 'react'
import { login } from '../../../services/authService';
import { AuthContext } from '../../../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [showPassword, setshowPassword] = useState(false);

  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, seterror] = useState("");

  // Handle Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  // Handle Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    seterror("");

    try {

      setloading(true);

      const response = await login(formData);

      auth?.login(response);

      navigate("/dashboard", { replace: true });

    } catch (error) {

      console.error(error);

      const errors = error.response?.data;

      seterror(
        errors?.email || errors?.password || errors?.message ||
        "Login failed. Please try again."
      );

    } finally {

      setloading(false);

    }

  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>

      {/* Login Card */}
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>

        {/* Header */}
        <div className='text-center mb-8'>

          <h1 className='text-3xl font-bold text-blue-600 mt-6 mb-4'>
            Smart Expense Tracker
          </h1>

          <h2 className='text-2xl font-semibold mt-6'>
            Welcome Back
          </h2>

          <p className='text-gray-500 mt-2'>
            Sign in to continue
          </p>

        </div>

        {/* Error*/}
        {error && (

          <div className='mb-5 rounded-lg px-4 py-3 text-sm wrap-break-word bg-red-100 border-red-200 text-red-600'>

            {error}

          </div>

        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className='mb-5'>

            <label className='block mb-2 font-medium'>
              Email
            </label>

            <div className='relative'>

              <Mail
                size={18}
                className='absolute left-3 top-3.5 text-gray-400'
              />

              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                className='w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0'
              // required
              />

            </div>

            {/* Password */}
            <div className='mb-4 mt-4'>

              <label className='block mb-2 font-medium'>
                Password
              </label>

              <div className='relative'>

                <Lock
                  size={18}
                  className='absolute left-3 top-3.5 text-gray-400'
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className='w-full border rounded-lg pl-10 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0'
                // required
                />

                <button
                  type='button'
                  onClick={() => setshowPassword(!showPassword)}
                  className='absolute right-3 top-3.5 text-gray-500 hover:text-gray-700'
                >

                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                  }

                </button>

              </div>

            </div>


            {/* Forgot Password */}
            <div className='text-right mb-6'>

              <Link
                to="/forgot-password"
              >
                Forgot Password?
              </Link>

            </div>


            {/* Login Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold'
            >
              {loading ? "Signing In..." : "Login"}
            </button>


            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  import.meta.env.OAUTH2_REDIRECT_URL;
              }}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 mt-3 rounded-lg hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />

              Continue with Google
            </button>


            {/* Register Link */}
            <p className='text-center mt-6 text-gray-600'>
              Don't have an account?{" "}

              <Link
                to="/register"
                className='text-blue-600 font-semibold hover:underline'
              >
                Register
              </Link>

            </p>

          </div>

        </form>

      </div>

    </div>
  )
}

export default Login