/**
 * convert-json.js
 * Change Json array to TextAsset format for Unity
 * Usage: node convert-json.js <input-file>
 * 
 * Source file input: AssetStudio v0.16
 * Source extraction tool: https://github.com/perfare/assetstudio
 * Source format: json array
 * 
 * Output file: TextAsset format for Unity, UABE 2.2 or 3.0 beta1
 * Output preference: https://docs.unity3d.com/Manual/class-TextAsset.html
 * Output tool: https://github.com/SeriousCache/UABE
 * Output format: text asset dump of UABE
 */
const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Usage: node convert-json.js <input-file>');
  process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');
// Xử lý cả CRLF (Windows) và LF (Linux)
let filename = inputFile.replace(/\.json$/, '').split(/[\\/]/).pop();
let prefix = '0 TextAsset Base';
prefix += '\n 1 string m_Name = "' + filename + '"';
prefix += '\n 1 string m_Script = "';
const suffix = '"';
const converted = content.replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n');
const outputFile = `${inputFile}.txt`;
// Replace first "[\n" => "["
fs.writeFileSync(outputFile, prefix + converted.replace(/^\[\\n /, '[') + suffix);
console.log(`✓ Converted: ${inputFile} -> ${outputFile}`);