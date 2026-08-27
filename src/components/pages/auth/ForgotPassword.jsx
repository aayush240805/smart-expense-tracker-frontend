import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../../services/authService';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  // HandleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault();

    seterror("");

    try {

      setloading(true);

      const response = await forgotPassword(email);

      setsuccess(
        response.message || "OTP sent to your email."
      );

      setTimeout(() => {

        navigate("/reset-password", { state: { email: email } });
        
      }, 1000);

    } catch (error) {

      console.error("Forgot password failed.", error);

      const errors = error.response?.data;


      seterror(
        errors?.email || errors?.message ||
        "Unable to send OTP. Please try again."
      );

    } finally {

      setloading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-violet-600">
            Smart Expense Tracker
          </h1>

          <h2 className="text-2xl font-semibold mt-6">
            Forgot Password?
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your email and we'll send you an OTP.
          </p>

        </div>

        {/* Error & Success */}
        {(error || success) && (
          <div
            className={`mb-5 rounded-lg px-4 py-3 text-sm wrap-break-word
            ${error
                ? "bg-red-100 border border-red-200 text-red-600"
                : "bg-green-100 border border-green-200 text-green-600"
              }
          `}
          >
            {error || success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
              // required
              />

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-6 text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  )
}

export default ForgotPassword;