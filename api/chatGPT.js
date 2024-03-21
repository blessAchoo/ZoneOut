/*
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const prompt = req.body.prompt;

    const response = await fetch('https://api.openai.com/v1/assistants/asst_b5kpzgwNTiw8TLMEbbIlxImL/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 100
        })
    });

    const data = await response.json();

    res.status(200).json({ response: data.choices[0].message.content });
};
*/
