import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../api";

const Register = () => {
  
    const navigate = useNavigate();
    const validationSchema = Yup.object({
      name: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
      address: Yup.string().min(10, "Address must be at least 10 characters").required("Address is required")
    });
  
    const registerFormik = useFormik({
        initialValues: {
          name: "",
          email: "",
          password: "",
          phone: "",
          address: ""
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          await API.post("/auth/register", values).then((res) => {
            console.log("Registration complete:", res.data);
            navigate("/home")
          });
        } catch (error) {
          console.error("Registration failed:", error); 
        }
      }
    });
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-[850px] h-[550px] bg-white shadow-xl rounded-md overflow-hidden">

        {/* LEFT BLUE SECTION */}
        <div className="w-1/3 bg-blue-600 p-8 flex flex-col justify-center text-white">
          <h2 className="text-3xl font-semibold mb-4">Looks like you're new here!</h2>
          <p className="text-sm text-gray-200">
            Sign up to get started with your Shopping Journey
          </p>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="w-2/3 bg-white p-10 flex flex-col justify-center">
          <form className="flex flex-col gap-4" onSubmit={registerFormik.handleSubmit}>

            <input
              type="text"
              placeholder="Enter Username"
              name="name"
              className="border p-3 rounded-md text-sm outline-none"
              value={registerFormik.values.name}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
              {registerFormik.touched.name && registerFormik.errors.name ? (
          <div style={{color: "red"}}>{registerFormik.errors.name}</div>
        ) : null}

            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              className="border p-3 rounded-md text-sm outline-none"
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
              {registerFormik.touched.email && registerFormik.errors.email ? (
          <div style={{color : "red"}}>{registerFormik.errors.email}</div>
        ) : null}

            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="border p-3 rounded-md text-sm outline-none"
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
             {registerFormik.touched.password && registerFormik.errors.password ? (
         <div style={{color: "red"}}>{registerFormik.errors.password}</div>
       ) : null}

            <input
              type="phone"
              placeholder="Enter Phone Number"
              name="phone"
              className="border p-3 rounded-md text-sm outline-none"
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
             {registerFormik.touched.password && registerFormik.errors.password ? (
         <div style={{color: "red"}}>{registerFormik.errors.password}</div>
       ) : null}
        <input
              type="address"
              placeholder="Enter Address"
              name="address"
              className="border p-3 rounded-md text-sm outline-none"
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
            />
             {registerFormik.touched.password && registerFormik.errors.password ? (
         <div style={{color: "red"}}>{registerFormik.errors.password}</div>
       ) : null}

            <button
              type="submit"
              className="bg-orange-500 text-white py-2 rounded-md font-medium mt-3 hover:bg-orange-600"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
