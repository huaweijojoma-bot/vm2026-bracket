const https = require('https');

function httpsRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'No API key' }) };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch(e) { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const payload = JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    tools: [
      {
        type: 'web_search_20250305',
        name: 'web_search'
      }
    ],
    messages: [{
      role: 'user',
      content: body.prompt
    }]
  });

  try {
    const response = await httpsRequest({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);

    const data = JSON.parse(response.body);
    
    // Hitta text-blocket i svaret (efter webpsökning)
    const textBlock = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: textBlock || JSON.stringify({ error: 'No text response', raw: data })
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
