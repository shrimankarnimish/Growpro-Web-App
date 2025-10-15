import React, { useState } from 'react';

const StepperCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    staffPhoneNumber: '',
    address: '',
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
  const [growers, setGrowers] = useState([{
    systemType: '',
    systemTypeOther: '',
    numPlants: '',
    numLevels: '',
    setupDimension: '',
    motorType: '',
    motorTypeOther: '',
    timerUsed: '',
    timerUsedOther: ''
  }]);

  const systemTypes = ['Small Grower', 'Long Grower', 'Mini Pro Grower', 'Semi Pro Grower', 'Pro Grower', 'Vertical Outdoor Grower', 'Flat Bed', 'Indoor Grower', 'Furniture Integrated Grower', 'Mini Grower', 'Dutch Bucket', 'Growbags', 'Microgreen Racks', 'Other'];
  const motorTypes = ['Small Motor (10W)', 'Big Motor (40W)', 'Other'];
  const timerOptions = ['Digital', 'Cyclic-15 mins', 'TS1W1', '800XC', 'Other'];
  const plants = ['Spinach', 'Methi', 'Coriander', 'Red Amaranthus', 'Radish Leaves', 'Mustard Leaves', 'Mint', 'Peppermint', 'Italian Basil', 'Thai Basil', 'Lemon Basil', 'Celery', 'Parsley', 'Ajwain', 'Oregano', 'Thyme', 'Rosemary', 'Sage', 'Iceberg Lettuce', 'Lollo Rosso Lettuce', 'Romaine Lettuce', 'Butterhead Lettuce', 'Curly Kale', 'Rocket Arugula', 'Pak Choi', 'Endives', 'Red Sorrell', 'Desi Tomatoes', 'Cherry Tomatoes', 'San Marzano Tomatoes', 'Chili', 'Bhindi', 'Dudhi', 'Zucchini', 'Brinjal', 'Jalapenos', 'Cauliflower', 'Cucumber', 'Other'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleGrowerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGrowers = [...growers];
    updatedGrowers[index] = { ...updatedGrowers[index], [name]: value };
    setGrowers(updatedGrowers);
    setErrors(prev => ({ ...prev, [`${name}_${index}`]: '' }));
  };

  const addGrower = () => {
    setGrowers([...growers, {
      systemType: '',
      systemTypeOther: '',
      numPlants: '',
      numLevels: '',
      setupDimension: '',
      motorType: '',
      motorTypeOther: '',
      timerUsed: '',
      timerUsedOther: ''
    }]);
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
      growers.forEach((grower, index) => {
        if (!grower.systemType) stepErrors[`systemType_${index}`] = 'System type is required';
        if (grower.systemType === 'Other' && !grower.systemTypeOther.trim()) stepErrors[`systemTypeOther_${index}`] = 'Please specify other system type';
        if (!grower.numPlants) stepErrors[`numPlants_${index}`] = 'Number of plants is required';
        else if (parseInt(grower.numPlants) < 0) stepErrors[`numPlants_${index}`] = 'Number of plants cannot be negative';
        if (!grower.numLevels) stepErrors[`numLevels_${index}`] = 'Number of levels is required';
        else if (parseInt(grower.numLevels) < 0) stepErrors[`numLevels_${index}`] = 'Number of levels cannot be negative';
        if (!grower.setupDimension.trim()) stepErrors[`setupDimension_${index}`] = 'Setup dimension is required';
        if (!grower.motorType) stepErrors[`motorType_${index}`] = 'Motor type is required';
        if (grower.motorType === 'Other' && !grower.motorTypeOther.trim()) stepErrors[`motorTypeOther_${index}`] = 'Please specify other motor type';
        if (!grower.timerUsed) stepErrors[`timerUsed_${index}`] = 'Timer used is required';
        if (grower.timerUsed === 'Other' && !grower.timerUsedOther.trim()) stepErrors[`timerUsedOther_${index}`] = 'Please specify other timer';
      });
    }

    if (currentStep === 3) {
      if (formData.plantsChosen.length === 0) stepErrors.plantsChosen = 'Please select at least one plant';
      if (formData.plantsChosen.includes('Other') && !formData.plantsChosenOther.trim()) stepErrors.plantsChosenOther = 'Please specify other plants';
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const submissionData = {
        ...formData,
        growers: growers
      };
      console.log('Form Data:', submissionData);
      alert('Customer created successfully!');

      setFormData({
        name: '',
        phoneNumber: '',
        staffPhoneNumber: '',
        address: '',
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
      setGrowers([{
        systemType: '',
        systemTypeOther: '',
        numPlants: '',
        numLevels: '',
        setupDimension: '',
        motorType: '',
        motorTypeOther: '',
        timerUsed: '',
        timerUsedOther: ''
      }]);
      setErrors({});
      setCurrentStep(1);
    }
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const StepperHeader = () => (
    <div className="flex overflow-x-auto md:overflow-visible space-x-4 md:space-x-0 justify-between mb-8 pl-4 md:pl-0">
      {[1, 2, 3, 4].map((step, idx) => (
        <div key={step} className="flex-1 flex flex-col items-center min-w-[70px] relative">
          {idx !== 0 && (
            <div className="absolute left-0 top-5 w-full h-1 bg-gray-200 -z-10"></div>
          )}
          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold transition-all duration-300 ${currentStep === step ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-gray-300'}`}>
            {step}
          </div>
          <div className="text-xs mt-2 text-gray-700 font-medium text-center">
            {step === 1 ? 'Customer' : step === 2 ? 'Grower' : step === 3 ? 'Plants' : 'Review'}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-6">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter phone number" className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.phoneNumber ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.phoneNumber && <span className="text-red-500 text-sm mt-1">{errors.phoneNumber}</span>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Staff Phone Number</label>
              <input type="tel" name="staffPhoneNumber" value={formData.staffPhoneNumber} onChange={handleInputChange} placeholder="Enter staff phone" className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.staffPhoneNumber ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.staffPhoneNumber && <span className="text-red-500 text-sm mt-1">{errors.staffPhoneNumber}</span>}
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" rows={3} className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors.address ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
              {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 px-6 py-6">
            {growers.map((grower, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Grower {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">System Type <span className="text-red-500">*</span></label>
                    <select name="systemType" value={grower.systemType} onChange={(e) => handleGrowerChange(index, e)} className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`systemType_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}>
                      <option value="">Select system type</option>
                      {systemTypes.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                    {errors[`systemType_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`systemType_${index}`]}</span>}
                    {grower.systemType === 'Other' && (
                      <input type="text" name="systemTypeOther" value={grower.systemTypeOther} onChange={(e) => handleGrowerChange(index, e)} placeholder="Specify other" className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`systemTypeOther_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
                    )}
                    {errors[`systemTypeOther_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`systemTypeOther_${index}`]}</span>}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">No. of Plants <span className="text-red-500">*</span></label>
                    <input type="number" name="numPlants" value={grower.numPlants} onChange={(e) => handleGrowerChange(index, e)} min="0" className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`numPlants_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
                    {errors[`numPlants_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`numPlants_${index}`]}</span>}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">No. of Levels <span className="text-red-500">*</span></label>
                    <input type="number" name="numLevels" value={grower.numLevels} onChange={(e) => handleGrowerChange(index, e)} min="0" className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`numLevels_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
                    {errors[`numLevels_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`numLevels_${index}`]}</span>}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Setup Dimension <span className="text-red-500">*</span></label>
                    <input type="text" name="setupDimension" value={grower.setupDimension} onChange={(e) => handleGrowerChange(index, e)} placeholder="Length x Width" className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`setupDimension_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
                    {errors[`setupDimension_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`setupDimension_${index}`]}</span>}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Motor Used <span className="text-red-500">*</span></label>
                    <select name="motorType" value={grower.motorType} onChange={(e) => handleGrowerChange(index, e)} className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`motorType_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}>
                      <option value="">Select motor</option>
                      {motorTypes.map((m, i) => <option key={i} value={m}>{m}</option>)}
                    </select>
                    {errors[`motorType_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`motorType_${index}`]}</span>}
                    {grower.motorType === 'Other' && (
                      <input type="text" name="motorTypeOther" value={grower.motorTypeOther} onChange={(e) => handleGrowerChange(index, e)} placeholder="Specify other" className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`motorTypeOther_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
                    )}
                    {errors[`motorTypeOther_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`motorTypeOther_${index}`]}</span>}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Timer Used <span className="text-red-500">*</span></label>
                    <select name="timerUsed" value={grower.timerUsed} onChange={(e) => handleGrowerChange(index, e)} className={`px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`timerUsed_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}>
                      <option value="">Select timer</option>
                      {timerOptions.map((t, i) => <option key={i} value={t}>{t}</option>)}
                    </select>
                    {errors[`timerUsed_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`timerUsed_${index}`]}</span>}
                    {grower.timerUsed === 'Other' && (
                      <input type="text" name="timerUsedOther" value={grower.timerUsedOther} onChange={(e) => handleGrowerChange(index, e)} placeholder="Specify other" className={`w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:outline-none transition ${errors[`timerUsedOther_${index}`] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`} />
                    )}
                    {errors[`timerUsedOther_${index}`] && <span className="text-red-500 text-sm mt-1">{errors[`timerUsedOther_${index}`]}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="px-6 py-6">
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

      case 4:
        return (
          <div className="px-6 py-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Review Your Information</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Customer Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-gray-800">{formData.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Phone Number:</span>
                    <p className="text-gray-800">{formData.phoneNumber}</p>
                  </div>
                  {formData.staffPhoneNumber && (
                    <div>
                      <span className="font-medium text-gray-600">Staff Phone Number:</span>
                      <p className="text-gray-800">{formData.staffPhoneNumber}</p>
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-600">Address:</span>
                    <p className="text-gray-800">{formData.address}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Grower Information</h4>
                {growers.map((grower, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h5 className="font-semibold text-gray-700 mb-3">Grower {index + 1}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-gray-600">System Type:</span>
                        <p className="text-gray-800">{grower.systemType === 'Other' ? grower.systemTypeOther : grower.systemType}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">No. of Plants:</span>
                        <p className="text-gray-800">{grower.numPlants}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">No. of Levels:</span>
                        <p className="text-gray-800">{grower.numLevels}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Setup Dimension:</span>
                        <p className="text-gray-800">{grower.setupDimension}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Motor Used:</span>
                        <p className="text-gray-800">{grower.motorType === 'Other' ? grower.motorTypeOther : grower.motorType}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Timer Used:</span>
                        <p className="text-gray-800">{grower.timerUsed === 'Other' ? grower.timerUsedOther : grower.timerUsed}</p>
                      </div>
                    </div>
                    {index < growers.length - 1 && <hr className="my-4 border-gray-300" />}
                  </div>
                ))}
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-700">Plants Chosen</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.plantsChosen.map((plant, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {plant === 'Other' ? formData.plantsChosenOther : plant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
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
        <div className="mt-6 space-y-6">
          {renderStep()}
          <div className="flex justify-between items-center mt-6 px-6">
            {currentStep === 2 ? (
              <>
                <button type="button" onClick={addGrower} className="bg-[#9FC762] hover:bg-[#8DB350] text-white px-6 py-2 rounded-lg transition">
                  + Add Grower
                </button>
                     <button type="button" onClick={addGrower} className="bg-[#9FC762] hover:bg-[#8DB350] text-white px-6 py-2 rounded-lg transition">
                  + Add Grower
                </button>
                <div className="flex gap-3">
                  <button type="button" onClick={prevStep} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    Previous
                  </button>
                  <button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col md:flex-row justify-between w-full gap-3">
                {currentStep > 1 && (
                  <button type="button" onClick={prevStep} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto">
                    Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto ml-auto">
                    Next
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition w-full md:w-auto ml-auto">
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperCustomerForm;