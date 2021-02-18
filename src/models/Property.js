// A class for the Property collected from the Google Sheets

class Property {
  constructor(
    id,
    title,
    size,
    price,
    beds,
    baths,
    address,
    type,
    status,
    image
  ) {
    this.id = id;
    this.title = title;
    this.size = parseFloat(size);
    this.price = parseFloat(price);
    this.beds = parseInt(beds);
    this.baths = parseInt(baths);
    this.address = address;
    this.type = type;
    this.status = status;
    this.image = image;
  }
}

export default Property;
