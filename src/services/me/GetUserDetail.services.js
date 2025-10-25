import axios from "axios";
export const getUserDetail = async () => {
    try {
        const res = await axios.get("/api/me");
        // console.log(res)
        if(res?.flag === false) return
        const data = await res.data;
        return data;
    } catch (error) {
        return error;
    }
}