import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { createUser } from "../services/api/users";
import { toast } from "react-toastify";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (registerData) => {
    const data = await createUser(registerData);
    if (data) {
      console.log(data);
      toast.success(data.message || "Registration successful!");
      reset();
      navigate("/login");
    } else {
      toast.error(data.message || "Registration failed. Please try again.");
    }
  };
 
  return (
    <div className="sm:flex items-center justify-around h-auto w-full bg-cover bg-[url('/img/r.jpg')] block sm:pt-0 pt-[20rem] ">
      <div className="">
        <h1 className=" font-bold text-gray-800 text-5xl text-center transform -rotate-12 mr-40">Welcome to Sarya's Stores</h1>
      </div>

      <div className="w-full max-w-3xl mt-5 mb-5 mr-3 p-8 space-y-6 bg-white/0 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-600">
          Get started with your account
        </p>

        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2">
            <div>
              <label
                htmlFor="register-first"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              {errors.firstName && (
                <p className="text-center text-red-500">
                  {errors.firstName.message}
                </p>
              )}
              <input
                id="register-first"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 5,
                  },
                })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="First Name"
              />
            </div>
            <div>
              <label
                htmlFor="register-second"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              {errors.lastName && (
                <p className="text-center text-red-500">
                  {errors.lastName.message}
                </p>
              )}
              <input
                id="register-second"
                type="text"
                {...register("lastName", {
                  required: "Last Name is required",
                  minLength: {
                    value: 5,
                  },
                })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label
                  htmlFor="register-email"
                className="block text-sm font-medium  text-gray-700"
              >
                Email
              </label>
              {errors.email && (
                <p className="text-center text-red-500">
                  {errors.email.message}
                </p>
              )}
              <input
                id="register-email"
                type="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <label
                htmlFor="register-phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              {errors.phone && (
                <p className="text-center text-red-500">
                  {errors.phone.message}
                </p>
              )}
              <input
                id="register-phone"
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 5,
                  },
                })}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="345678"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-center text-red-500">
                  {errors.password.message}
                </p>
              )}
              <input
                id="register-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="*********"
              />

              <button
                type="button"
                className="absolute right-3 bottom-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="text-center text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              <input
                id="register-confirm-password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  minLength: {
                    value: 5,
                  },
                })}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="*********"
              />
              <button
                type="button"
                className="absolute right-3 bottom-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="register-phone"
              className="block text-sm font-medium text-gray-700"
            >
              Home Address
            </label>
            {errors.address && (
              <p className="text-center text-red-500">
                {errors.address.message}
              </p>
            )}
            <input
              id="register-home-address"
              type="text"
              {...register("address", {
                required: "Home Address is required",
                minLength: {
                  value: 5,
                },
              })}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Home address"
            />

            <input
              type="hidden"
              value={"USER"}
              name="role"
              {...register("role")}
            />
          </div>

          <button
            type="submit"
            // disabled={!isValid}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting ? "bg-gray-300" : "bg-[#0B0500] hover:bg-[#D8F1A0] hover:text-black"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B0500]`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
