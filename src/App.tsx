import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AdminUpload from './AdminUpload';
import './App.css';
import HomePage from './HomePage';
import Tab from './Tab';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

const Navigation = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location]);

  return (
    <div className="tab-container">
      <Tab to="/" selected={selectedTab === '/'} onClick={() => setSelectedTab('/')}>
        Home
      </Tab>
      <Tab to="/admin" selected={selectedTab === '/admin'} onClick={() => setSelectedTab('/admin')}>
        Admin
      </Tab>
    </div>
  );
};

export default App;
