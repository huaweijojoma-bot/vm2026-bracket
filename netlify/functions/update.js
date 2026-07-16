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

  // Steg 1: Sök efter live-resultat
  const searchPayload = JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    messages: [{
      role: 'user',
      content: 'Search for the latest FIFA World Cup 2026 results today including all quarterfinal scores. What matches have been played and what were the scores?'
    }]
  });

  let searchResults = '';
  try {
    const searchResp = await httpsRequest({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05',
        'Content-Length': Buffer.byteLength(searchPayload)
      }
    }, searchPayload);

    const searchData = JSON.parse(searchResp.body);
    searchResults = (searchData.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');
  } catch(e) {
    searchResults = 'Web search unavailable';
  }

  // Steg 2: Bygg JSON baserat på sökresultaten
  const jsonPayload = JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    system: 'You are a JSON generator. You ONLY output valid JSON. Never write any text before or after the JSON object. Never explain anything.',
    messages: [{
      role: 'user',
      content: `Based on these search results about FIFA World Cup 2026:\n\n${searchResults}\n\nAnd this current bracket state:\n\n${body.prompt}\n\nReturn ONLY a JSON object with updated results. Format:\n{"r32":[],"r16":[],"qf":[{"id":"qf1","t1":"🇫🇷 Frankrike","s1":2,"t2":"🇲🇦 Marocko","s2":0,"st":"F","p":null,"winner":"🇫🇷 Frankrike"}],"sf":[],"fin":{},"note":"what changed"}\n\nStatus values: F=finished, P=penalties, L=live, ""=not played yet. Only include matches that have changed or been played. Use exact emoji flag team names from the bracket state.`
    }]
  });

  try {
    const jsonResp = await httpsRequest({
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(jsonPayload)
      }
    }, jsonPayload);

    const jsonData = JSON.parse(jsonResp.body);
    let text = (jsonData.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    // Extrahera JSON om det finns text runt om
    const match = text.match(/\{[\s\S]*\}/);
    if (match) text = match[0];

    // Validera att det är JSON
    JSON.parse(text);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: text
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
