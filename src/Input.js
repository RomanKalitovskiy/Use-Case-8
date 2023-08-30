export function Input({name, placeholder, error, value, onChange}) {
  return (
    <div>
      <input type="text" name={name} placeholder={placeholder} value={value} onChange={onChange} />
      {error && <div>{error}</div>}
    </div>
  );
}
