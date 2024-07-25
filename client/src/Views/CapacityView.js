const CapacityView = ({ handleCapacity, capacity }) => {
  return (
    <div className="capacity-box">
      <div className="form-title">Capacity Required*</div>
      <input
        type="range"
        min="5"
        max="500"
        step="5"
        id="capacity"
        placeholder="Please enter a value"
        value={capacity}
        onChange={handleCapacity}
      />
      <div>
        <>Attendees: </>
        <input
          type="number"
          min="5"
          max="500"
          id="capacity"
          value={capacity}
          onChange={handleCapacity}
        />
      </div>
    </div>
  );
};

export default CapacityView;
