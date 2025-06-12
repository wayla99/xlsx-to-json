import xlsx from "xlsx";
import fs from "fs";
import path from "path";

function convertXlsxToJson(filePath) {
  const workbook = xlsx.readFile(filePath);
  const result = {};

  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    result[sheetName] = data.map((row) => ({
      default_lang: "EN",
      description: "",
      keyword: row["Keyword"]?.trim() || "",
      lang_value: {
        TH: row["TH"]?.trim() || "",
        EN: row["EN"]?.trim() || "",
      },
      tags: ["patona"],
    }));
  });

  return result;
}

const filePath = "data.xlsx";
const outputDir = "output";
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const jsonData = convertXlsxToJson(filePath);

Object.keys(jsonData).forEach((sheetName) => {
  fs.writeFileSync(
    path.join(outputDir, `${sheetName}.json`),
    JSON.stringify(jsonData[sheetName], null, 2)
  );
});

console.log("✅ convert success");
