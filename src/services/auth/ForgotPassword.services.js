import axios from "axios";
export const ForgotPasswordhandle = async (email) => {
    try {
        const res = await axios.post("api/auth/forgot_password", email);
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}