/*const fetch = require('node-fetch');

app.post('/chatGPT', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await response.json();
        res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
*/

import axios from 'axios';
import express from 'express';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

const app = express();
app.use(express.static('./'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

dotenv.config();

const openai = new OpenAI();

async function createAssistant() {
  const assistant = await openai.beta.assistants.create({
    name: "Journal Analyzer",
    instructions: "You analyze the text from the user and return a string array containing ONLY positive emotions which counteract the negative emotions expressed in the text. It should ONLY return in this format: [x, y, z, ...]",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-3.5-turbo"
  });
  return assistant;
}
app.use(express.json());
app.post('/chatGPT', async (req, res) => {
  const assistant = await createAssistant();  
  const thread = await openai.beta.threads.create();

  const message = await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: req.body.prompt
    }
  );

  let run = await openai.beta.threads.runs.create(
    thread.id,
    {
      assistant_id: assistant.id,
      instructions: ""
    }
  );

  while (['queued', 'in_progress', 'cancelling'].includes(run.status)) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    run = await openai.beta.threads.runs.retrieve(
      run.thread_id,
      run.id
    );
  }

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );
    console.log(messages.data.reverse()[1]);
    let image_prompt = "A 360 panorama image that expresses the emotions of: ";
    for (const message of messages.data.reverse()) {
      if (message.role == "assistant") {
        image_prompt += " " + message.content[0].text.value + ", ";
      }
    }
    console.log(image_prompt);
    //for (const message of messages.data.reverse()) {
      //console.log(`${message.role} > ${message.content[0].text.value}`);
    const image = await openai.images.generate({
      prompt: image_prompt, // Use the response from ChatGPT as the prompt
      n: 1, // Number of images to generate
      size: "1792x1024", // Size of the image
      model: "dall-e-3",
      quality: "hd",
      style: "vivid",
    });
    const imageUrl = image.data[0].url;
    console.log(imageUrl);
    res.json({ chatResponse: run.response, imageUrl: imageUrl });

    //}
  } else {
    console.log(run.status);
  }
});

app.get('/image-proxy', async (req, res) => {
  try {
      const imageUrl = req.query.url;
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      res.set('Content-Type', 'image/png');
      res.send(imageResponse.data);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});
//document.querySelector('button').addEventListener('click', main);

