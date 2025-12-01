import { kafka } from "./client.js";
const group = process.argv[2];

const Consumers = async () => {
  try {
    const consumer = kafka.consumer({ groupId: group?.toString()! });
    await consumer.connect();
    await consumer.subscribe({
      topics: ["rider-updates"],
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log(
          `the group is ${group} and topic is ${topic} and partition is ${partition} heartbeat is ${heartbeat}`,
          message.value?.toString()
        );
      },
    });
  } catch (error) {
    console.log("error in connecting consumer" , error);
  }
};

Consumers();
