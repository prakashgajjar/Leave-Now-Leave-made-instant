"use client";
import Loader from "@/components/animations/Loader";
import HomePage from "@/components/ui/Home";
import StudentDashboard from "@/components/ui/StudentDashboard";
import { getUserDetail } from "@/services/me/GetUserDetail.services";
import { Home } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Page = () => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetail1 = async () => {
      try {
        const data = await getUserDetail();
        // console.log("data", data);

        if (data?.flag === true && data?.user) {
          setUserDetail({
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetail1();
  }, []);

  if (loading) {
    return (
    <Loader show={true}/>
    );
  }

  return <HomePage userRole={userDetail.role} />;
};

export default Page;
