// calculate stock gains
const calculateStockGains = () => {
  const purchasePrice = document.getElementById('purchasePrice').value;
  const purchaseQuantity = document.getElementById('purchaseQuantity').value;
  const currentPrice = document.getElementById('currentPrice').value;
  const gains = (currentPrice - purchasePrice) * purchaseQuantity;
  document.getElementById('gains').value = gains;
  return gains;
}

// once input is changed, calculate stock gains
// but only if all inputs are filled
document.getElementById('purchasePrice').addEventListener('input', () => {
  if (document.getElementById('purchasePrice').value && document.getElementById('purchaseQuantity').value && document.getElementById('currentPrice').value) {
    const gains = calculateStockGains();
    // display results
    // id of the element to display the results is 'results'
    document.getElementById('results').innerHTML = `You have made a profit of $${gains} from this stock.`;
  }
});