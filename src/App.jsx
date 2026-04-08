import { useState } from 'react';

const Hero = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    typeOfHelp: '',
    location: '',
    severity: '',
    details: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // REPLACE THIS URL WITH YOUR ACTUAL API GATEWAY URL
    const apiUrl = "https://YOUR_API_ID.execute-api.YOUR_REGION.amazonaws.com/submit-request";
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(`✅ Help request submitted! Request ID: ${result.requestId}`);
        setFormData({
          typeOfHelp: '',
          location: '',
          severity: '',
          details: ''
        });
      } else {
        alert(`❌ Error: ${result.error || 'Failed to submit'}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Failed to submit request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Request Help</h1>
        <p className="text-center text-gray-600 mb-8">
          Fill the form - aid will reach you as soon as possible.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Type of Help</label>
            <select
              name="typeOfHelp"
              value={formData.typeOfHelp}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="Food">Food</option>
              <option value="Water">Water</option>
              <option value="Medical">Medical</option>
              <option value="Shelter">Shelter</option>
              <option value="Rescue">Rescue</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Severity</label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Describe your situation..."
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
