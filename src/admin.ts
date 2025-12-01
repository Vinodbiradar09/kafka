import { kafka } from "./client.js";

const AdminTopics = async () => {
  try {
    const topic = "rider-updates";
    const admin = kafka.admin();
    await admin.connect();
    const topicLists = await admin.listTopics();
    if (!topicLists.includes(topic)) {
      console.log("new topic");
      await admin.createTopics({
        topics: [
          {
            topic,
            numPartitions: 2,
          },
        ],
      });
      console.log("topic created successfully");
    }
    console.log("using the existing topic");
    await admin.disconnect();
  } catch (error) {
    console.log("error in creating admin and topics");
  }
};
AdminTopics();

/*
 const AdminTopics = async()=>{
    try{
        const topic = "rider-updates";
        const admin = kafka.admin(),
        await admin.connect();

        const topicLists = await admin.listTopics();
        if(!topicLists.includes(topic){
            console.log("new topic");
            await admin.createTopics({
                topics : [
                  {
                    topic,
                    numPartitions : 4,
                  }
                ]
            })
        }
        
        console.log("using the existing topic");
    }
 }
*/
