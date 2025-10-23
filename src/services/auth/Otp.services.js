import axios from "axios";
export const Otp = async (otp) => {
    try {
        const res = await axios.post("api/auth/otp", otp);
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}