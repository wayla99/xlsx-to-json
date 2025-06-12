import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getDataFromApi() {
  const url = process.env.API_GET_URL;
  const headers = {
    accept: "application/json",
    "x-user-id": process.env.USER_ID,
  };

  try {
    const response = await axios.get(url, { headers });

    console.log("✅ Data received:");
    console.dir(response.data, { depth: null });
  } catch (error) {
    console.error("❌ Error fetching data:", error.message);
  }
}

getDataFromApi();
