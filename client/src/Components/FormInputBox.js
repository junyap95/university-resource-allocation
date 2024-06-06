export default function FormInputBox({ title, id, placeholder, onChange }) {
  return (
    <>
      <div className="form-title">{title}*</div>
      <input
        className="input-box"
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required="true"
      />
    </>
  );
}
