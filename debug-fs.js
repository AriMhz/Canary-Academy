const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'data', 'admissions.json');

console.log("Path:", dataFilePath);

try {
    if (!fs.existsSync(dataFilePath)) {
        console.log("File does not exist, creating array");
        // fs.writeFileSync(dataFilePath, '[]');
    } else {
        console.log("File exists");
        const content = fs.readFileSync(dataFilePath, 'utf-8');
        console.log("Content:", content);
    }

    const newAdmission = { id: 1, test: true };
    // const admissions = [];
    // admissions.push(newAdmission);
    // fs.writeFileSync(dataFilePath, JSON.stringify(admissions, null, 2));
    console.log("Write success");

} catch (e) {
    console.error("Error:", e);
}
