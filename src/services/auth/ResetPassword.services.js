import axios from "axios";
export const ResetPasswordhandle = async (token, password ) => {
    try {
        const res = await axios.post("api/auth/reset_password",{ token, password });
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}