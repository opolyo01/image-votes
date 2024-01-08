// App.tsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminUpload from './AdminUpload';
import './App.css';
import HomePage from './HomePage';
import Tab from './Tab';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="TabContainer">
        <Tab to="/" className="Tab">Home</Tab>
        <Tab to="/admin" className="Tab">Admin</Tab>

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
