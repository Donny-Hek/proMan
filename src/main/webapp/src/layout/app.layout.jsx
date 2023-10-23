import React from "react";
import { Outlet } from "react-router-dom";
import authService from "../service/auth.service";
import Sidebar from "./sidebar";

export default function AppLayout() {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const user = await authService.getCurrentUser();
  //     if (!user) {
  //       navigate("/login");
  //     } else {
  //       // save user
  //       dispatch(setUser(user));
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, [navigate]);

  return (
    <div >
      <Sidebar />
    </div>
  );
}
