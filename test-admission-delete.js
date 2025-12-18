const https = require('http');

// 1. Create a dummy admission to delete
const postData = JSON.stringify({
    firstName: "Delete",
    lastName: "Me",
    gradeApplying: "1",
    parentName: "Test Parent",
    email: "delete@example.com",
    phone: "1234567890"
});

const postOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admissions/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

console.log("Creating admission to delete...");
const postReq = https.request(postOptions, (res) => {
    console.log(`POST StatusCode: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`POST Response ID: ${data.substring(0, 50)}...`);
        try {
            const response = JSON.parse(data);
            if (response.success) {
                const idToDelete = response.data.id;
                console.log(`Created admission with ID: ${idToDelete}`);

                // 2. Delete the admission
                deleteAdmission(idToDelete);
            } else {
                console.error("Failed to create admission:", response);
            }
        } catch (e) {
            console.error("JSON Parse Error:", e.message);
            console.error("Raw Data:", data);
        }
    });
});

postReq.write(postData);
postReq.end();

function deleteAdmission(id) {
    console.log(`Deleting admission ID: ${id}...`);
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/admissions/?id=${id}`,
        method: 'DELETE',
    };

    const req = https.request(options, (res) => {
        console.log(`DELETE StatusCode: ${res.statusCode}`);
        let data = '';
        res.on('data', (d) => { data += d; });
        res.on('end', () => {
            console.log("DELETE Response:", data);

            // 3. Verify it's gone
            verifyDeletion(id);
        });
    });

    req.end();
}

function verifyDeletion(id) {
    console.log(`Verifying deletion of ID: ${id}...`);
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/admissions/',
        method: 'GET',
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            const admissions = JSON.parse(data);
            const found = admissions.find(a => a.id.toString() === id.toString());
            if (!found) {
                console.log("SUCCESS: Admission not found in list (Deletion confirmed).");
            } else {
                console.error("FAILURE: Admission still exists in list.");
            }
        });
    });

    req.end();
}
