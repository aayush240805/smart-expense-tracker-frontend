import { Eye, EyeOff, KeyRound, Lock, Mail } from 'lucide-react';
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../../services/authService';

const ResetPassword = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const emailFromForgotPassword = location.state?.email || "";

  const [formData, setformData] = useState({
    email: emailFromForgotPassword,
    otp: "",
    newPassword: "",
    confirmedPassword: ""
  });

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmedPassword, setshowConfirmedPassword] = useState(false);

  const [loading, setloading] = useState(false);

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  // Handle Change
  const handleChange = (e) => {

    const { name, value } = e.target;

    setformData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  // Handle Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    seterror("");
    setsuccess("");

    try {

      setloading(true);

      if (formData.newPassword.trim()) {
        if (!formData.confirmedPassword.trim()) {
          seterror("Confirm your password.");
          return;
        }
        if (formData.newPassword.trim() && formData.confirmedPassword.trim()) {
          if (formData.newPassword.trim() !== formData.confirmedPassword.trim()) {
            seterror("Passwords do not match.");
            return;
          }
        }
      }

      await resetPassword(formData);
      setsuccess("Password resetted successfully.")

      // Password successfully reset
      setTimeout(() => {

        navigate("/login", {
          replace: true,
          state: {
            message: "Password reset successfully. Please login."
          }
        });

      }, 1000);

    } catch (error) {

      console.error("Reset password failed:", error);

      const errors = error.response?.data;

      seterror(
        errors?.email || errors?.otp || errors?.newPassword || errors?.confirmedPassword || errors?.message ||
        "Unable to reset password. Please try again."
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
            Reset Password
          </h2>

          <p className="text-gray-500 mt-2">
            Enter the OTP and create your new password.
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
          <div className="mb-5">

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
              // required
              />

            </div>

          </div>


          {/* OTP */}
          <div className="mb-5">

            <label className="block mb-2 font-medium">
              OTP
            </label>

            <div className="relative">

              <KeyRound
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                maxLength={6}
                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
              // required
              />

            </div>

          </div>


          {/* New Password */}
          <div className="mb-5">

            <label className="block mb-2 font-medium">
              New Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
              // required
              />

              <button
                type="button"
                onClick={() =>
                  setshowPassword(!showPassword)
                }
                className="absolute right-3 top-3.5"
              >
                {showPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                }
              </button>

            </div>

            <p className="text-xs text-gray-500 mt-2">
              Must contain uppercase, lowercase, number and
              special character.
            </p>

          </div>


          {/* Confirm Password */}
          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type={
                  showConfirmedPassword
                    ? "text"
                    : "password"
                }
                name="confirmedPassword"
                value={formData.confirmedPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
              // required
              />

              <button
                type="button"
                onClick={() =>
                  setshowConfirmedPassword(
                    !showConfirmedPassword
                  )
                }
                className="absolute right-3 top-3.5"
              >
                {showConfirmedPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
                }
              </button>

            </div>

          </div>


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
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

export default ResetPassword;