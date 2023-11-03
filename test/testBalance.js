const fetch = require('node-fetch');

async function getBtcBalance(addresses, threshold){
    const url = "http://localhost:3000/api/check-btc-balance/"; 
    const body = {
        addresses,
        threshold
    };
    console.log(body);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(body)
        });
        const data = await response.json();
        console.log(data);
    }catch (err) {
        console.error('Error sending notification:', err);
    }
}

getBtcBalance(['tb1qd5f0574r3mghfglmvlpfmknquarjw20r9mwm4v'],"1000000")