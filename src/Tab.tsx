import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface TabProps extends LinkProps {
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children, ...rest }: TabProps) => {
  return (
    <Link
      {...rest}
      style={{
        padding: '8px 16px',
        margin: '0 4px',
        textDecoration: 'none',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: '#f0f0f0',
      }}
    >
      {children}
    </Link>
  );
};

export default Tab;
