import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    //TODO
    const requestOptions = {
      headers: {
        "x-project":
          "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
        "content-type": "application/json",
      },
    
      method: "POST",
      body: JSON.stringify({
        email: "adminreacttask@manaknight.com",
        password: "a123456",
        role: "admin",
      }),
    };
    let datatoreturn = "";

    try {
      fetch("https://reacttask.mkdlabs.com/v2/api/lambda/login", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          datatoreturn = data;
          console.log("data", data);
          localStorage.setItem("token", data.token);

          const request = {
            headers: {
              "x-project":
                "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
              Authorization: "Bearer " + localStorage.getItem("token"),
              "content-type": "application/json",
            },
            // body: JSON.stringify({
            //   email: email,
            //   password: password,
            //   role: role,
            // }),
            method: "POST",
            body: JSON.stringify({
              role: "admin",
            }),
          };

          fetch("https://reacttask.mkdlabs.com/v2/api/lambda/check", request)
            .then((response) => response.json())
            .then((data) => {
              datatoreturn = data;
              console.log("data", data);
              navigate("/admin/dashboard");
            })
            .catch(function (error) {
              console.log(error);
            });
          // navigate("/admin/dashboard");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch {
      (function (error) {
        console.log(JSON.stringify(error));
      });
    }
    return datatoreturn;
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-nred-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
