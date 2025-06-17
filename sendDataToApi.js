import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function sendDataToApi(filePath) {
  const url = process.env.API_URL;
  const headers = {
    accept: "application/json",
    "x-user-id": process.env.USER_ID,
    "Content-Type": "application/json",
  };

  
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    for (const item of jsonData) {
      try {
        const response = await axios.post(url, item, { headers });
        console.log(
          `✅ status : ${response.status}, success keyword: ${item.keyword}`
        );
      } catch (error) {
        console.log(`❌ error on keyword: ${item.keyword}`, error.response ? error.response.data.error : error.message);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  
}

const files = process.argv.slice(2);

if (files.length === 0) {
  console.log(
    "No files specified. Sending all JSON files from the 'output' directory..."
  );

  const outputDir = "output";
  fs.readdirSync(outputDir).forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(outputDir, file);
      sendDataToApi(filePath);
    }
  });
} else {
  files.forEach((file) => {
    const filePath = path.join("output", file);
    if (fs.existsSync(filePath)) {
      sendDataToApi(filePath);
    } else {
      console.log(`❌ File ${file} does not exist in the output directory.`);
    }
  });
}
