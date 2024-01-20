import { config } from 'dotenv'
config()
import { OpenAI } from 'openai'

const openai = new OpenAI( { apiKey: process.env.API_KEY } );

openai.chat.completions.create({ 
    model: "gpt-3.5-turbo",
    messages: [
        { role: "user", content: "Hello ChatGPT" }
    ]
}).then(res => {
    console.log(res)
    res.choices.forEach( out => console.log(out.message) );
});


