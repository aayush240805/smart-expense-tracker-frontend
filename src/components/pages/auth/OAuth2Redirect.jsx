import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { getProfile } from "../../../services/profileService";

const OAuth2Redirect = () => {

    const navigate = useNavigate();

    const hasProcessed = useRef(false);

    const { login } = useContext(AuthContext);


    useEffect(() => {

        // when useEffect will try to run again this statement will executes
        if (hasProcessed.current) {
            return;
        }

        hasProcessed.current = true;

        const handleOAuthLogin = async () => {

            const params = new URLSearchParams(
                window.location.search
            );

            const token = params.get("token");

            if (!token) {

                navigate("/login", {
                    replace: true
                });

                return;

            }

            try {

                 // Store temporarily so Axios interceptor can use it
                localStorage.setItem("token", token);

                const profile = await getProfile();

                login({
                    token: token,

                    id: profile.id,
                    fullName: profile.fullName,
                    email: profile.email,
                    profilePicture: profile.profilePicture,
                    role: profile.role
                });

                navigate("/dashboard", {
                    replace: true
                });

            } catch (error) {

                console.error("Google authentication failed:",error);

                // Clean up invalid token
                localStorage.removeItem("token");

                navigate("/login", {
                    replace: true
                })

            }

        };
      
        handleOAuthLogin();
        
    }, [navigate, login]);
    

  return (
    
    <div className="min-h-screen flex items-center justify-center">

            <p className="text-gray-600">
                Signing you in with Google...
            </p>

        </div>

  );

}

export default OAuth2Redirect;