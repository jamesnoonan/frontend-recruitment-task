function addCommaPrice(price) {
  // Convert price to string so zero padding is not lost
  const stringPrice = price.toString();
  const length = stringPrice.length;
  // Add first section of price to result
  let result = stringPrice.slice(0, length % 3);
  // Loop through each section and add commas between
  for (let i = length % 3; i < length; i += 3) {
    // Don't add comma in front if number has a multiple of three digits
    if (result.length > 0) {
      result += ',';
    }
    result += stringPrice.slice(i, i + 3);
  }
  return result;
}

export default addCommaPrice;
