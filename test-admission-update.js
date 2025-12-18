const https = require('http');

const data = JSON.stringify({
    id: 1,
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

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
