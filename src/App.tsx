// App.tsx

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminUpload from './AdminUpload';
import './App.css';
import HomePage from './HomePage';
import Tab from './Tab';

function App(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState('/');

  return (
    <BrowserRouter>
      <div className="tab-container">
        <Tab
          to="/"
          selected={selectedTab === '/'}
          onClick={() => setSelectedTab('/')}
        >
          Home
        </Tab>
        <Tab
          to="/admin"
          selected={selectedTab === '/admin'}
          onClick={() => setSelectedTab('/admin')}
        >
          Admin
        </Tab>
        {/* Define routes inside the Routes component */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
