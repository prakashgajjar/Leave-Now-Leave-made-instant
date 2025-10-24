import axios from "axios";
export const SignupHandle = async (email, password, role,name) => {
    try {
        const res = await axios.post("api/auth/signup", { email, password,role,name });
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}