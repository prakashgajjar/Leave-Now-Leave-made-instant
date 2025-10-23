import axios from "axios";
export const Signup = async (email, password, role) => {
    try {
        const res = await axios.post("api/auth/signin", { email, password });
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}