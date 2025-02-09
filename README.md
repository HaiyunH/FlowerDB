# Flower Bouquet Mini Program

A WeChat Mini Program designed for displaying and managing a flower bouquet inventory. Users can browse bouquets, filter them by price and availability, and view random bouquet suggestions.

## Features

- **Today's Bouquets**: View bouquets that are currently in stock.
- **All Bouquets**: Browse the complete catalog of available bouquets.
- **Random Bouquet**: Get random bouquet suggestions for a surprise selection.
- **Filter System**: Filter bouquets based on:
  - Availability (今日)
  - Price ranges:
    - ¥100以下 (Under ¥100)
    - ¥100-200
    - ¥200-300
    - ¥300+ (Above ¥300)

## Tech Stack

### Frontend
- **WeChat Mini Program Framework**: Utilizes WeChat's native framework for building mini programs.
- **WXML/WXSS**: WeChat's markup and styling languages.
- **JavaScript**: For logic and interactivity.

### Backend
- **Cloud Database**: Utilizes WeChat's cloud database for data storage and retrieval.
- **Cloud Functions**: For serverless backend logic.

## Project Structure

```
FlowerMiniApp/
├── pages/
│   ├── index/               # Homepage
│   ├── bouquetList/         # Bouquet list page
│   ├── randomBouquet/       # Random bouquet page
├── utils/
│   ├── api.js               # API utility for cloud database operations
│   ├── filter.js            # Filter logic for bouquets
├── mockBouquets/            # Folder containing bouquet images
├── app.js                   # Global application logic
├── app.json                 # Global configuration for the mini program
├── project.config.json      # Configuration for WeChat developer tools
└── .gitignore               # Git ignore file for version control
```

## Database Schema

### Bouquets Collection
Each bouquet document in the cloud database should follow this structure:
```json
{
  "_id": "unique_bouquet_id",
  "name": "Dreamy Roses",
  "image": "image_url", // URL of the bouquet image in cloud storage
  "price": 100,
  "materials": [
    {"name": "Rose", "quantity": 10},
    {"name": "Baby's Breath", "quantity": 5}
  ],
  "inStockToday": true // Boolean indicating availability today
}
```

### Materials Collection
Each material document should follow this structure:
```json
{
  "_id": "unique_material_id",
  "name": "Rose",
  "description": "A popular flower material",
  "image": "material_image_url" // URL of the material image in cloud storage
}
```

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/FlowerMiniApp.git
   cd FlowerMiniApp
   ```

2. **Set Up WeChat Cloud Development**:
   - Open WeChat Developer Tools.
   - Create a new project and select "Cloud Development".
   - Set up your cloud environment (e.g., `flowerdb-8g0q6tv0bb7e5950`).

3. **Configure Cloud Database**:
   - Create two collections in the cloud database: `bouquets` and `materials`.
   - Populate these collections with sample data based on the provided schema.

4. **Import the Project**:
   - Import the cloned project into WeChat Developer Tools.
   - Ensure that the project settings are correctly configured.

5. **Run the Project**:
   - Use the WeChat Developer Tools to preview and test the mini program.

## Development

### Frontend Development
- Implement page layouts using WXML and WXSS.
- Set up navigation between pages (Homepage, Bouquet List, Random Bouquet).
- Integrate the filter system to allow users to filter bouquets based on availability and price.

### Backend Development
- Utilize WeChat's cloud functions to handle data retrieval and storage.
- Implement API calls to fetch bouquets and materials from the cloud database.
- Ensure proper error handling and loading states for a smooth user experience.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

**Project Owner**: Haiyun Huang  
**Email**: your.email@example.com  
**GitHub**: [yourusername](https://github.com/yourusername)

## Acknowledgments

- WeChat Mini Program documentation for guidance on cloud development.
- Inspiration from various floral design resources and applications.