import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";

// Same months array from ExperienceModal
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Same getYears function from ExperienceModal
const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1960; y--) {
    years.push(y.toString());
  }
  return years;
};
const years = getYears();

// Helper to parse "MMM yyyy" into separate month/year
const parseMonth = (dateString) => {
  if (!dateString) return "";
  const [m] = dateString.split(" ");
  return months.includes(m) ? m : "";
};
const parseYear = (dateString) => {
  if (!dateString) return "";
  const parts = dateString.split(" ");
  const y = parts[parts.length - 1];
  return years.includes(y) ? y : "";
};

// Sample dropdown options for college/university and degree
const collegeOptions = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "UC Berkeley",
];
const degreeOptions = [
  "B.Sc. in Computer Science",
  "B.A. in Economics",
  "MBA",
  "Ph.D.",
];

const EducationModal = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  // Convert existing data into local state
  // Notice we reuse the same property names as your existing data:
  //  - initialData.company -> university
  //  - initialData.title   -> degree
  const initialCollege = initialData?.company || "";
  const initialDegree = initialData?.title || "";
  const initialWebsite = initialData?.website || "";

  // Parse "MMM yyyy" strings into separate month/year
  const initialStartMonth = initialData?.startDate
    ? parseMonth(initialData.startDate)
    : "";
  const initialStartYear = initialData?.startDate
    ? parseYear(initialData.startDate)
    : "";
  const initialEndMonth =
    initialData?.endDate && initialData.endDate !== "Present"
      ? parseMonth(initialData.endDate)
      : "";
  const initialEndYear =
    initialData?.endDate && initialData.endDate !== "Present"
      ? parseYear(initialData.endDate)
      : "";

  // State
  const [university, setUniversity] = useState(initialCollege);
  const [degree, setDegree] = useState(initialDegree);
  const [website, setWebsite] = useState(initialWebsite);

  const [startMonth, setStartMonth] = useState(initialStartMonth);
  const [startYear, setStartYear] = useState(initialStartYear);

  const [endMonth, setEndMonth] = useState(initialEndMonth);
  const [endYear, setEndYear] = useState(initialEndYear);

  const [isPresent, setIsPresent] = useState(
    initialData?.endDate === "Present"
  );

  // If "Present" is checked, clear out end month/year
  useEffect(() => {
    if (isPresent) {
      setEndMonth("");
      setEndYear("");
    }
  }, [isPresent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct "MMM yyyy" or "Present"
    const startDate =
      startMonth && startYear ? `${startMonth} ${startYear}` : "";
    const endDate = isPresent
      ? "Present"
      : endMonth && endYear
      ? `${endMonth} ${endYear}`
      : "";

    const educationData = {
      id: initialData?.id || Date.now().toString(),
      logo: "https://via.placeholder.com/48",
      // Reuse these property names:
      company: university,
      title: degree,
      website,
      startDate,
      endDate,
      duration: calculateDuration(startDate, endDate),
    };

    onSave(educationData);
    onClose();
  };

  // Same "years difference" logic from your ExperienceModal
  const calculateDuration = (start, end) => {
    try {
      const startParts = start.split(" ");
      const startYearVal = parseInt(startParts[startParts.length - 1], 10);

      let endYearVal;
      if (end === "Present") {
        endYearVal = new Date().getFullYear();
      } else {
        const endParts = end.split(" ");
        endYearVal = parseInt(endParts[endParts.length - 1], 10);
      }

      const diff = endYearVal - startYearVal;
      if (diff <= 0) return "< 1 year";
      if (diff === 1) return "1 year";
      return `${diff} years`;
    } catch (err) {
      return "";
    }
  };

  const handleDelete = () => {
    if (onDelete && initialData?.id) {
      onDelete(initialData.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Education" : "Add Education"}
    >
      <form onSubmit={handleSubmit}>
        {/* College/University dropdown */}
        <div className="form-group">
          <label>
            College/University<span>*</span>
          </label>
          <div className="select-wrapper">
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            >
              <option value="">Select College/University</option>
              {collegeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={16} />
          </div>
        </div>

        {/* Degree dropdown */}
        <div className="form-group">
          <label>
            Degree<span>*</span>
          </label>
          <div className="select-wrapper">
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            >
              <option value="">Select Degree</option>
              {degreeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={16} />
          </div>
        </div>

        {/* Website input */}
        <div className="form-group">
          <label>College/University Website</label>
          <input
            type="url"
            placeholder="Add website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Start/End Date dropdowns + Present checkbox */}
        <div className="date-picker-group">
          <div className="form-group">
            <label>
              Start Date<span>*</span>
            </label>
            <div className="date-dropdowns">
              <div className="select-wrapper">
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  required
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>

              <div className="select-wrapper">
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  required
                >
                  <option value="">Year</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="select-icon" size={16} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              End Date<span>*</span>
            </label>
            {!isPresent && (
              <div className="date-dropdowns">
                <div className="select-wrapper">
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                    required
                  >
                    <option value="">Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>

                <div className="select-wrapper">
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    required
                  >
                    <option value="">Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={16} />
                </div>
              </div>
            )}
          </div>

          <div>
            <input
              type="checkbox"
              className="present-checkbox"
              checked={isPresent}
              onChange={(e) => setIsPresent(e.target.checked)}
              id="present-checkbox"
            />
            <label htmlFor="present-checkbox">Present</label>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions-group">
          {initialData && (
            <Button type="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div>
            <Button type="primary">
              {initialData ? "Save Changes" : "Add Education"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EducationModal;
