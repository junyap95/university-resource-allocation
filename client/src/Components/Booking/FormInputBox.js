export default function FormInputBox({ title, type, id, placeholder, onChange, error, value }) {
  return (
    <div className="form-container">
      <div className="form-title">{title}</div>
      <input
        className="input-box"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={true}
        value={value}
      />
      {error && <div className="small-error">{error}</div>}
    </div>
  );
}
