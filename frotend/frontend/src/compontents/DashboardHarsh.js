import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { Link } from "react-router-dom";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [stock, setStocks] = useState([]);
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoadings] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const pendingOrders  = orders.filter((order) => order.status === 'pending').length;
    // const cancelOrders = orders.filter((order) => order.status === 'cancel').length;
    // const returnOrders = orders.filter((order) => order.status === 'return').length;
    const token = localStorage.getItem("adminAuthtoken");

    const orderUrl = "https://shivams.onrender.com/admin/order";
    const userUrl = "https://shivams.onrender.com/admin/user";
    const stockUrl = "https://shivams.onrender.com/admin/stocks";
    const ProductsUrl = "https://shivams.onrender.com/admin/getallProduct";

    // Use Promise.all to make multiple requests concurrently
    Promise.all([
      fetch(orderUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }),
      fetch(stockUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }),
      fetch(ProductsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }),
      fetch(userUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }),
    ])
      .then(([orderResponse, userResponse, stockResponse, productResponce]) => {
        if (!orderResponse.ok) {
          throw new Error("Failed to fetch orders data");
        }
        if (!stockResponse.ok) {
          throw new Error("Failed to fetch orders data");
        }
        if (!productResponce.ok) {
          throw new Error("Failed to fetch orders data");
        }
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        return Promise.all([
          orderResponse.json(),
          userResponse.json(),
          stockResponse.json(),
          productResponce.json(),
        ]);
      })
      .then(([orderData, userData, stockData, productData]) => {
        // Handle the order data (orderData) and user data (userData)
        setOrders(orderData);
        setStocks(userData);
        setProduct(stockData);
        setUser(productData);
        setIsLoadings(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoadings(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalUser = user.length;
  const totalProduct = product.length;
  const totalOrder = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const cancelOrders = orders.filter(
    (order) => order.status === "cancal"
  ).length;
  const returnOrders = orders.filter(
    (order) => order.status === "return"
  ).length;


  const productData = {};

  orders.forEach((order) => {
    const { product, quantity } = order;

    // Initialize data for the product if it doesn't exist
    if (!productData[product]) {
      productData[product] = {
        totalQuantity: 0,
        count: 0,
      };
    }

    // Update the data for the product
    productData[product].totalQuantity += quantity;
    productData[product].count++;
  });

  const transformedData = Object.keys(productData).map((productName) => ({
    name: productName,
    value: productData[productName].totalQuantity,
  }));
  console.log(transformedData);
  // Now, `productData` will contain the total quantity and count for each product
  console.log(productData);
  for (const productName in productData) {
    const { totalQuantity } = productData[productName];
    console.log(`Product: ${productName}, Total Quantity: ${totalQuantity}`);
  }

  const dummyData = {
    sales: stock.map((product) => ({
      name: product.productName,
      value: product.currentStock,
    })),
    stocks: [
      { name: "Product X", value: 100 },
      { name: "Product Y", value: 75 },
      { name: "Product A", value: 10 },
      { name: "Product B", value: 12 },
      // Add more products
    ],
    totalUsers: totalUser,
    totalProducts: totalProduct,
    totalOrders: totalOrder,
    orderStatus: {
      pending: pendingOrders,
      returned: cancelOrders,
      canceled: returnOrders,
    },
  };

  const { sales, totalUsers, totalProducts, totalOrders, orderStatus } =
    dummyData;

  const orderOptions = {
    chart: {
      type: "bar",
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
      type: "bar",
    },
    xaxis: {
      categories: transformedData.map((stock) => stock.name),
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
      type: "pie",
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
            position: "bottom",
          },
        },
      },
    ],
  };

  const orderStatusSeries = Object.values(orderStatus);

  return (
    <div className="flex">
      <aside className="bg-blue-900 text-white w-64 min-h-screen p-4">
        {/* Sidebar content */}
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        {/* Navigation links */}
        <ul className="mt-6">
          <li className="mb-4">
            <Link
              to="/admin-dashboard"
              className="text-white hover:text-blue-300"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/allProducts" className="text-white hover:text-blue-300">
              Products
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/allorder" className="text-white hover:text-blue-300">
              Orders
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/alluser" className="text-white hover:text-blue-300">
              Users
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/addProduct" className="text-white hover:text-blue-300">
              Add Product
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/addStock" className="text-white hover:text-blue-300">
              Stock Add
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/allStocks" className="text-white hover:text-blue-300">
              Current Stock
            </Link>
          </li>
        </ul>
      </aside>
      <div className="container mx-auto p-2">
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold bg-[#FCE8C9] opacity-75 rounded-lg text-gray-800 p-2 mt-5">
                Stoke Details
              </h2>
              <ApexCharts
                options={orderOptions}
                series={[{ data: sales.map((order) => order.value) }]}
                type="bar"
                height={200}
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold bg-[#FCE8C9] opacity-75 rounded-lg text-gray-800 p-2 mt-5">
                Order Status
              </h2>
              <ApexCharts
                options={orderStatusOptions}
                series={orderStatusSeries}
                type="pie"
                height={210}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-xl inline-block">
            <h2 className="text-xl font-bold bg-[#FCE8C9] opacity-75 rounded-lg text-gray-800 p-2 mt-5">
              Sale Product
            </h2>
            <ApexCharts
              options={stockOptions}
              series={[{ data: transformedData.map((stock) => stock.value) }]}
              type="bar"
              height={200}
              width={500}
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="lg:flex lg:space-x-10">
            <div className="bg-white p-3 rounded-md shadow-lg lg:w-1/3">
              <p className="text-md font-semibold text-gray-500">Total Users</p>
              <hr className="mt-2 border-t-2 border-orange-300" />
              <p className="text-4xl mt-2 text-white text-center bg-[#ffd89c] rounded-lg p-2">
                {totalUsers}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-lg lg:w-1/3">
              <p className="text-md font-semibold text-gray-500">
                Total Products
              </p>
              <hr className="mt-2 border-t-2 border-orange-300" />
              <p className="text-4xl mt-2 text-white text-center bg-[#ffd89c] rounded-lg p-2">
                {totalProducts}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-lg lg:w-1/3">
              <p className="text-md font-semibold text-gray-500">
                Total Orders
              </p>
              <hr className="mt-2 border-t-2 border-orange-300" />
              <p className="text-4xl mt-2 text-white text-center bg-[#ffd89c] rounded-lg p-2">
                {totalOrders}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
