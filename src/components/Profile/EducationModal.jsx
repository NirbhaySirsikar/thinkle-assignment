import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";

const EducationModal = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  const [university, setUniversity] = useState(initialData?.company || "");
  const [degree, setDegree] = useState(initialData?.title || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [isPresent, setIsPresent] = useState(
    initialData?.endDate === "Present"
  );
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  // Set current date as end date if isPresent
  useEffect(() => {
    if (isPresent) {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "MMM yyyy");
      setEndDate(formattedDate);
    }
  }, [isPresent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const educationData = {
      id: initialData?.id || Date.now().toString(),
      logo: "https://via.placeholder.com/48",
      company: university,
      title: degree,
      website: website,
      startDate: startDate,
      endDate: isPresent ? "Present" : endDate,
      duration: calculateDuration(
        startDate,
        isPresent ? new Date().toISOString().split("T")[0] : endDate
      ),
    };

    onSave(educationData);
    onClose();
  };

  const calculateDuration = (start, end) => {
    try {
      const startParts = start.split(" ");
      const startYear = parseInt(startParts[startParts.length - 1]);

      let endYear;
      if (end === "Present") {
        endYear = new Date().getFullYear();
      } else {
        const endParts = end.split(" ");
        endYear = parseInt(endParts[endParts.length - 1]);
      }

      const years = endYear - startYear;

      if (years === 0) return "< 1 year";
      if (years === 1) return "1 year";
      return `${years} years`;
    } catch (e) {
      return "";
    }
  };

  const handleDelete = () => {
    if (onDelete && initialData?.id) {
      onDelete(initialData.id);
      onClose();
    }
  };

  const handleDateSelect = (date, isStart) => {
    const formattedDate = format(date, "MMM yyyy");
    if (isStart) {
      setStartDate(formattedDate);
      setShowStartCalendar(false);
    } else {
      setEndDate(formattedDate);
      setShowEndCalendar(false);
    }
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return format(date, "MMM");
  });

  // Generate year options (from 1960 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1960 + 1 },
    (_, i) => currentYear - i
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Education" : "Add Education"}
    >
      <form onSubmit={handleSubmit} className="">
        <div className="form-group">
          <label className="">
            College/University<span className="">*</span>
          </label>
          <input
            type="text"
            className=""
            placeholder="Add College/University name"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="">
            Degree<span className="">*</span>
          </label>
          <input
            type="text"
            className=""
            placeholder="Add Degree name"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="">College/University Website</label>
          <input
            type="url"
            className=""
            placeholder="Add website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="date-picker-group">
          <div className="form-group">
            <label className="">
              Start Date<span className="">*</span>
            </label>
            <div className="date-picker-container">
              <input
                type="date"
                className=""
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="">
              End Date<span className="">*</span>
            </label>
            <div className="date-picker-container">
              {!isPresent && (
                <input
                  type="date"
                  className=""
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required={!isPresent}
                />
              )}
            </div>
          </div>
          <div className="">
            <input
              type="checkbox"
              id="present-checkbox"
              className=""
              checked={isPresent}
              onChange={(e) => setIsPresent(e.target.checked)}
            />
            <label htmlFor="present-checkbox" className="">
              Present
            </label>
          </div>
        </div>

        <div className="">
          {initialData && (
            <Button type="destructive" className="" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="">
            <Button type="submit">
              {initialData ? "Save Changes" : "Add Education"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EducationModal;
