import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId  : "kafka-learnings",
    brokers : ["localhost:9092"],
    // 10.83.31.71
});

