export default function FormInputBox({
  title,
  type,
  id,
  placeholder,
  onChange,
  error,
}) {
  return (
    <div className="form-container">
      <div className="form-title">{title}*</div>
      <input
        className="input-box"
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={true}
      />

      <small>{error}</small>
    </div>
  );
}
