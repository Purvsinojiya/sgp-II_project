import React from 'react';
import ApexCharts from 'react-apexcharts';

function Dashboard() {
  const dummyData = {
    sales: [
      { name: 'Product A', value: 20 },
      { name: 'Product B', value: 35 },
      { name: 'Product C', value: 74 },
      { name: 'Product D', value: 35 },
      { name: 'Product E', value: 40 },
      // Add more orders
    ],
    stocks: [
      { name: 'Product X', value: 100 },
      { name: 'Product Y', value: 75 },
      { name: 'Product A', value: 10 },
      { name: 'Product B', value: 12 },
      // Add more products
    ],
    totalUsers: 1000,
    totalProducts: 50,
    totalOrders: 500,
    orderStatus: {
      pending: 30,
      returned: 15,
      canceled: 20,
    },
  };

  const { sales, stocks, totalUsers, totalProducts, totalOrders, orderStatus } = dummyData;

  const orderOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: sales.map((order) => order.name),
    },
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
      },
    },
  };

  const stockOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: stocks.map((stock) => stock.name),
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
  };

  const orderStatusOptions = {
    chart: {
      type: 'pie',
    },
    labels: Object.keys(orderStatus),
    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const orderStatusSeries = Object.values(orderStatus);

  return (
    <div className="container mx-auto p-2">
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold bg-[#FCE8C9] opacity-75 rounded-lg text-gray-800 p-2 mt-5">
              Product Sales
            </h2>
            <ApexCharts options={orderOptions} series={[{ data: sales.map((order) => order.value) }]} type="bar" height={200} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold bg-[#FCE8C9] opacity-75 rounded-lg text-gray-800 p-2 mt-5">
              Order Status
            </h2>
            <ApexCharts options={orderStatusOptions} series={orderStatusSeries} type="pie" height={210} />
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="bg-white p-4 rounded-lg shadow-xl inline-block">
          <h2 className="text-xl font-bold bg-[#FCE8C9] opacity-75 rounded-lg text-gray-800 p-2 mt-5">
            Stock Details
          </h2>
          <ApexCharts options={stockOptions} series={[{ data: stocks.map((stock) => stock.value) }]} type="bar" height={200} width={500}/>
        </div>
      </div>
      <div className="mt-8">
      <div className="lg:flex lg:space-x-10">
        <div className="bg-white p-3 rounded-md shadow-lg lg:w-1/3">
            <p className="text-md font-semibold text-gray-500">Total Users</p>
            <hr className="mt-2 border-t-2 border-orange-300" />
            <p className="text-4xl mt-2 text-white text-center bg-[#ffd89c] rounded-lg p-2">{totalUsers}</p>
        </div>
        <div className="bg-white p-3 rounded-md shadow-lg lg:w-1/3">
            <p className="text-md font-semibold text-gray-500">Total Products</p>
            <hr className="mt-2 border-t-2 border-orange-300" />
            <p className="text-4xl mt-2 text-white text-center bg-[#ffd89c] rounded-lg p-2">{totalProducts}</p>
        </div>
        <div className="bg-white p-3 rounded-md shadow-lg lg:w-1/3">
            <p className="text-md font-semibold text-gray-500">Total Orders</p>
            <hr className="mt-2 border-t-2 border-orange-300" />
            <p className="text-4xl mt-2 text-white text-center bg-[#ffd89c] rounded-lg p-2">{totalOrders}</p>
        </div>
       </div>
       </div>
    </div>
  );
}

export default Dashboard;
