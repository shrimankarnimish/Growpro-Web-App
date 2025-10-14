import React, { useState } from 'react';

const StepperCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    staffPhoneNumber: '',
    address: '',
    systemType: '',
    systemTypeOther: '',
    numPlants: '',
    numLevels: '',
    setupDimension: '',
    motorType: '',
    motorTypeOther: '',
    timerUsed: '',
    timerUsedOther: '',
    numLights: '',
    lightModel: '',
    lightLength: '',
    tankCapacity: '',
    tankCapacityOther: '',
    nutritionGiven: '',
    otherSpecs: '',
    photoAtInstallation: null,
    plantsChosen: [],
    plantsChosenOther: ''
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const systemTypes = ['Small Grower', 'Long Grower', 'Mini Pro Grower', 'Semi Pro Grower', 'Pro Grower', 'Vertical Outdoor Grower', 'Flat Bed', 'Indoor Grower', 'Furniture Integrated Grower', 'Mini Grower', 'Dutch Bucket', 'Growbags', 'Microgreen Racks', 'Other'];
  const motorTypes = ['Small Motor (10W)', 'Big Motor (40W)', 'Other'];
  const timerOptions = ['Digital', 'Cyclic-15 mins', 'TS1W1', '800XC', 'Other'];
  const plants = ['Spinach', 'Methi', 'Coriander', 'Red Amaranthus', 'Radish Leaves', 'Mustard Leaves', 'Mint', 'Peppermint', 'Italian Basil', 'Thai Basil', 'Lemon Basil', 'Celery', 'Parsley', 'Ajwain', 'Oregano', 'Thyme', 'Rosemary', 'Sage', 'Iceberg Lettuce', 'Lollo Rosso Lettuce', 'Romaine Lettuce', 'Butterhead Lettuce', 'Curly Kale', 'Rocket Arugula', 'Pak Choi', 'Endives', 'Red Sorrell', 'Desi Tomatoes', 'Cherry Tomatoes', 'San Marzano Tomatoes', 'Chili', 'Bhindi', 'Dudhi', 'Zucchini', 'Brinjal', 'Jalapenos', 'Cauliflower', 'Cucumber', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photoAtInstallation: e.target.files[0] }));
    setErrors(prev => ({ ...prev, photoAtInstallation: '' }));
  };

  const handlePlantToggle = (plant) => {
    setFormData(prev => ({
      ...prev,
      plantsChosen: prev.plantsChosen.includes(plant)
        ? prev.plantsChosen.filter(p => p !== plant)
        : [...prev.plantsChosen, plant]
    }));
    setErrors(prev => ({ ...prev, plantsChosen: '' }));
  };

  // Validation
  const validateStep = () => {
    let stepErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) stepErrors.name = 'Name is required';
      if (!formData.phoneNumber.trim()) stepErrors.phoneNumber = 'Phone number is required';
      else if (!/^\d{10}$/.test(formData.phoneNumber)) stepErrors.phoneNumber = 'Phone number must be 10 digits';
      if (formData.staffPhoneNumber && !/^\d{10}$/.test(formData.staffPhoneNumber)) stepErrors.staffPhoneNumber = 'Staff phone number must be 10 digits';
      if (!formData.address.trim()) stepErrors.address = 'Address is required';
    }

    if (currentStep === 2) {
      if (!formData.systemType) stepErrors.systemType = 'System type is required';
      if (formData.systemType === 'Other' && !formData.systemTypeOther.trim()) stepErrors.systemTypeOther = 'Please specify other system type';
      if (!formData.numPlants) stepErrors.numPlants = 'Number of plants is required';
      else if (parseInt(formData.numPlants) < 0) stepErrors.numPlants = 'Number of plants cannot be negative';
      if (!formData.numLevels) stepErrors.numLevels = 'Number of levels is required';
      else if (parseInt(formData.numLevels) < 0) stepErrors.numLevels = 'Number of levels cannot be negative';
      if (!formData.setupDimension.trim()) stepErrors.setupDimension = 'Setup dimension is required';
      if (!formData.motorType) stepErrors.motorType = 'Motor type is required';
      if (formData.motorType === 'Other' && !formData.motorTypeOther.trim()) stepErrors.motorTypeOther = 'Please specify other motor type';
      if (!formData.timerUsed) stepErrors.timerUsed = 'Timer used is required';
      if (formData.timerUsed === 'Other' && !formData.timerUsedOther.trim()) stepErrors.timerUsedOther = 'Please specify other timer';
    }

    if (currentStep === 3) {
      if (formData.plantsChosen.length === 0) stepErrors.plantsChosen = 'Please select at least one plant';
      if (formData.plantsChosen.includes('Other') && !formData.plantsChosenOther.trim()) stepErrors.plantsChosenOther = 'Please specify other plants';
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  if (validateStep()) {
    console.log('Form Data:', formData);

    // Get existing customers from localStorage
    const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];

    // Append new customer
    const updatedCustomers = [...existingCustomers, formData];

    // Save back to localStorage
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));

    alert('Customer created successfully!');

    // Reset form
    setFormData({
      name: '',
      phoneNumber: '',
      staffPhoneNumber: '',
      address: '',
      systemType: '',
      systemTypeOther: '',
      numPlants: '',
      numLevels: '',
      setupDimension: '',
      motorType: '',
      motorTypeOther: '',
      timerUsed: '',
      timerUsedOther: '',
      numLights: '',
      lightModel: '',
      lightLength: '',
      tankCapacity: '',
      tankCapacityOther: '',
      nutritionGiven: '',
      otherSpecs: '',
      photoAtInstallation: null,
      plantsChosen: [],
      plantsChosenOther: ''
    });
    setErrors({});
    setCurrentStep(1); // start from step 1
  }
};


  const nextStep = () => {
    if (validateStep()) setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const StepperHeader = () => (
    <div className="flex overflow-x-auto md:overflow-visible space-x-4 md:space-x-0 justify-between mb-8 pl-4 md:pl-0">
      {[1, 2, 3].map((step, idx) => (
        <div key={step} className="flex-1 flex flex-col items-center min-w-[70px] relative">
          {idx !== 0 && (
            <div className="absolute left-0 top-5 w-full h-1 bg-gray-200 -z-10"></div>
          )}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold transition-all duration-300 
            ${currentStep === step ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-gray-300'}`}
          >
            {step}
          </div>
          <div className="text-xs mt-2 text-gray-700 font-medium text-center">
            {step === 1 ? 'Customer' : step === 2 ? 'Grower' : 'Plants'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name"
                className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter phone number"
                className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.phoneNumber ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.phoneNumber && <span className="text-red-500 text-sm mt-1">{errors.phoneNumber}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Staff Phone Number</label>
              <input type="tel" name="staffPhoneNumber" value={formData.staffPhoneNumber} onChange={handleInputChange} placeholder="Enter staff phone"
                className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.staffPhoneNumber ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.staffPhoneNumber && <span className="text-red-500 text-sm mt-1">{errors.staffPhoneNumber}</span>}
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" rows={3}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.address ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">System Type <span className="text-red-500">*</span></label>
              <select name="systemType" value={formData.systemType} onChange={handleInputChange} className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.systemType ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}>
                <option value="">Select system type</option>
                {systemTypes.map((s, i) => <option key={i} value={s}>{s}</option>)}
              </select>
              {errors.systemType && <span className="text-red-500 text-sm mt-1">{errors.systemType}</span>}

              {formData.systemType === 'Other' && (
                <input type="text" name="systemTypeOther" value={formData.systemTypeOther} onChange={handleInputChange} placeholder="Specify other"
                  className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.systemTypeOther ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              )}
              {errors.systemTypeOther && <span className="text-red-500 text-sm mt-1">{errors.systemTypeOther}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">No. of Plants <span className="text-red-500">*</span></label>
              <input type="number" name="numPlants" value={formData.numPlants} onChange={handleInputChange} min="0"
                className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.numPlants ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.numPlants && <span className="text-red-500 text-sm mt-1">{errors.numPlants}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">No. of Levels <span className="text-red-500">*</span></label>
              <input type="number" name="numLevels" value={formData.numLevels} onChange={handleInputChange} min="0"
                className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.numLevels ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.numLevels && <span className="text-red-500 text-sm mt-1">{errors.numLevels}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Setup Dimension <span className="text-red-500">*</span></label>
              <input type="text" name="setupDimension" value={formData.setupDimension} onChange={handleInputChange} placeholder="Length x Width"
                className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.setupDimension ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.setupDimension && <span className="text-red-500 text-sm mt-1">{errors.setupDimension}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Motor Used <span className="text-red-500">*</span></label>
              <select name="motorType" value={formData.motorType} onChange={handleInputChange} className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.motorType ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}>
                <option value="">Select motor</option>
                {motorTypes.map((m, i) => <option key={i} value={m}>{m}</option>)}
              </select>
              {errors.motorType && <span className="text-red-500 text-sm mt-1">{errors.motorType}</span>}

              {formData.motorType === 'Other' && (
                <input type="text" name="motorTypeOther" value={formData.motorTypeOther} onChange={handleInputChange} placeholder="Specify other"
                  className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.motorTypeOther ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              )}
              {errors.motorTypeOther && <span className="text-red-500 text-sm mt-1">{errors.motorTypeOther}</span>}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Timer Used <span className="text-red-500">*</span></label>
              <select name="timerUsed" value={formData.timerUsed} onChange={handleInputChange} className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.timerUsed ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}>
                <option value="">Select timer</option>
                {timerOptions.map((t, i) => <option key={i} value={t}>{t}</option>)}
              </select>
              {errors.timerUsed && <span className="text-red-500 text-sm mt-1">{errors.timerUsed}</span>}

              {formData.timerUsed === 'Other' && (
                <input type="text" name="timerUsedOther" value={formData.timerUsedOther} onChange={handleInputChange} placeholder="Specify other"
                  className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.timerUsedOther ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              )}
              {errors.timerUsedOther && <span className="text-red-500 text-sm mt-1">{errors.timerUsedOther}</span>}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <label className="mb-2 font-medium text-gray-700 block">Plants Chosen <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {plants.map((plant, idx) => (
                <label key={idx} className="flex items-center space-x-2 cursor-pointer hover:bg-blue-50 p-2 rounded transition">
                  <input type="checkbox" checked={formData.plantsChosen.includes(plant)} onChange={() => handlePlantToggle(plant)} className="w-4 h-4 text-blue-600" />
                  <span>{plant}</span>
                </label>
              ))}
            </div>
            {errors.plantsChosen && <span className="text-red-500 text-sm mt-1">{errors.plantsChosen}</span>}

            {formData.plantsChosen.includes('Other') && (
              <textarea name="plantsChosenOther" value={formData.plantsChosenOther} onChange={handleInputChange} placeholder="Specify other plants" className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.plantsChosenOther ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
            )}
            {errors.plantsChosenOther && <span className="text-red-500 text-sm mt-1">{errors.plantsChosenOther}</span>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 mt-10">
      <div className="mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Add a Customer</h2>
        <StepperHeader />
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {renderStep()}

       <div className="flex flex-col md:flex-row justify-between mt-6 gap-3">
  {currentStep > 1 && (
    <button
      type="button"
      onClick={prevStep}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto"
    >
      Previous
    </button>
  )}
  {currentStep < 3 ? (
    <button
      type="button"
      onClick={nextStep}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto"
    >
      Next
    </button>
  ) : (
    <button
      type="submit"
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto"
    >
      Submit
    </button>
  )}
</div>

        </form>
      </div>
    </div>
  );
};

export default StepperCustomerForm;
