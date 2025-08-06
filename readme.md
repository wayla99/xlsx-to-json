# XLSX to JSON Converter

A Node.js application that converts Google Sheets data to JSON format and sends it to an API endpoint. This tool is designed for managing multilingual keyword data with support for Thai and English languages.

## 📋 Features

- Convert XLSX files to structured JSON format
- Support for multilingual data (Thai/English)
- Batch API data submission
- Configurable environment settings
- Error handling and logging

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/wayla99/xlsx-to-json.git
cd xlsx-to-json
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```bash
touch .env
```

4. Configure your environment variables in `.env`:

```env
API_URL=your_api_endpoint_here
USER_ID=your_user_id_here
```

## 📖 Usage Guide

### Step 1: Update Keywords in Google Sheets

1. Open the [Google Sheets document](https://docs.google.com/spreadsheets/d/1XUz_pjc-JRFureytVAyAYnCq39VsT0arfJsR7el_3aY/edit?gid=877757039#gid=877757039)
2. Update your keywords and translations
3. Ensure the sheet has columns for:
   - `Keyword`: The main keyword
   - `TH`: Thai translation
   - `EN`: English translation

### Step 2: Export and Move XLSX File

1. In Google Sheets, go to `File > Download > Microsoft Excel (.xlsx)`
2. Save the file as `data.xlsx`
3. Move the downloaded file to the root directory of this project

### Step 3: Convert XLSX to JSON

Run the conversion script:

```bash
npm run convert
```

This will:

- Read the `data.xlsx` file
- Convert each sheet to JSON format
- Save the output files in the `output/` directory
- Each JSON file will contain structured data with:
  ```json
  {
    "default_lang": "EN",
    "description": "",
    "keyword": "your_keyword",
    "lang_value": {
      "TH": "thai_translation",
      "EN": "english_translation"
    },
    "tags": ["patona"]
  }
  ```

### Step 4: Configure Target Environment

Edit the `.env` file to set your target environment:

```env
# Development
API_URL=https://dev-api.example.com/keywords
USER_ID=dev_user_123

# Production
# API_URL=https://api.example.com/keywords
# USER_ID=prod_user_456
```

### Step 5: Send Data to API

Send all converted JSON files to the API:

```bash
npm run send-data
```

Or send specific files:

```bash
npm run send-data filename1.json filename2.json
```

## 📁 Project Structure

```
xlsx-to-json/
├── convert.js          # XLSX to JSON conversion script
├── sendDataToApi.js    # API data submission script
├── getDataFromApi.js   # API data retrieval script
├── data.xlsx          # Source Excel file (place here after download)
├── package.json       # Project dependencies and scripts
├── .env              # Environment configuration
├── output/           # Generated JSON files
│   ├── address.json
│   ├── createCompany.json
│   ├── customer.json
│   └── ...
└── README.md
```

## 🛠 Available Scripts

- `npm run convert` - Convert XLSX file to JSON format
- `npm run send-data` - Send JSON data to API endpoint
- `npm run get-data` - Retrieve data from API (if needed)

## 🔧 Configuration

### Environment Variables

| Variable  | Description                    | Example                            |
| --------- | ------------------------------ | ---------------------------------- |
| `API_URL` | Target API endpoint            | `https://api.example.com/keywords` |
| `USER_ID` | User ID for API authentication | `user_123`                         |

### Input Data Format

Your Google Sheets should have the following columns:

- **Keyword**: The main keyword/phrase
- **TH**: Thai translation
- **EN**: English translation

## ⚠️ Important Notes

- Ensure your `.env` file is properly configured before sending data
- The script includes a 500ms delay between API calls to prevent rate limiting
- Check the console output for success/error messages during data submission
- Backup your data before running bulk operations

## 🐛 Troubleshooting

### Common Issues

1. **File not found error**: Ensure `data.xlsx` is in the root directory
2. **API errors**: Check your `.env` configuration and API endpoint
3. **Permission errors**: Verify your `USER_ID` has proper API access

### Error Messages

- ✅ Success messages show completed operations
- ❌ Error messages indicate failed operations with details

## 📝 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
