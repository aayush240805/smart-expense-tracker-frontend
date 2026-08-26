import { useState } from 'react'
import { register } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const Register = () => {

    const [formData, setformData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmedPassword: ""
    });

    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmedPassword, setshowConfirmedPassword] = useState(false)
    const [loading, setloading] = useState(false);

    const [error, seterror] = useState("");

    const navigate = useNavigate();

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

        try {

            if (formData.password.trim()) {
                if (!formData.confirmedPassword.trim()) {
                    seterror("Confirm your password.");
                    return;
                }
                if (formData.password.trim() && formData.confirmedPassword.trim()) {
                    if (formData.password.trim() !== formData.confirmedPassword.trim()) {
                        seterror("Passwords do not match.");
                        return;
                    }
                }
            }

            await register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });

            navigate("/login", {
                replace: true,
                state: {
                    message: "Registration successfully. Please login"
                }
            });

        } catch (error) {

            console.error("Registration failed. Please try again.", error);

            const errors = error.response?.data;

            seterror(
                errors?.fullName || errors?.email || errors?.password || errors?.message ||
                "Registration failed. Please try again."
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

                    <h1 className="text-3xl font-bold text-blue-600">
                        Smart Expense Tracker
                    </h1>

                    <h2 className="text-2xl font-semibold mt-6">
                        Create Account
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start managing your finances
                    </p>

                </div>


                {/* Error */}
                {error && (

                    <div className="mb-5 rounded-lg px-4 py-3 text-sm wrap-break-word bg-red-100 border border-red-200 text-red-600">

                        {error}

                    </div>

                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Full Name */}
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
                            // required
                            />

                        </div>

                    </div>

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
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
                            // required
                            />

                        </div>

                    </div>

                    {/* Password */}
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <div className="relative">

                            <Lock
                                size={18}
                                className="absolute left-3 top-3.5 text-gray-400"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
                            // required
                            />

                            <button
                                type="button"
                                onClick={() => setshowPassword(!showPassword)}
                                className="absolute right-3 top-3.5"
                            >
                                {showPassword
                                    ? <EyeOff size={18} />
                                    : <Eye size={18} />
                                }
                            </button>

                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                            Password must contain uppercase, lowercase,
                            number and special character.
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
                                type={showConfirmedPassword ? "text" : "password"}
                                name="confirmedPassword"
                                value={formData.confirmedPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-0"
                            // required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setshowConfirmedPassword(!showConfirmedPassword)
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
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>


                {/* Login */}

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );

}

export default Register;