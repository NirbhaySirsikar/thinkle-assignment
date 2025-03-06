import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { format } from 'date-fns';


const ExperienceModal = ({ isOpen, onClose, onSave, onDelete, initialData }) => {
  const [role, setRole] = useState(initialData?.title || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || '');
  const [endDate, setEndDate] = useState(initialData?.endDate || '');
  const [isPresent, setIsPresent] = useState(initialData?.endDate === 'Present');
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  // Set current date as end date if isPresent
  useEffect(() => {
    if (isPresent) {
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'MMM yyyy');
      setEndDate(formattedDate);
    }
  }, [isPresent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const experienceData = {
      id: initialData?.id || Date.now().toString(),
      logo: 'https://via.placeholder.com/48',
      company: company,
      title: role,
      location: location,
      website: website,
      startDate: startDate,
      endDate: isPresent ? 'Present' : endDate,
      duration: calculateDuration(startDate, isPresent ? new Date().toISOString().split('T')[0] : endDate)
    };
    
    onSave(experienceData);
    onClose();
  };

  const calculateDuration = (start, end) => {
    try {
      const startParts = start.split(' ');
      const startYear = parseInt(startParts[startParts.length - 1]);
      
      let endYear;
      if (end === 'Present') {
        endYear = new Date().getFullYear();
      } else {
        const endParts = end.split(' ');
        endYear = parseInt(endParts[endParts.length - 1]);
      }
      
      const years = endYear - startYear;
      
      if (years === 0) return '< 1 year';
      if (years === 1) return '1 year';
      return `${years} years`;
    } catch (e) {
      return '';
    }
  };

  const handleDelete = () => {
    if (onDelete && initialData?.id) {
      onDelete(initialData.id);
      onClose();
    }
  };

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return format(date, 'MMM');
  });

  // Generate year options (from 1960 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1960 + 1 }, (_, i) => currentYear - i);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Experience" : "Add Experience"}>
      <form onSubmit={handleSubmit} className="">
        <div className="form-group">
          <label className="">
            Role<span className="">*</span>
          </label>
          <input
            type="text"
            className=""
            placeholder="Add your role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="">
            Company<span className="">*</span>
          </label>
          <input
            type="text"
            className=""
            placeholder="Add Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="">
            Company Website
          </label>
          <input
            type="url"
            className=""
            placeholder="Add Company website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="">
            Location
          </label>
          <input
            type="text"
            className=""
            placeholder="Add Company location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
              className="present-checkbox"
              checked={isPresent}
              onChange={(e) => setIsPresent(e.target.checked)}
            />
            <label htmlFor="present-checkbox" className="">
              Present
            </label>
          </div>
        </div>

        <div className="modal-actions-group">
          {initialData && (
            <Button type="destructive" className="" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="">
            <Button type="submit">{initialData ? "Save Changes" : "Add Experience"}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal;