/**
 * revert json-to-csv.js after edit on docs sheet
 * Use TSV instead of CSV to easily parse strings containing commas into lists of JSON subarrays.
 * 
 * Source file input: tsv of google docs sheet
 * Source example, filename: "test.json.tsv":
 * Number of lines  83,,,,,etc (base on the number of column)
 * File ID	1001,,,,,etc (base on the number of column)
 * Other	0,,,,,etc (base on the number of column)
 * id	text	x	y	z	etc (base on the number of column)
 * 1	"版本：{0}"	a	b	c	etc (base on the number of column)
 * 2	"版本：{0}"	"1,2,3"	"4,5,6"	etc (base on the number of column)
 * ...<80 more lines>
 * 
 * Output file: reverted to json array list format for unity TextAsset by AssetStudio v0.16
 * Output file name: <input-file>.json
 * Output example:
 * [
 *   83,
 *   1001,
 *   0,
 *   ["id","text","x","y","z",,,etc (base on the number of column)],
 *   [1,"版本：{0}","a","b","c",,,etc (base on the number of column)],
 *   [2,"版本：{0}","[1,2,3]","[4,5,6]",,,etc (base on the number of column)],
 *   ...<80 more lines>
 * ]
 */

const fs = require('fs');

const inputFile = process.argv[2];
if (!inputFile) {
    console.error('Usage: node tsv-to-json.js <input-file>');
    process.exit(1);
}

const content = fs.readFileSync(inputFile, 'utf-8');
// tsv to json array list
let filename = inputFile.replace(/\.tsv$/, '').split(/[\\/]/).pop();
// write into Output folder
const outputFile = `Output/${filename}.json`;

function formatArrayRows(data) {
    const lines = ['['];
    data.forEach((row, index) => {
        lines.push(`  ${JSON.stringify(row)}${index < data.length - 1 ? ',' : ''}`);
    });
    lines.push(']');
    return lines.join('\n');
}

// Write the JSON content to the output file
// first 3 line, only get value of column 2.
const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
const firstLine = lines[0].split('\t')[1].trim();
const secondLine = lines[1].split('\t')[1].trim();
const thirdLine = lines[2].split('\t')[1].trim();

// data line from 4th,
// keep group of column like "1,2,3" => "[1,2,3]" (json array)
const otherData = lines.slice(3).map(line => {
    const columns = line.split('\t');
    return columns.map(column => {
        const value = column.trim();

        // JSON subarrays check
        if (value.includes(',')) {
            // if has double quotes, remove double quotes and wrap with square brackets
            if (value.startsWith('"') && value.endsWith('"')) {
                // if include "[" or "]" inside, remove them and wrap with square brackets
                if (value.includes('[') || value.includes(']')) {
                    return `[${value.slice(1, -1).replace(/\[/g, '').replace(/\]/g, '')}]`;
                }
                return `[${value.slice(1, -1)}]`;
            }
            // if include "[" or "]" inside, remove them and wrap with square brackets
            if (value.includes('[') || value.includes(']')) {
                return `[${value.replace(/\[/g, '').replace(/\]/g, '')}]`;
            }
            // if no double quotes, wrap with square brackets only
            return `[${value}]`;
        }

        // if number, boolean, no double quotes
        if (value !== '' && !isNaN(value)) {
            return Number(value);
        }
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        return value;
    });
});

// dump data info
console.info("File input number of lines: " + firstLine);
console.info("Re-calculate record number: " + (otherData.length -1));
console.info("To fast check, end data - header line = firstLine");

// ghi lại file json array
const finalJsonArray = [otherData.length - 1, parseInt(secondLine), parseInt(thirdLine), ...otherData];
fs.writeFileSync(outputFile, formatArrayRows(finalJsonArray));
// re-format json: '"[' => '[' and ']"' => ']'
const jsonContent = fs.readFileSync(outputFile, 'utf-8');
const formattedJsonContent = jsonContent.replace(/"\[/g, '[').replace(/\]"/g, ']');
fs.writeFileSync(outputFile, formattedJsonContent);

console.log(`✓ Reverted TSV -> JSON: ${inputFile} -> ${outputFile}`);