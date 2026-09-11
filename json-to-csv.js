/**
 * convert json array list to csv file format for google docs sheet
 * Usage: node json-to-csv.js <input-file>
 * 
 * Source file input: AssetStudio v0.16
 * Source example, filename: "test.json":
 * [ 83,
 *    1001,
 *    0,
 *    ["id","text"],
 *    [1,"版本：{0}"],
 *    [2,"版本：{0}"],
 *    ...<80 more lines>
 * ]
 * 
 * Output file: csv file format for google docs sheet
 * Output file name: <input-file>.csv
 * Output preference: https://support.google.com/docs/answer/40608?hl=en
 * Output tool: https://docs.google.com/spreadsheets/u/0/
 * Output format: csv file format for google docs sheet
 * Output example:
 * 
 */

const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node json-to-csv.js <input-file>');
    process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');
// Xử lý cả CRLF (Windows) và LF (Linux)
const jsonArray = JSON.parse(content.replace(/\r\n/g, '\n').replace(/\r/g, '\n'));
const outputFile = `${inputFile}.csv`;
// Convert JSON array to CSV format
let csvContent = '';
csvContent += `"Number of lines","${jsonArray[0]}"\n`;
csvContent += `"File ID","${jsonArray[1]}"\n`;
csvContent += `"Other","${jsonArray[2]}"\n`;
// Add the header row
csvContent += `"${jsonArray[3].join('","')}"\n`;
// Add the data rows
for (let i = 4; i < jsonArray.length; i++) {
    csvContent += `"${jsonArray[i].join('","')}"\n`;
}
fs.writeFileSync(outputFile, csvContent);
console.log(`✓ Converted: ${inputFile} -> ${outputFile}`);
