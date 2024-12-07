# Airbnb Listing Analyzer

This project demonstrates how to scrape and analyze Airbnb data using [Firecrawl](https://www.firecrawl.dev/) and [Anthropic's Claude](https://www.anthropic.com/) in a NextJS application.

## Prerequisites

1. **Node.js and npm**
   - Node.js 18.x or later
   - npm 9.x or later
   
   You can check your versions by running:
   ```bash
   node --version
   npm --version
   ```

2. **API Keys**
   - [Firecrawl API key](https://www.firecrawl.dev/) - Sign up at Firecrawl to get your API key
   - [Anthropic API key](https://www.anthropic.com/) - Get your Claude API key from Anthropic

3. **Environment Setup**
   Create a `.env.local` file in your project root with:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   FIRECRAWL_API_KEY=your_firecrawl_api_key_here
   ```

4. **Dependencies**
   ```bash
   npm install @anthropic-ai/sdk firecrawl-js chart.js react-chartjs-2
   ```

## Project Structure

```
├── components/
│   └── AirbnbAnalyzer.tsx    # Main analyzer component
├── pages/
│   ├── api/
│   │   └── analyze-airbnb.ts # API route for analysis
│   └── index.tsx             # Main page
├── .env.local                # Environment variables
└── package.json
```

## Features

- 🏠 Airbnb listing data scraping
- 📊 Price analysis and statistics
- 🛋️ Amenities visualization
- 🏷️ Room type distribution
- ⭐ Rating analysis
- 📍 Location information

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd airbnb-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env.local`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter an Airbnb listing URL in the input field
2. Click "Analyze"
3. View the comprehensive analysis including:
   - Price statistics
   - Amenities breakdown
   - Room type distribution
   - Ratings
   - Location details

## Development

To add new features or modify the analysis:

1. Update the API route in `pages/api/analyze-airbnb.ts`
2. Modify the visualization component in `components/AirbnbAnalyzer.tsx`
3. Add new charts or analysis features as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this code for your own projects.

