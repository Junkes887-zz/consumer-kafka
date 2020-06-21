import express, { Request, Response } from "express";
import { Kafka } from 'kafkajs'

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: 'certifications',
  brokers: ['localhost:9092']
})
const producer = kafka.producer()

const run = async () => {
  await producer.connect()

  app.post('/certifications', async (request: Request, response: Response) => {
    const { name, password} = request.body
    const message = {
      name,
      password,
      topic: 'Kafka com Node.js',
    }
    console.log(message)
    await producer.send({
      topic: 'certificate',
      messages: [
        { 
          value: JSON.stringify(message) 
        },
      ],
    })
  
    return response.json({ ok: true });
  })

  app.listen(3333);
}

run().catch(console.error)