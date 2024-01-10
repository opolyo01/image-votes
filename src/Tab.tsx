import { Link } from 'react-router-dom';

interface TabProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const Tab: React.FC<TabProps> = ({ children, to, className = '', onClick, selected }: TabProps) => {
  const defaultStyles: React.CSSProperties = {
    padding: '8px 16px',
    margin: '0 4px',
    textDecoration: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: selected ? '#007bff' : '#f0f0f0',
    color: selected ? 'white' : 'black',
  };

  return (
    <Link
      to={to}
      className={`tab ${className}`}
      onClick={onClick}
      style={defaultStyles}
    >
      {children}
    </Link>
  );
};

export default Tab;
