const https = require('http');

// First fetch to get an ID
const getOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admissions/',
    method: 'GET',
};

const req = https.request(getOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const admissions = JSON.parse(data);
        if (admissions.length > 0) {
            const idToUpdate = admissions[0].id;
            console.log(`Updating ID: ${idToUpdate}`);
            updateAdmission(idToUpdate);
        } else {
            console.log("No admissions found to update");
        }
    });
});

req.end();

function updateAdmission(id) {
    const data = JSON.stringify({
        id: id,
        status: 'approved'
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/admissions/',
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', (d) => { process.stdout.write(d); });
    });

    req.write(data);
    req.end();
}
