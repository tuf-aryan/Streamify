import React, { useState } from "react";
import { Ship } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance("/auth/signup", signUpData);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    mutate(); // calling mutate function
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 "
      data-theme="halloween"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO  */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Ship className="size-9 text-primary" />
            <span className="font-bold text-3xl font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              PolyTalk
            </span>
          </div>
          <div className=" w-full ">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Acccount</h2>
                  <p className="text-sm opacity-70">
                    Start PolyTalk and start your language learning adventure!
                  </p>
                </div>

                <div className="space-y-3">
                  {/*FullName */}
                  <div className="form-control w-full">
                    <label className="label"></label>{" "}
                    <span className="label-text">Full Name</span>
                    <input
                      type="text"
                      placeholder="Peter Parker"
                      className="input input-bordered w-full "
                      value={signUpData.fullName}
                      onChange={(e) => {
                        setSignUpData({
                          ...setSignUpData,
                          fullName: e.target.value,
                        });
                      }}
                      required
                    ></input>
                  </div>{" "}
                  {/*Email */}
                  <div className="form-control w-full">
                    <label className="label"> </label>{" "}
                    <span className="label-text">Email</span>
                    <input
                      type="email"
                      placeholder="peter@gmail.com"
                      className="input input-bordered w-full "
                      value={signUpData.email}
                      onChange={(e) => {
                        setSignUpData({
                          ...setSignUpData,
                          email: e.target.value,
                        });
                      }}
                      required
                    ></input>
                  </div>{" "}
                  {/*Password */}
                  <div className="form-control w-full">
                    <label className="label"></label>{" "}
                    <span className="label-text">Password</span>
                    <input
                      type="password"
                      placeholder="*****************"
                      className="input input-bordered w-full "
                      value={signUpData.password}
                      onChange={(e) => {
                        setSignUpData({
                          ...setSignUpData,
                          password: e.target.value,
                        });
                      }}
                      required
                    ></input>
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 charactar long
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button className="btn btn-primary w-full " type="submit">
                  {isPending ? "Signin up....." : "Create an Account"}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?
                    <Link to="/login" className="text-primary hover:underline">
                      {" "}
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/** Right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Find and connect with language partners within your campus
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
