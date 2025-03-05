import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import { Calendar, Trash2 } from 'lucide-react';
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium mb-1">
            Role<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 rounded-lg"
            placeholder="Add your role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium mb-1">
            Company<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 rounded-lg"
            placeholder="Add Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium mb-1">
            Company Website
          </label>
          <input
            type="url"
            className="w-full p-3 bg-gray-50 rounded-lg"
            placeholder="Add Company website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 rounded-lg"
            placeholder="Add Company location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              Start Date<span className="text-red-500">*</span>
            </label>
            <div className="relative date-picker-container">
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 bg-gray-50 rounded-lg pr-10"
                  placeholder="Aug 2022"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onClick={() => setShowStartCalendar(true)}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Calendar size={18} className="text-gray-400" />
                </div>
              </div>
              
              {showStartCalendar && (
                <div className="calendar-popup">
                  <div className="p-3 bg-white">
                    <div className="flex gap-3 mb-3">
                      <select 
                        className="flex-1 p-2 border rounded" 
                        value={startDate.split(' ')[0] || ''} 
                        onChange={(e) => {
                          const month = e.target.value;
                          const year = startDate.split(' ')[1] || new Date().getFullYear().toString();
                          setStartDate(`${month} ${year}`);
                        }}
                      >
                        <option value="" disabled>Month</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select 
                        className="flex-1 p-2 border rounded"
                        value={startDate.split(' ')[1] || ''} 
                        onChange={(e) => {
                          const year = e.target.value;
                          const month = startDate.split(' ')[0] || format(new Date(), 'MMM');
                          setStartDate(`${month} ${year}`);
                        }}
                      >
                        <option value="" disabled>Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="px-3 py-1 text-sm bg-gray-200 rounded"
                        onClick={() => setShowStartCalendar(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="px-3 py-1 text-sm bg-black text-white rounded"
                        onClick={() => setShowStartCalendar(false)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium mb-1">
              End Date<span className="text-red-500">*</span>
            </label>
            <div className="relative date-picker-container">
              {!isPresent && (
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-50 rounded-lg pr-10"
                    placeholder="Aug 2022"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onClick={() => setShowEndCalendar(true)}
                    required={!isPresent}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                </div>
              )}
              
              {showEndCalendar && !isPresent && (
                <div className="calendar-popup">
                  <div className="p-3 bg-white">
                    <div className="flex gap-3 mb-3">
                      <select 
                        className="flex-1 p-2 border rounded" 
                        value={endDate.split(' ')[0] || ''} 
                        onChange={(e) => {
                          const month = e.target.value;
                          const year = endDate.split(' ')[1] || new Date().getFullYear().toString();
                          setEndDate(`${month} ${year}`);
                        }}
                      >
                        <option value="" disabled>Month</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <select 
                        className="flex-1 p-2 border rounded"
                        value={endDate.split(' ')[1] || ''} 
                        onChange={(e) => {
                          const year = e.target.value;
                          const month = endDate.split(' ')[0] || format(new Date(), 'MMM');
                          setEndDate(`${month} ${year}`);
                        }}
                      >
                        <option value="" disabled>Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button 
                        type="button" 
                        className="px-3 py-1 text-sm bg-gray-200 rounded"
                        onClick={() => setShowEndCalendar(false)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="px-3 py-1 text-sm bg-black text-white rounded"
                        onClick={() => setShowEndCalendar(false)}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="present-checkbox"
                  className="mr-2"
                  checked={isPresent}
                  onChange={(e) => setIsPresent(e.target.checked)}
                />
                <label htmlFor="present-checkbox" className="text-sm">
                  Present
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {initialData && (
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-red-500 border border-red-500 rounded-lg"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
          <div className={initialData ? "" : "ml-auto"}>
            <Button type="submit">{initialData ? "Save Changes" : "Add Experience"}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal;