import { useContext, useEffect, useRef, useState } from "react";
import { changePassword, getProfile, updateProfile } from "../../../services/profileService";
import { Eye, EyeOff, Lock, Mail, Save, Shield, User } from "lucide-react";
import { AuthContext } from "../../../context/AuthProvider";
import PageHeader from "../../reuseable components/PageHeader";
import ConfirmModal from "../../reuseable components/ConfirmModal";
import { deleteUser } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import ErrorSuccessBox from "../../reuseable components/ErrorSuccessBox"

const Profile = () => {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const messageRef = useRef(null);

  // Profile
  const [profile, setprofile] = useState(null);
  const [loadingProfile, setloadingProfile] = useState(true);

  // Edit Profile
  const [fullName, setfullName] = useState("");

  const [savingProfile, setsavingProfile] = useState(false);
  const [savingPassword, setsavingPassword] = useState(false);

  // Changing Password
  const [passwordData, setpasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmedPassword: "",
  });

  const [isEditingProfile, setisEditingProfile] = useState(false);

  // Password Visibility
  const [showCurrentPassword, setshowCurrentPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showConfirmedPassword, setshowConfirmedPassword] = useState(false);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);


  // Error & Success
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      setloadingProfile(true);
      seterror("");

      const response = await getProfile();

      setprofile(response);
      setfullName(response?.fullName || "");
      
    } catch (error) {

      console.error("Failed to fetch profile:", error);

      seterror(
        error.response?.data?.message ||
        "Failed to fetch profile."
      );

    } finally {

      setloadingProfile(false);

    }

  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    seterror("");
    setsuccess("");
    setisEditingProfile(true);

    if (!fullName.trim()) {
      seterror("Full name is required.");
      return;
    }

    try {

      setsavingProfile(true);

      const response = await updateProfile(fullName.trim());

      setprofile(response);

      const updatedUserData = {
        id: user?.id,
        fullName: fullName.trim(),
        email: user?.email,
        role: user?.role,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUserData)
      );

      setsuccess("Profile updated successfully.");

      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        setsuccess("");
        setisEditingProfile(false);
      }, 1500);

    } catch (error) {

      console.error("Failed to update profile:", error);

      const errors = error.response?.data;

      seterror(
        errors?.fullName || errors?.message || 
        "Failed to update profile."
      );

      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    } finally {

      setsavingProfile(false);

    }
  };

  // Cancel Profile Editing
  const handleCancelEditing = () => {
    seterror("");
    setisEditingProfile(false);

    // Restore original name
    setfullName(profile?.fullName || "");
  };


  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    seterror("");
    setsuccess("");

    if (passwordData.newPassword.trim() !== passwordData.confirmedPassword.trim()) {
      seterror("New password and confirm password do not match.");
      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    try {

      setsavingPassword(true);

      await changePassword(passwordData);

      setsuccess("Password changed successfully.");

      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

      setTimeout(() => {
        setsuccess("");
      }, 1500);

      // Clear password form
      setpasswordData({
        currentPassword: "",
        newPassword: "",
        confirmedPassword: "",
      });

      // Hide passwords after successful change
      setshowCurrentPassword(false);
      setshowNewPassword(false);
      setshowConfirmedPassword(false);

    } catch (error) {

      console.error("Failed to change password.", error);

      const errors = error.response?.data;

      seterror(
        errors?.currentPassword ||
        errors?.newPassword ||
        errors?.confirmedPassword ||
        errors?.message ||
        "Failed to change password."
      );

      messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    } finally {
      setsavingPassword(false);
    }
  };

  // Full Name Change
  const handleFullNameChange = (e) => {
    setfullName(e.target.value);
  };

  // Password Change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setpasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle Logout
  const handleLogout = () => {

    try {

      setLoggingOut(true);

      logout();

      setShowLogoutModal(false);

      navigate("/login", { replace: true });

    } catch (error) {

      console.log("Failed to logout.", error);

    } finally {

      setLoggingOut(false);

    }

  };

  // Handle Delete Account
  const handleDelete = async () => {

    try {
      setDeleting(true);

      await deleteUser();

      setShowDeleteModal(false);

      setTimeout(() => {

        logout();

      }, 500);


    } catch (error) {

      console.log(
        error.response?.data?.message ||
        "Failed to delete account."
      );

    } finally {

      setDeleting(false);

    }

  };


  return (
    <div className="w-full min-h-screen max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">

      <div className="flex items-center justify-between">
        
        {/* Page Header */}
        <PageHeader
          title="Profile"
          subtitle="Manage your personal information and password."
        />

        <div 
          className="h-22 w-22 shrink-0 mr-5 bg-violet-700 rounded-full text-4xl text-white font-semibold flex items-center justify-center"
          onClick={() => {
            window.location.href="https://myaccount.google.com/"
          }}
        >

          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              className="rounded-full"
            />
          ) : (
            <div>
              {user?.fullName?.charAt(0)?.toUpperCase()}
            </div>
          )}

        </div>

      </div>

      {/* Error & Success */}
      <div ref={messageRef}>
        <ErrorSuccessBox error={error} success={success} />
      </div>

      {/* Personal Information */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-500 rounded-xl p-4 sm:p-5 md:p-6 mb-6">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200">
              Personal Information
            </h2>

            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Your account information.
            </p>
          </div>

          {!isEditingProfile && (
            <button
              type="button"
              onClick={() => {
                seterror("");
                setisEditingProfile(true);
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Loading Profile */}
        {loadingProfile ? (
          <div className="py-8 text-center text-gray-500">
            Loading profile...
          </div>
        ) : isEditingProfile ? (

          /* ================= EDIT PROFILE ================= */
          <form onSubmit={handleUpdateProfile}>

            {/* Full Name */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={fullName}
                  onChange={handleFullNameChange}
                  className="w-full border text-black dark:text-white border-gray-300 dark:border-gray-500 placeholder:text-gray-400 rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                  placeholder="Enter your full name"
                />

              </div>

            </div>

            {/* Email */}
            <div className="mb-6">

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-500 rounded-lg pl-10 pr-4 py-3 text-gray-500 cursor-not-allowed"
                />

              </div>

              <p className="text-xs text-gray-500 mt-2">
                Email cannot be changed.
              </p>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="submit"
                disabled={savingProfile}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:bg-blue-400 transition"
              >
                <Save size={17} />

                {savingProfile
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={handleCancelEditing}
                disabled={savingProfile}
                className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 disabled:opacity-50 transition"
              >
                Cancel
              </button>

            </div>

          </form>

        ) : (

          /* ================= DISPLAY PROFILE ================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {/* Full Name */}
            <div className="min-w-0">

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Full Name
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                {profile?.fullName || "N/A"}
              </p>

            </div>

            {/* Email */}
            <div className="min-w-0">

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Email
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200 break-all">
                {profile?.email || "N/A"}
              </p>

            </div>

            {/* Role */}
            <div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Role
              </p>

              <div className="flex items-center gap-2">

                <Shield
                  size={17}
                  className="text-blue-600 dark:text-blue-500 shrink-0"
                />

                <span className="font-medium text-gray-800 dark:text-gray-200 wrap-break-word">
                  {profile?.role || "N/A"}
                </span>

              </div>

            </div>

            {/* Created At */}
            <div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                User Since
              </p>

              <p className="font-medium text-gray-800 dark:text-gray-200">
                {profile?.createdAt
                  ? new Date(
                    profile.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                  : "N/A"}
              </p>

            </div>

          </div>

        )}

      </div>


      {/* Change Password */}
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-500 rounded-xl p-4 sm:p-5 md:p-6 mb-6">

        {/* Section Header */}
        <div className="mb-6">

          <h2 className="text-lg font-semibold text-gray900 dark:text-gray-200">
            Change Password
          </h2>

          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Update your account password.
          </p>

        </div>

        {/* Password Form */}
        <form onSubmit={handleChangePassword}>

          {/* Current Password */}
          <div className="mb-5">

            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Current Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="currentPassword"
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border text-black dark:text-white border-gray-300 dark:border-gray-500 placeholder:text-gray-400 rounded-lg pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() =>
                  setshowCurrentPassword(
                    !showCurrentPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                aria-label={
                  showCurrentPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showCurrentPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>

            </div>

          </div>

          {/* New Password */}
          <div className="mb-5">

            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              New Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="newPassword"
                type={
                  showNewPassword
                    ? "text"
                    : "password"
                }
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full text-black dark:text-white border border-gray-300 dark:border-gray-500 placeholder:text-gray-400 rounded-lg pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() =>
                  setshowNewPassword(
                    !showNewPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                aria-label={
                  showNewPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showNewPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>

            </div>

            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Must contain uppercase, lowercase,
              number and special character.
            </p>

          </div>

          {/* Confirm Password */}
          <div className="mb-6">

            <label
              htmlFor="confirmedPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Confirm New Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="confirmedPassword"
                type={
                  showConfirmedPassword
                    ? "text"
                    : "password"
                }
                name="confirmedPassword"
                value={passwordData.confirmedPassword}
                onChange={handlePasswordChange}
                className="w-full text-black dark:text-white border border-gray-300 dark:border-gray-500 placeholder:text-gray-400 rounded-lg pl-10 pr-11 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-none"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() =>
                  setshowConfirmedPassword(
                    !showConfirmedPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                aria-label={
                  showConfirmedPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showConfirmedPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </button>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={savingPassword}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:bg-blue-400 disabled:cursor-not-allowed transition"
          >

            <Lock size={18} />

            {savingPassword
              ? "Changing Password..."
              : "Change Password"}

          </button>

        </form>

      </div>


      {/* Logout & Delete */}
      <div className="flex justify-between bg-white dark:bg-black border border-gray-200 dark:border-gray-500 rounded-xl p-4 sm:p-5 md:p-6">

        {/* Logout Button */}
        <div>

          <h1 className="text-sm text-gray-600 dark:text-gray-200 font-semibold">
            Logout now
          </h1>

          <button
            onClick={() => {
              setShowLogoutModal(true);
            }
            }
            className="mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 hover:scale-105 transition"
          >

            Logout

          </button>
        </div>

        {/* Delete Account Button */}
        <div>

          <h1 className="text-sm text-gray-600 dark:text-gray-200 font-semibold">
            Delete your account
          </h1>

          <button
            onClick={() => {
              setShowDeleteModal(true);
            }
            }
            className=" mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 hover:scale-105 transition"
          >

            Delete Account

          </button>

        </div>

        {/* Delete Account Confirmation box */}
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Account"
          message="Are you sure you want to delete this account? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => {

            setShowDeleteModal(false);

          }}
          loading={deleting}
          buttonText="Delete Account"
          onLoadingButtonText="Deleting Account..."
        />

        {/* Logout Confirmation box */}
        <ConfirmModal
          isOpen={showLogoutModal}
          title="Logout"
          message="Are you sure you want to logout?"
          onConfirm={handleLogout}
          onCancel={() => {

            setShowLogoutModal(false);

          }}
          loading={loggingOut}
          buttonText="Log out"
          onLoadingButtonText="Logging out ..."
        />

      </div>

    </div>
  );

};

export default Profile;