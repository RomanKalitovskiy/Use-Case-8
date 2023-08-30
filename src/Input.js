export function Input({ name, placeholder, error, value, onChange }) {
  return (
    <div>
      <input
        data-testid={`input-${name}`}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div>{error}</div>}
    </div>
  );
}
