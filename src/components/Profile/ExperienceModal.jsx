import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Button from "../Button";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";

// Helper arrays for months/years
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

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1960; y--) {
    years.push(y.toString());
  }
  return years;
};
const years = getYears();

// Functions to parse "MMM yyyy" strings into separate month/year
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

const ExperienceModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
}) => {
  // Dropdowns for Role & Company
  const roleOptions = [
    "Software Engineer",
    "Product Manager",
    "Designer",
    "Data Scientist",
  ];
  const companyOptions = ["Google", "Microsoft", "Amazon", "Facebook"];

  // Parse initial month/year for start & end
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

  const [role, setRole] = useState(initialData?.title || "");
  const [company, setCompany] = useState(initialData?.company || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [location, setLocation] = useState(initialData?.location || "");

  // Start date (month/year)
  const [startMonth, setStartMonth] = useState(initialStartMonth);
  const [startYear, setStartYear] = useState(initialStartYear);

  // End date (month/year)
  const [endMonth, setEndMonth] = useState(initialEndMonth);
  const [endYear, setEndYear] = useState(initialEndYear);

  const [isPresent, setIsPresent] = useState(
    initialData?.endDate === "Present"
  );

  // If "Present" is checked, clear out endMonth/endYear
  useEffect(() => {
    if (isPresent) {
      setEndMonth("");
      setEndYear("");
    }
  }, [isPresent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct final date strings
    const startDate =
      startMonth && startYear ? `${startMonth} ${startYear}` : "";
    const endDate = isPresent
      ? "Present"
      : endMonth && endYear
      ? `${endMonth} ${endYear}`
      : "";

    const experienceData = {
      id: initialData?.id || Date.now().toString(),
      logo: "https://via.placeholder.com/48",
      company,
      title: role,
      location,
      website,
      startDate,
      endDate,
      duration: calculateDuration(startDate, endDate),
    };

    onSave(experienceData);
    onClose();
  };

  const calculateDuration = (start, end) => {
    try {
      const startParts = start.split(" ");
      const startYear = parseInt(startParts[startParts.length - 1], 10);

      let endYearVal;
      if (end === "Present") {
        endYearVal = new Date().getFullYear();
      } else {
        const endParts = end.split(" ");
        endYearVal = parseInt(endParts[endParts.length - 1], 10);
      }

      const yearsDiff = endYearVal - startYear;
      if (yearsDiff <= 0) return "< 1 year";
      if (yearsDiff === 1) return "1 year";
      return `${yearsDiff} years`;
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Experience" : "Add Experience"}
    >
      <form onSubmit={handleSubmit}>
        {/* Role Dropdown */}
        <div className="form-group">
          <label>
            Role<span>*</span>
          </label>
          <div className="select-wrapper">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={16} />
          </div>
        </div>

        {/* Company Dropdown */}
        <div className="form-group">
          <label>
            Company<span>*</span>
          </label>
          <div className="select-wrapper">
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            >
              <option value="">Select Company</option>
              {companyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={16} />
          </div>
        </div>

        <div className="form-group">
          <label>Company Website</label>
          <input
            type="url"
            placeholder="Add Company website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Add Company location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Start/End Date Dropdowns */}
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

            {!isPresent && (
          <div className="form-group">
            <label>
              End Date<span>*</span>
            </label>
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
          </div>
            )}

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

        <div className="modal-actions-group">
          {initialData && (
            <Button type="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div>
            <Button type="submit">
              {initialData ? "Save Changes" : "Add Experience"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal;
