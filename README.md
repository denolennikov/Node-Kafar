#Purpose

This is a test project to get a REST API up and running with Node, Express, Kafka and MongoDB

#Run
- .env `DATABASE_URL=mongodb://localhost/kafka
   KAFKA_DISABLED=true
   KAFKA_HOST=localhost:9092
   HOST=localhost:2181`
- zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties & kafka-server-start /usr/local/etc/kafka/server.properties

- Run `npm install` to install node modules
- Run `mongod` to start MongoDB database
- Run `npm run devStart` to start the server