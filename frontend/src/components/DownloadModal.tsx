import React, { useState } from "react";
import api from "../services/api";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;

  // Which resource is being downloaded:
  resourceType: "paper" | "dataset" | "code";
  resourceSlug: string; // unique slug, e.g. "impact-monetary-policy-inflation"
  resourceName: string; // e.g. "The Impact of Monetary Policy on Inflation in India"
  downloadUrl: string;  // direct link: PDF, Excel, CSV, or external URL
}

interface FormData {
  name: string;
  email: string;
  user_type: "student" | "professional" | "other" | "";
  institution_name: string;
  organization_name: string;
  other_description: string;
  purpose_of_contact: string;
}

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

const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  resourceType,
  resourceSlug,
  resourceName,
  downloadUrl,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    user_type: "",
    institution_name: "",
    organization_name: "",
    other_description: "",
    purpose_of_contact: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update formData on change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation before submit
  const validate = (): boolean => {
    const {
      name,
      email,
      user_type,
      institution_name,
      organization_name,
      other_description,
      purpose_of_contact,
    } = formData;

    if (!name.trim() || !email.trim() || !user_type || !purpose_of_contact) {
      setError("All fields are required.");
      return false;
    }
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

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      // Build payload
      const payload = {
        name: formData.name,
        email: formData.email,
        user_type: formData.user_type,
        institution_name:
          formData.user_type === "student" ? formData.institution_name : "",
        organization_name:
          formData.user_type === "professional"
            ? formData.organization_name
            : "",
        other_description:
          formData.user_type === "other"
            ? formData.other_description
            : "",
        purpose_of_contact: formData.purpose_of_contact,
        comment: "", // no comment for this modal
        resource_type: resourceType,
        resource_slug: resourceSlug,
        resource_name: resourceName,
      };

      // POST to backend
      await api.post("/downloads/", payload);

      // Trigger actual file download (open in new tab)
      window.open(downloadUrl, "_blank");

      // Close modal
      onClose();
    } catch (err: any) {
      console.error("Download submission error", err);
      setError(
        err.response?.data?.detail || "Submission failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Don’t render if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">Download: {resourceName}</h2>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* User Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Type
            </label>
            <select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none"
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

          {/* Conditional: Institution Name */}
          {formData.user_type === "student" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none"
                placeholder="Enter your institution name"
              />
            </div>
          )}

          {/* Conditional: Organization Name */}
          {formData.user_type === "professional" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                name="organization_name"
                value={formData.organization_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none"
                placeholder="Enter your organization name"
              />
            </div>
          )}

          {/* Conditional: Other Description */}
          {formData.user_type === "other" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Description
              </label>
              <input
                type="text"
                name="other_description"
                value={formData.other_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-xl focus:outline-none"
                placeholder="Describe your role"
              />
            </div>
          )}

          {/* Purpose of Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <select
              name="purpose_of_contact"
              value={formData.purpose_of_contact}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-xl focus:outline-none"
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

          {/* Download Button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className={`
                w-full py-3 text-white font-medium rounded-full
                ${submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}
                focus:outline-none
              `}
            >
              {submitting ? "Processing..." : "Download"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DownloadModal;
