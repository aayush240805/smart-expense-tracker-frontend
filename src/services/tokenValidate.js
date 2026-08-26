import { jwtDecode } from "jwt-decode"

export const isTokenExpired = (token) => {

    try {

        const decodedToken = jwtDecode(token);

        // exp is the expiration time in seconds.
        // Date.now() returns milliseconds.
        return decodedToken.exp * 1000 < Date.now();
        
    } catch (error) {

        return true;
        
    }

}