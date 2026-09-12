export default function Icon({ name, fill = false, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined leading-none ${fill ? "icon-fill" : ""} ${className}`}
    >
      {name}
    </span>
  );
}
