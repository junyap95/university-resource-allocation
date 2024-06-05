import { useState } from "react";

const CapacityView = () => {
  const [capacity, setCapacity] = useState(0);

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setCapacity(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value >= 0 && value <= 500) {
      setCapacity(value);
    }
  };

  return (
    <div className="capacity-box">
      <div className="form-title">Capacity Required*</div>
      <input
        type="range"
        min="5"
        max="500"
        step="5"
        id="capacity-input"
        placeholder="Please enter a value"
        value={capacity}
        onChange={handleSliderChange}
      />
      <div>
        <>Attendees: </>
        <input
          type="number"
          min="5"
          max="500"
          value={capacity}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CapacityView;
