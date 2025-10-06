import React, { useState } from "react";
import { apiRequest } from "../api/api";

export default function TimesheetEntryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    projectId: "",
    date: "",
    durationInMins: "",
    dayofWeek: "",
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-calculate day of week when date changes
    if (name === "date" && value) {
      const selectedDate = new Date(value);
      const dayOfWeek =
        daysOfWeek[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1];
      setFormData((prev) => ({
        ...prev,
        dayofWeek: dayOfWeek,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.projectId && formData.date && formData.durationInMins) {
      const body = {
        ...formData,
        durationInMins: parseInt(formData.durationInMins),
      };
      try {
        const response = await apiRequest(
          "timecard/addtimecard",
          "POST",
          true,
          false,
          body
        );
        console.log("User signed in successfully:", response);
        // Redirect to home/watch after successful sign-in
      } catch (error) {
        console.error("Error while creating time card:", error);
      }
      console.log("New timesheet entry:", body);
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      projectId: "",
      date: "",
      durationInMins: "",
      dayofWeek: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleBackdropClick = (e) => {
    // Close modal if clicking on backdrop (not on modal content)
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-600">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Add Time Sheet Entry
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project ID */}
            <div>
              <label
                htmlFor="projectId"
                className="block text-sm font-medium text-white mb-2"
              >
                Project ID
              </label>
              <input
                type="number"
                id="projectId"
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter project ID"
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-white mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Day of Week (Auto-calculated, read-only) */}
            <div>
              <label
                htmlFor="dayofWeek"
                className="block text-sm font-medium text-white mb-2"
              >
                Day of Week
              </label>
              <input
                type="text"
                id="dayofWeek"
                name="dayofWeek"
                value={formData.dayofWeek}
                readOnly
                className="w-full px-3 py-2 bg-gray-600 border border-gray-600 rounded-md text-gray-300 cursor-not-allowed"
                placeholder="Auto-calculated from date"
              />
            </div>

            {/* Duration in Minutes */}
            <div>
              <label
                htmlFor="durationInMins"
                className="block text-sm font-medium text-white mb-2"
              >
                Duration (minutes)
              </label>
              <input
                type="number"
                id="durationInMins"
                name="durationInMins"
                value={formData.durationInMins}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter duration in minutes"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full px-4 py-2 text-gray-300 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
