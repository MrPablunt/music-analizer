export function Card({ children, className }) {
  return <div className={`rounded-2xl shadow-lg ${className}`}>{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}