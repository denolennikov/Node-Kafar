const kafka = require('kafka-node'),
uuid = require('uuid');

const Client =  kafka.KafkaClient;

// const client = new Client(process.env.KAFKA_HOST, 8, {
//    sessionTimeout: 300,
//    spinDelay: 100,
//    retries: 2
// });
// const client = new Client({
//     autoConnect: false,
//     KafkaHost: process.env.KAFKA_HOST
// });

const client = new Client(process.env.HOST)

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function() {
    console.log("Kafka Producer is connected and ready.");
});

// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
   console.error(error);
});

const KafkaService = {
   sendRecord: ({ entity, id, before, after }, callback = () => {}) => {
      if (!id) {
          return callback(new Error(`A id must be provided.`));
      }

      const event = {
          entity: entity,
          id: id,
          correlationId: uuid.v4(),
          before: before,
          after: after
      };

       const buffer = new Buffer.from(JSON.stringify(event));
       // Create a new payload
       const record = [
           {
               topic: "webevents.dev",
               messages: buffer,
               attributes: 1 /* Use GZip compression for the payload */
           }
       ];

       //Send record to Kafka and log result/error
       producer.send(record, callback);
   }
};
module.exports = KafkaService;