// components/Button.jsx
const Button = ({ children, href, onClick, disabled, type = "button" }) => {
  const baseClasses =
    "block w-80 mx-auto py-4 text-center text-white bg-teal-600 rounded-tr-none rounded-bl-none text-lg font-medium shadow-md transition-transform duration-150 hover:shadow-lg hover:translate-y-[-0.25rem] mb-4";

  const disabledClasses = disabled
    ? "opacity-60 cursor-not-allowed hover:shadow-none hover:translate-y-0"
    : "cursor-pointer";

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${disabled ? disabledClasses : ''}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;