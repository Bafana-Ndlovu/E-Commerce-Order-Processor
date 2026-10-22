// Challenge 0: Order dataset
const orders = [
  { orderId: "ORD-0001", customerName: "  Gareth Mothloisi ", email: "Gareth@Example.Com", product: "Laptop", category: "Electronics", price: 1200.5, orderDate: "2026-09-15" },
  { orderId: "ORD-0002", customerName: "bob JOHNSON", email: "bob.johnson@example.com", product: "Headphones", category: "Electronics", price: 199.99, orderDate: "2026-10-01" },
  { orderId: "ORD-0003", customerName: "  bafana   ", email: "invalid-email@", product: "Desk Chair", category: "Furniture", price: 350, orderDate: "2026-08-20" },
  { orderId: "ORD-0004", customerName: "Diana Prince", email: "diana.prince@example.com", product: "Coffee Maker", category: "Appliances", price: 89.5, orderDate: "2026-10-10" },
  { orderId: "ORD-0005", customerName: "   owethu   ", email: "ERIC@example.com", product: "Smartphone", category: "Electronics", price: 999.99, orderDate: "2026-09-25" },
  { orderId: "ORD-0006", customerName: "fiona", email: "fiona@example.com", product: "Shoes", category: "Fashion", price: 75.25, orderDate: "2026-07-30" },
  { orderId: "ORD-0007", customerName: "George", email: "george@example.com", product: "Watch", category: "Fashion", price: 150, orderDate: "2026-10-05" },
  { orderId: "ORD-0008", customerName: "   hannah   ", email: "hannah@example.com", product: "Table", category: "Furniture", price: 450.75, orderDate: "2026-09-12" },
  { orderId: "ORD-0009", customerName: "Ian", email: "ian@example.com", product: "Blender", category: "Appliances", price: 120, orderDate: "2026-09-28" },
  { orderId: "ORD-0010", customerName: "JABU MNCUBE", email: "jane.doe@example.com", product: "Camera", category: "Electronics", price: 650.45, orderDate: "2026-10-15" }
];

// Render orders
const ordersList = document.getElementById("orders-list");
orders.forEach(order => {
  const div = document.createElement("div");
  div.className = "border p-2 rounded";
  div.textContent = `${order.orderId} - ${order.customerName} - ${order.email} - ${order.product} - R${order.price}`;
  ordersList.appendChild(div);
});

//
// Challenge 1: Clean Customer Data

// Remove extra spaces and normalize case
function cleanName(name) {
  return name
    .trim() // remove spaces
    .split(" ") // split into words
    .filter(word => word.length > 0) // remove empty strings
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()) // capitalize
    .join(" "); // join back
}

function cleanEmail(email) {
  return email.trim().toLowerCase();
}

// Apply cleaning to dataset
const cleanedOrders = orders.map(order => ({
  ...order,
  customerName: cleanName(order.customerName),
  email: cleanEmail(order.email)
}));

//
// Render cleaned orders
ordersList.innerHTML = ""; // clear old list
cleanedOrders.forEach(order => {
  const div = document.createElement("div");
  div.className = "border p-2 rounded";
  div.textContent = `${order.orderId} - ${order.customerName} - ${order.email} - ${order.product} - R${order.price}`;
  ordersList.appendChild(div);
});

// To 2 decimal 
function formatPrice(price) {
    return parseFloat(price).toFixed(2);
  }
  
  //Totals, average, highest, lowest
  // Total value of all orders
const totalValue = cleanedOrders.reduce((sum, order) => sum + order.price, 0);

// Average order price
const averageValue = totalValue / cleanedOrders.length;

// Highest and lowest order price
const highestPrice = Math.max(...cleanedOrders.map(order => order.price));
const lowestPrice = Math.min(...cleanedOrders.map(order => order.price));

//Extra calculation (VAT at 15%)
const VAT_RATE = 0.15;
const ordersWithVAT = cleanedOrders.map(order => ({
  ...order,
  priceWithVAT: (order.price * (1 + VAT_RATE)).toFixed(2)
}));

//
// Render orders with formatted prices
ordersList.innerHTML = "";
ordersWithVAT.forEach(order => {
  const div = document.createElement("div");
  div.className = "border p-2 rounded";
  div.textContent = `${order.orderId} - ${order.customerName} - ${order.email} - ${order.product} - R${formatPrice(order.price)} (VAT: R${order.priceWithVAT})`;
  ordersList.appendChild(div);
});

// Rendering Results
// Render summary stats
const statsDiv = document.getElementById("statistics");
statsDiv.innerHTML = `
  <p><strong>Total Value:</strong> R${totalValue.toFixed(2)}</p>
  <p><strong>Average Order:</strong> R${averageValue.toFixed(2)}</p>
  <p><strong>Highest Price:</strong> R${highestPrice.toFixed(2)}</p>
  <p><strong>Lowest Price:</strong> R${lowestPrice.toFixed(2)}</p>
`;

//Convert raw strings into Date objects
// Convert orderDate string into Date object
const ordersWithDates = cleanedOrders.map(order => ({
  ...order,
  dateObj: new Date(order.orderDate)
}));

//Format dates for display
function formatDate(dateObj) {
    return dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

// Sort orders by newest → oldest
const sortedOrders = [...ordersWithDates].sort((a, b) => b.dateObj - a.dateObj);

//Identify recent orders (last 30 days)
function isRecent(dateObj) {
    const now = new Date();
    const diffDays = (now - dateObj) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }

//Rendering Orders with Dates
ordersList.innerHTML = "";
sortedOrders.forEach(order => {
  const div = document.createElement("div");
  div.className = "border p-2 rounded";
  
  // Highlight recent orders
  const recentTag = isRecent(order.dateObj) 
    ? " 🟢 Recent" 
    : "  Older";
  
  div.textContent = `${order.orderId} - ${order.customerName} - ${order.email} - ${order.product} - R${order.price.toFixed(2)} - ${formatDate(order.dateObj)}${recentTag}`;
  ordersList.appendChild(div);
});

//Find order by ID or customer name 
function findOrderById(id) {
    return cleanedOrders.find(order => order.orderId === id);
  }
  
  function findOrderByCustomer(name) {
    return cleanedOrders.find(order => order.customerName.toLowerCase() === name.toLowerCase());
  }

// Filter by category
function filterByCategory(category) {
    return cleanedOrders.filter(order => order.category.toLowerCase() === category.toLowerCase());
  }

//Filter by price range
function filterByPrice(min, max) {
    return cleanedOrders.filter(order => order.price >= min && order.price <= max);
  }

//Transform data with map() (e.g., add VAT)
function mapWithVAT() {
    return cleanedOrders.map(order => ({
      product: order.product,
      priceWithVAT: (order.price * 1.15).toFixed(2)
    }));
  }

//Check conditions with some() and every()
function hasHighValueOrder(threshold) {
    return cleanedOrders.some(order => order.price > threshold);
  }
  
  function allOrdersValidPrice() {
    return cleanedOrders.every(order => order.price > 0);
  }

//Calculate totals with reduce()
function totalOrderValue() {
    return cleanedOrders.reduce((sum, order) => sum + order.price, 0).toFixed(2);
  }
  
//Rendering Results in Search/Filter Section
const searchDiv = document.getElementById("search");
searchDiv.innerHTML = `
  <div class="space-y-2">
    <button class="bg-blue-500 text-white px-3 py-1 rounded" onclick="alert(JSON.stringify(findOrderById('ORD-0003')))">Find by ID</button>
    <button class="bg-green-500 text-white px-3 py-1 rounded" onclick="alert(JSON.stringify(filterByCategory('Electronics')))">Filter Electronics</button>
    <button class="bg-purple-500 text-white px-3 py-1 rounded" onclick="alert(JSON.stringify(filterByPrice(100, 500)))">Filter Price 100–500</button>
    <button class="bg-yellow-500 text-white px-3 py-1 rounded" onclick="alert(JSON.stringify(mapWithVAT()))">Map with VAT</button>
    <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="alert(hasHighValueOrder(1000))">Any order > 1000?</button>
    <button class="bg-gray-500 text-white px-3 py-1 rounded" onclick="alert(allOrdersValidPrice())">All prices valid?</button>
    <button class="bg-indigo-500 text-white px-3 py-1 rounded" onclick="alert(totalOrderValue())">Total Order Value</button>
  </div>
`;
/*
//Build a Set of categories
// Extract categories into a Set
const categorySet = new Set(cleanedOrders.map(order => order.category));

// Convert Set back to array for rendering
const uniqueCategories = [...categorySet];

//Render categories in the Categories section
const categoriesDiv = document.getElementById("categories");
categoriesDiv.innerHTML = `
  <h3 class="text-lg font-semibold mb-2">Unique Categories</h3>
  <ul class="list-disc pl-5">
    ${uniqueCategories.map(cat => `<li>${cat}</li>`).join("")}
  </ul>
`;

// Use Set to drive filter dropdown
const searchDiv = document.getElementById("search");
searchDiv.innerHTML += `
  <div class="mt-4">
    <label for="categorySelect" class="block mb-1 font-medium">Filter by Category:</label>
    <select id="categorySelect" class="border rounded px-2 py-1">
      ${uniqueCategories.map(cat => `<option value="${cat}">${cat}</option>`).join("")}
    </select>
    <button class="bg-blue-500 text-white px-3 py-1 rounded ml-2" onclick="filterCategoryFromDropdown()">Apply</button>
  </div>
`;*/

function filterCategoryFromDropdown() {
  const selected = document.getElementById("categorySelect").value;
  const filtered = filterByCategory(selected);

  ordersList.innerHTML = "";
  filtered.forEach(order => {
    const div = document.createElement("div");
    div.className = "border p-2 rounded";
    div.textContent = `${order.orderId} - ${order.customerName} - ${order.product} - R${order.price.toFixed(2)}`;
    ordersList.appendChild(div);
  });
}

//Create a Map of products
// Build a Map with product name as key
const productMap = new Map();
cleanedOrders.forEach(order => {
  productMap.set(order.product.toLowerCase(), {
    price: order.price.toFixed(2),
    category: order.category
  });
});

//Lookup function
function lookupProduct(productName) {
    const key = productName.toLowerCase();
    if (productMap.has(key)) {
      return productMap.get(key);
    } else {
      return { message: "Product not found in dataset." };
    }
  }

//Rendering Product Lookup UI
const lookupDiv = document.getElementById("lookup");
lookupDiv.innerHTML = `
  <label for="productInput" class="block mb-2 font-medium">Enter Product Name:</label>
  <input id="productInput" type="text" class="border rounded px-2 py-1 w-64" placeholder="e.g. Laptop" />
  <button class="bg-blue-500 text-white px-3 py-1 rounded ml-2" onclick="handleLookup()">Lookup</button>
  <div id="lookupResult" class="mt-3 text-gray-700"></div>
`;

function handleLookup() {
  const productName = document.getElementById("productInput").value;
  const result = lookupProduct(productName);

  const resultDiv = document.getElementById("lookupResult");
  if (result.message) {
    resultDiv.textContent = result.message;
  } else {
    resultDiv.textContent = `Price: R${result.price}, Category: ${result.category}`;
  }
}

//Export Orders to JSON
function exportOrders() {
    const jsonData = JSON.stringify(cleanedOrders, null, 2);
    document.getElementById("processing").innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Exported Orders (JSON)</h3>
      <textarea id="jsonOutput" class="w-full h-48 border rounded p-2">${jsonData}</textarea>
    `;
  }

//Import Orders from JSON
function importOrders() {
    const input = document.getElementById("jsonInput").value;
    try {
      const parsed = JSON.parse(input);
  
      // Merge new orders into dataset
      cleanedOrders.push(...parsed);
  
      // Re-render Orders section
      ordersList.innerHTML = "";
      cleanedOrders.forEach(order => {
        const div = document.createElement("div");
        div.className = "border p-2 rounded";
        div.textContent = `${order.orderId} - ${order.customerName} - ${order.email} - ${order.product} - R${order.price.toFixed(2)}`;
        ordersList.appendChild(div);
      });
  
      alert("Orders imported successfully!");
    } catch (error) {
      alert("Invalid JSON. Please check your input.");
    }
  }

//Rendering Export/Import UI
const processingDiv = document.getElementById("processing");
processingDiv.innerHTML = `
  <button class="bg-blue-500 text-white px-3 py-1 rounded mb-3" onclick="exportOrders()">Export Orders</button>
  
  <h3 class="text-lg font-semibold mb-2">Import Orders (JSON)</h3>
  <textarea id="jsonInput" class="w-full h-48 border rounded p-2" placeholder='Paste JSON here'></textarea>
  <button class="bg-green-500 text-white px-3 py-1 rounded mt-2" onclick="importOrders()">Import Orders</button>
`;

// Validation Functions
// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
// Order ID validation (e.g., ORD-0001)
function validateOrderId(orderId) {
    const regex = /^ORD-\d{4}$/;
    return regex.test(orderId);
  }
  
// Rendering Valid/Invalid Entries
// We’ll mark invalid emails or IDs directly in the Orders section.
ordersList.innerHTML = "";
cleanedOrders.forEach(order => {
  const div = document.createElement("div");
  div.className = "border p-2 rounded";

  const emailValid = validateEmail(order.email) ? "✅" : "❌ Invalid Email";
  const idValid = validateOrderId(order.orderId) ? "✅" : "❌ Invalid ID";

  div.textContent = `${order.orderId} (${idValid}) - ${order.customerName} - ${order.email} (${emailValid}) - ${order.product} - R${order.price.toFixed(2)}`;
  ordersList.appendChild(div);
});

/*
// Validation Tool (User Input)
// We’ll add a small tester in the Data Processing section.
const processingDiv = document.getElementById("processing");
processingDiv.innerHTML += `
  <h3 class="text-lg font-semibold mb-2">Validation Tool</h3>
  <input id="validationInput" type="text" class="border rounded px-2 py-1 w-64" placeholder="Enter email or ID" />
  <button class="bg-blue-500 text-white px-3 py-1 rounded ml-2" onclick="handleValidation()">Validate</button>
  <div id="validationResult" class="mt-3 text-gray-700"></div>
`;*/

function handleValidation() {
  const value = document.getElementById("validationInput").value;
  let result = "";

  if (validateEmail(value)) {
    result = "✅ Valid Email";
  } else if (validateOrderId(value)) {
    result = "✅ Valid Order ID";
  } else {
    result = "❌ Invalid format";
  }

  document.getElementById("validationResult").textContent = result;
}


// Statistics Functions
//Calculate key stats
function calculateStatistics() {
    const totalOrders = cleanedOrders.length;
    const totalValue = cleanedOrders.reduce((sum, o) => sum + o.price, 0);
    const averageValue = totalValue / totalOrders;
    const highestPrice = Math.max(...cleanedOrders.map(o => o.price));
    const lowestPrice = Math.min(...cleanedOrders.map(o => o.price));
  
    // Orders per category
    const categoryCounts = cleanedOrders.reduce((acc, o) => {
      acc[o.category] = (acc[o.category] || 0) + 1;
      return acc;
    }, {});
  
    // Unique categories
    const uniqueCategories = new Set(cleanedOrders.map(o => o.category));
  
    // Valid vs invalid emails
    const validEmails = cleanedOrders.filter(o => validateEmail(o.email)).length;
    const invalidEmails = totalOrders - validEmails;
  
    // Most expensive product
    const mostExpensive = cleanedOrders.reduce((max, o) => o.price > max.price ? o : max, cleanedOrders[0]);
  
    // Recent orders (last 30 days)
    const recentOrders = cleanedOrders.filter(o => isRecent(new Date(o.orderDate))).length;
  
    return {
      totalOrders,
      totalValue,
      averageValue,
      highestPrice,
      lowestPrice,
      categoryCounts,
      uniqueCategories: uniqueCategories.size,
      validEmails,
      invalidEmails,
      mostExpensive,
      recentOrders
    };
  }
  

  // Rendering Statistics Dashboard
  function renderStatistics() {
    const stats = calculateStatistics();
    const statsDiv = document.getElementById("statistics");
  
    statsDiv.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Statistics Dashboard</h3>
      <p><strong>Total Orders:</strong> ${stats.totalOrders}</p>
      <p><strong>Total Value:</strong> R${stats.totalValue.toFixed(2)}</p>
      <p><strong>Average Order Value:</strong> R${stats.averageValue.toFixed(2)}</p>
      <p><strong>Highest Price:</strong> R${stats.highestPrice.toFixed(2)}</p>
      <p><strong>Lowest Price:</strong> R${stats.lowestPrice.toFixed(2)}</p>
      <p><strong>Orders per Category:</strong> ${JSON.stringify(stats.categoryCounts)}</p>
      <p><strong>Unique Categories:</strong> ${stats.uniqueCategories}</p>
      <p><strong>Valid Emails:</strong> ${stats.validEmails}</p>
      <p><strong>Invalid Emails:</strong> ${stats.invalidEmails}</p>
      <p><strong>Most Expensive Product:</strong> ${stats.mostExpensive.product} (R${stats.mostExpensive.price.toFixed(2)})</p>
      <p><strong>Recent Orders (last 30 days):</strong> ${stats.recentOrders}</p>
    `;
  }
  
  // Call once initially
  renderStatistics();
  
