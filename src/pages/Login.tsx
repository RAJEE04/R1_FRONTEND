import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await API.post("/auth/login", values);
        console.log(res.data)

          // Save token and username
          localStorage.setItem("token", res.data.token);
          console.log(res.data)
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("username", res.data.user.name);   

        navigate("/home");
        // window.location.reload(); // so navbar updates
      } catch (error) {
        alert("Invalid credentials");
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-[850px] h-[500px] bg-white shadow-xl rounded-md overflow-hidden">
        <div className="w-1/3 bg-blue-600 p-8 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>

        <div className="w-2/3 p-8 flex flex-col justify-center">
          <form className="flex flex-col gap-4" onSubmit={loginFormik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              className="border p-3 rounded-md"
            />
            {loginFormik.touched.email && loginFormik.errors.email && (
              <p className="text-red-500 text-sm">{loginFormik.errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              className="border p-3 rounded-md"
            />
            {loginFormik.touched.password && loginFormik.errors.password && (
              <p className="text-red-500 text-sm">{loginFormik.errors.password}</p>
            )}

            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
            >
              Login
            </button>
          </form>

          <p className="text-sm mt-4">
            New to Flipkart?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
