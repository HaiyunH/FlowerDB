# Flower Bouquet Mini Program

A WeChat Mini Program for displaying and managing flower bouquet inventory. Users can browse bouquets, filter by price and availability, and view random bouquet suggestions.

## Features

- **Today's Bouquets**: View bouquets currently in stock
- **All Bouquets**: Browse complete bouquet catalog
- **Random Bouquet**: Get random bouquet suggestions
- **Filter System**: Filter bouquets by:
  - Availability (今日)
  - Price ranges (¥100以下, ¥100-200, ¥200-300, ¥300+)

## Tech Stack

### Frontend
- WeChat Mini Program Framework
- WXML/WXSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB Atlas

## Project Structure
```
├── pages/
│   ├── index/               # Homepage
│   ├── bouquetList/         # Bouquet list page
│   ├── randomBouquet/       # Random bouquet page
├── utils/
│   ├── filter.js            # Filter logic
├── app.js                   # Global logic
├── app.json                 # Global configuration
├── project.config.json      # Mini Program configuration

## Database Schema

### Bouquets Collection
json
{
"id": "unique_bouquet_id",
"name": "Dreamy Roses",
"image": "image_url",
"price": 100,
"materials": [
{"name": "Rose", "quantity": 10},
{"name": "Baby's Breath", "quantity": 5}
],
"inStockToday": true
}

### Materials Collection
json
{
"id": "unique_material_id",
"name": "Rose",
"description": "A popular flower material",
"image": "material_image_url"
}


## API Endpoints

- `GET /api/bouquets` - Retrieve all bouquets
- `GET /api/bouquets?inStockToday=true` - Get today's available bouquets
- `GET /api/randomBouquet` - Get a random bouquet
- `GET /api/materials` - Get material details

## Setup and Installation

1. Clone the repository
2. Install dependencies
3. Configure MongoDB Atlas connection
4. Set up WeChat developer tools
5. Import the project

## Development

1. Frontend Development
   - Implement page layouts
   - Set up navigation
   - Integrate filter system

2. Backend Development
   - Initialize MongoDB database
   - Set up API endpoints
   - Implement data backup system

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact

Project Owner: Haiyun Huang