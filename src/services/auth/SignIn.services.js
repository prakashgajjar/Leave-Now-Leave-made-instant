import axios from "axios";
export const signInHandle = async (email, password) => {
    try {
        const res = await axios.post("api/auth/signin", { email, password });
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}