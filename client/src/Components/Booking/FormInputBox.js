export default function FormInputBox({
  title,
  type,
  id,
  placeholder,
  onChange,
  error,
  value,
  required,
}) {
  return (
    <div className="form-container">
      <div className="form-title">{title}</div>
      <input
        className="input-box"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={required ?? true}
        value={value}
      />
      {error && <div className="small-error">{error}</div>}
    </div>
  );
}
