import React from "react";
import HomePage from "./HomePage";
import CallPage from "./CallPage";
import NotificationPage from "./NotificationPage";
import OnboardingPage from "./OnboardingPage";
import ChatPage from "./ChatPage";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import { Routes, Route } from "react-router";
import { axiosInstance } from "./lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
const App = () => {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false, // again fecthing api is stop if is faild
  });
  const authUser = authData?.user; // because in backend we send user

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login"></Navigate>}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/"></Navigate>}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/"></Navigate>}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login"></Navigate>}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login"></Navigate>}
        />
        <Route
          path="/notification"
          element={
            authUser ? <NotificationPage /> : <Navigate to="/login"></Navigate>
          }
        />
        <Route
          path="/onboarding"
          element={
            authUser ? <OnboardingPage /> : <Navigate to="/login"></Navigate>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
