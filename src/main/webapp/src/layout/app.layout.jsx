import React from "react";
import { Outlet } from "react-router-dom";
import authService from "../service/auth.service";
import Sidebar from "./sidebar";

export default function AppLayout() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}
