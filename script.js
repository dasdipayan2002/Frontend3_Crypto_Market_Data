// Fetch data using .then
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(data => renderTable(data))
.catch(error => console.error('Error fetching data:', error));

// Fetch data using async/await
async function fetchData() {
try {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
  const data = await response.json();
  renderTable(data);
} catch (error) {
  console.error('Error fetching data:', error);
}
}

function renderTable(data) {
const tableBody = document.getElementById('cryptoTableBody');
tableBody.innerHTML = '';
data.forEach(coin => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><div id='align'><img src = '${coin.image}'>${coin.name}</div></td>
    <td>${coin.symbol.toUpperCase()}</td>
    <td>$${coin.current_price}</td>
    <td>$${coin.total_volume.toLocaleString()}</td>
    <td id='green'>${coin.price_change_percentage_24h.toPrecision(2)}%</td>
    <td>Mkt Cap: $${coin.market_cap.toLocaleString()}</td>
  `;
  tableBody.appendChild(row);
});
}

function sortData() {
const tableBody = document.getElementById('cryptoTableBody');
const rows = Array.from(tableBody.querySelectorAll('tr'));

rows.sort((a, b) => {
  const aMarketCap = parseFloat(a.querySelector('td:nth-child(6)').innerText.replace('$', '').replace(/,/g, '').replace('Mkt Cap: ',''));
  const bMarketCap = parseFloat(b.querySelector('td:nth-child(6)').innerText.replace('$', '').replace(/,/g, '').replace('Mkt Cap: ',''));
  return aMarketCap - bMarketCap;
});

tableBody.innerHTML = '';
rows.forEach(row => tableBody.appendChild(row));
}

function sortDataByPercentage() {
const tableBody = document.getElementById('cryptoTableBody');
const rows = Array.from(tableBody.querySelectorAll('tr'));

rows.sort((a, b) => {
  const aPercentageChange = parseFloat(a.querySelector('td:nth-child(5)').innerText);
  const bPercentageChange = parseFloat(b.querySelector('td:nth-child(5)').innerText);
  return aPercentageChange - bPercentageChange;
});

tableBody.innerHTML = '';
rows.forEach(row => tableBody.appendChild(row));
}

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
const searchTerm = searchInput.value.toLowerCase();
const rows = document.querySelectorAll('#cryptoTableBody tr');
rows.forEach(row => {
  const name = row.querySelector('td:nth-child(1)').innerText.toLowerCase();
  const symbol = row.querySelector('td:nth-child(2)').innerText.toLowerCase();
  if (name.includes(searchTerm) || symbol.includes(searchTerm)) {
    row.style.display = '';
  } else {
    row.style.display = 'none';
  }
});
});