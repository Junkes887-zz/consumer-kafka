import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'certifications',
  brokers: ['localhost:9092']
})

const topic = 'certificate'
const consumer = kafka.consumer({ groupId: 'consumer-group' })

async function run (){
  await consumer.connect()
  await consumer.subscribe({topic})

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Response: ' + message.value)
    },
  })
}

run().catch(console.error)