import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId  : "kafka-learnings",
    brokers : ["10.108.158.108:9092"],
    // 10.108.158.108
});

