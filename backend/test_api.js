const http = require('http');

function apiCall(path, method = 'GET', body = null, token = 'test-token') {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 8000,
            path: `/api/v1${path}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        body: JSON.parse(data)
                    });
                } catch (e) {
                    reject(new Error(`Failed to parse JSON: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    console.log('--- Testing GET /leads (200) ---');
    try {
        const res = await apiCall('/leads');
        console.log(`Status: ${res.status}`, res.body);
        if (res.status === 200 && res.body.success) console.log('✅ Passed');
    } catch (e) { console.error('❌ Error:', e.message); }

    console.log('\n--- Testing PATCH /leads/c1 INVALID STATUS (400) ---');
    try {
        const res = await apiCall('/leads/c1', 'PATCH', { status: 'invalid-status' });
        console.log(`Status: ${res.status}`, res.body);
        if (res.status === 400 && !res.body.success) console.log('✅ Passed');
    } catch (e) { console.error('❌ Error:', e.message); }

    console.log('\n--- Testing POST /tickets MISSING FIELDS (400) ---');
    try {
        const res = await apiCall('/tickets', 'POST', { issueType: 'Technical' });
        console.log(`Status: ${res.status}`, res.body);
        if (res.status === 400 && !res.body.success) console.log('✅ Passed');
    } catch (e) { console.error('❌ Error:', e.message); }

    console.log('\n--- Testing GET /leads/invalid-route (404) ---');
    try {
        const res = await apiCall('/invalid-route');
        console.log(`Status: ${res.status}`, res.body);
        if (res.status === 404 && !res.body.success) console.log('✅ Passed');
    } catch (e) { console.error('❌ Error:', e.message); }
}

runTests();
