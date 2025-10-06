import React, { useState } from "react";
import Table from "../components/Table";
import TimesheetEntryModal from "../components/TimesheetEntryModal";

export default function TimeSheet() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className={`p-4 sm:p-6 ${isModalOpen ? "blur-sm" : ""}`}>
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-white">Time Sheet</h1>
          <button
            onClick={handleOpenModal}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Time Sheet Entry
          </button>
        </div>

        {/* Table Container with horizontal scroll for mobile */}
        <div className="overflow-x-auto">
          <Table />
        </div>
      </div>

      {/* Modal */}
      <TimesheetEntryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
