import { kafka } from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Producers = async () => {
  try {
    const producer = kafka.producer();
    await producer.connect();

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async (line) => {
      const [riderName, location] = line.split(" ");
      await producer.send({
        topic: "rider-updates",
        messages: [
          {
            // partition: location?.toLowerCase() === "north" ? 0 : 1, you may add the partition but in prod people will avoid it and make sure that the key should be riderID not a random string 
            key: "location-update",
            value: JSON.stringify({ name: riderName, location }),
          },
        ],
      });
      rl.prompt();
    }).on("close", async () => {
      await producer.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.log("failed to connect the producer");
  }
};

Producers();

/*

const Producers = async()=>{
    try{
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic : "rider-updates",
            messages : [
                {
                    partitions : 1 or 0 or 2,
                    key : "location updates",
                    value : JSON.stringfy({riderName , location})
                }
            ]
        })
    }
}

*/
