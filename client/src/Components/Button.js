export default function Button({ btnText, btnClass, handlerFn, value, type }) {
  return (
    <button
      className={`btn ${btnClass}`}
      type={type ?? "button"}
      value={value}
      onClick={handlerFn}
    >
      {btnText}
    </button>
  );
}
