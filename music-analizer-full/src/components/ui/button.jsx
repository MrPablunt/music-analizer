export function Button({ children, onClick, disabled, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-all ${className}`}
    >
      {children}
    </button>
  );
}