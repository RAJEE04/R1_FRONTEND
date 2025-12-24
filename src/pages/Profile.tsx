import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

/* ================= VALIDATIONS ================= */
const ProfileSchema = Yup.object({
  name: Yup.string().min(3, "Min 3 characters").required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
});

const PasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editing, setEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await API.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load profile", "error");
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }

  /* ================= UPDATE PROFILE ================= */
  const handleProfileSubmit = async (values: UserProfile) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.put("/auth/profile", values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(res.data.user);
      setEditing(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile was updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Profile update failed", "error");
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handlePasswordSubmit = async (
    values: { oldPassword: string; newPassword: string },
    resetForm: () => void
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await API.put("/auth/change-password", values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: "Your password was updated successfully",
      });

      resetForm();
      setShowPasswordModal(false);
    } catch (err) {
      Swal.fire("Error", "Failed to change password", "error");
    }
  };

  /* ================= RENDER ================= */
  const renderField = (label: string, value: string, name: string) => (
    <div className="flex items-center gap-4 mb-2">
      <span className="font-medium w-28">{label}:</span>
      {!editing ? (
        <p className="bg-gray-50 flex-1 p-2 rounded">{value}</p>
      ) : (
        <div className="flex-1">
          <Field name={name} className="w-full border p-2 rounded" />
          <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <Formik
          enableReinitialize
          initialValues={profile}
          validationSchema={ProfileSchema}
          onSubmit={handleProfileSubmit}
        >
          <Form className="space-y-4">
            {renderField("Name", profile.name, "name")}
            {renderField("Email", profile.email, "email")} {/* always read-only */}
            {renderField("Phone", profile.phone, "phone")}
            {renderField("Address", profile.address, "address")}

            {/* ACTIONS */}
            <div className="flex gap-3 pt-4">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Change Password
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="font-bold mb-4">Change Password</h2>

            <Formik
              initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
              validationSchema={PasswordSchema}
              onSubmit={(values, { resetForm }) =>
                handlePasswordSubmit(values, resetForm)
              }
            >
              <Form className="space-y-4">
                {["oldPassword", "newPassword", "confirmPassword"].map((f) => (
                  <div key={f}>
                    <Field
                      type={showPwd ? "text" : "password"}
                      name={f}
                      placeholder={f}
                      className="w-full border p-2 rounded"
                    />
                    <ErrorMessage name={f} component="div" className="text-red-500 text-sm" />
                  </div>
                ))}

                <label className="flex gap-2 items-center text-sm">
                  <input type="checkbox" onChange={() => setShowPwd(!showPwd)} />
                  Show password
                </label>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Profile;
