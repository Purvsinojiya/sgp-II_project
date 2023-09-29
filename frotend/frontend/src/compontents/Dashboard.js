import React from 'react';
import { Link } from 'react-router-dom';

// Sample data for demonstration
const salesData = [
  { month: 'Jan', revenue: 1000 },
  { month: 'Feb', revenue: 1500 },
  // Add more data here
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-900 text-white w-64 min-h-screen p-4">
        {/* Sidebar content */}
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {/* Navigation links */}
        <ul className="mt-6">
          <li className="mb-4">
            <Link to="/admin-dashboard" className="text-white hover:text-blue-300">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/allProducts" className="text-white hover:text-blue-300">Products</Link>
          </li>
          <li className="mb-4">
            <Link to="/allorder" className="text-white hover:text-blue-300">Orders</Link>
          </li>
          <li className="mb-4">
            <Link to="/alluser" className="text-white hover:text-blue-300">Users</Link>
          </li>
          <li className="mb-4">
            <Link to="/addProduct" className="text-white hover:text-blue-300">Add Product</Link>
          </li>
          <li className="mb-4">
            <Link to="/addStock" className="text-white hover:text-blue-300">Stock Add</Link>
          </li>
          <li className="mb-4">
            <Link to="/allStocks" className="text-white hover:text-blue-300">Current Stock</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="p-6">
        {/* Content goes here */}
        <h2 className="text-2xl font-semibold mb-4">Sales Overview</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Chart or data visualization here */}
          <p>Sales chart goes here</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;