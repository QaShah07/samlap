// frontend/src/pages/ContactForm.tsx

import React, { useState } from "react";
import api from "../services/api";

// 1. Define possible user types and purposes as arrays of { label, value }
const USER_TYPE_OPTIONS = [
  { label: "Select your role", value: "" },
  { label: "Student", value: "student" },
  { label: "Professional", value: "professional" },
  { label: "Other", value: "other" },
];

const PURPOSE_OPTIONS = [
  { label: "Select an option", value: "" },
  { label: "General Inquiry", value: "general_inquiry" },
  { label: "Collaboration", value: "collaboration" },
  { label: "Job Opportunity", value: "job_opportunity" },
  { label: "Other", value: "other" },
];

// 2. Define the form data interface
interface ContactFormData {
  name: string;
  email: string;
  user_type: "student" | "professional" | "other" | "";
  institution_name: string;      // Used if user_type === "student"
  organization_name: string;     // Used if user_type === "professional"
  other_description: string;     // Used if user_type === "other"
  purpose_of_contact: string;
  comment: string;
}

const ContactForm: React.FC = () => {
  // 3. Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    user_type: "",
    institution_name: "",
    organization_name: "",
    other_description: "",
    purpose_of_contact: "",
    comment: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 4. Handle changes to any input/select/textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 5. Validate before submitting
  const validateForm = (): boolean => {
    const {
      name,
      email,
      user_type,
      institution_name,
      organization_name,
      other_description,
      purpose_of_contact,
      comment,
    } = formData;

    if (!name.trim() || !email.trim() || !user_type || !purpose_of_contact || !comment.trim()) {
      setError("All fields are required.");
      return false;
    }

    // Based on user_type, require the corresponding field:
    if (user_type === "student" && !institution_name.trim()) {
      setError("Please enter your institution name (Student).");
      return false;
    }
    if (user_type === "professional" && !organization_name.trim()) {
      setError("Please enter your organization name (Professional).");
      return false;
    }
    if (user_type === "other" && !other_description.trim()) {
      setError("Please describe your role (Other).");
      return false;
    }

    return true;
  };

  // 6. Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // Build payload: pick either institution_name, organization_name, or other_description
      const payload = {
        name: formData.name,
        email: formData.email,
        user_type: formData.user_type,
        institution_name:
          formData.user_type === "student" ? formData.institution_name : "",
        organization_name:
          formData.user_type === "professional" ? formData.organization_name : "",
        other_description:
          formData.user_type === "other" ? formData.other_description : "",
        purpose_of_contact: formData.purpose_of_contact,
        comment: formData.comment,
      };

      await api.post("/contact/", payload);
      setSuccessMsg("Your submission has been received. Thank you!");
      // Clear the form
      setFormData({
        name: "",
        email: "",
        user_type: "",
        institution_name: "",
        organization_name: "",
        other_description: "",
        purpose_of_contact: "",
        comment: "",
      });
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        err.response?.data?.detail ||
          "An error occurred. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen py-12">
      <div className="w-full max-w-lg px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 text-green-700 bg-green-100 p-3 rounded">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-blue-100 placeholder-blue-400 rounded-xl focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-blue-100 placeholder-blue-400 rounded-xl focus:outline-none"
            />
          </div>

          {/* User Type */}
          <div>
            <label
              htmlFor="user_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Type
            </label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-blue-100 rounded-xl focus:outline-none appearance-none"
            >
              {USER_TYPE_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={!opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional Field: Institution Name */}
          {formData.user_type === "student" && (
            <div>
              <label
                htmlFor="institution_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Institution Name
              </label>
              <input
                type="text"
                id="institution_name"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                placeholder="Enter your institution name"
                className="w-full px-4 py-3 bg-blue-100 placeholder-blue-400 rounded-xl focus:outline-none"
              />
            </div>
          )}

          {/* Conditional Field: Organization Name */}
          {formData.user_type === "professional" && (
            <div>
              <label
                htmlFor="organization_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Name
              </label>
              <input
                type="text"
                id="organization_name"
                name="organization_name"
                value={formData.organization_name}
                onChange={handleChange}
                placeholder="Enter your organization name"
                className="w-full px-4 py-3 bg-blue-100 placeholder-blue-400 rounded-xl focus:outline-none"
              />
            </div>
          )}

          {/* Conditional Field: Other Description */}
          {formData.user_type === "other" && (
            <div>
              <label
                htmlFor="other_description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Describe Your Role
              </label>
              <input
                type="text"
                id="other_description"
                name="other_description"
                value={formData.other_description}
                onChange={handleChange}
                placeholder="Provide your role or description"
                className="w-full px-4 py-3 bg-blue-100 placeholder-blue-400 rounded-xl focus:outline-none"
              />
            </div>
          )}

          {/* Purpose of Contact */}
          <div>
            <label
              htmlFor="purpose_of_contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Purpose of contact
            </label>
            <select
              id="purpose_of_contact"
              name="purpose_of_contact"
              value={formData.purpose_of_contact}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-blue-100 rounded-xl focus:outline-none appearance-none"
            >
              {PURPOSE_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  disabled={!opt.value}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Comment Box */}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Comments
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Provide additional details or specific inquiries"
              className="w-full px-4 py-3 bg-blue-100 placeholder-blue-400 rounded-xl focus:outline-none resize-none h-32"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`
              w-full py-3 text-white font-medium rounded-full 
              ${submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}
              focus:outline-none
            `}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
