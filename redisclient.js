const redis = require("redis");

// Creates a new Redis client
// In the workflow we are going ot set If REDIS_HOST and REDIS_PORT

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.on("error", function(err) {
        console.log("Error " + err);
});

redisClient.set('hello', 'world', redis.print);
redisClient.hset('spanish', 'red', 'rojo', redis.print);
redisClient.hset('spanish', 'orange', 'naranja', redis.print);
redisClient.hset('spanish', 'blue', 'azul', redis.print);
redisClient.hset('german', 'red', 'rot', redis.print);
redisClient.hset('german', 'orange', 'orange', redis.print);
redisClient.hset('german', 'blue', 'blau', redis.print);

redisClient.get('hello', (err, value) => {
    if (err) console.log(err);
    else console.log(value);
});

redisClient.hget('spanish', 'red', (err, value) => {
    if (err) console.log(err);
    else console.log(value);
});

redisClient.hkeys("german", function (err, germankeys) {
    console.log(germankeys.length + " germanWords:");
    germankeys.forEach(function (germankey, i) {
        redisClient.hget('spanish', germankey, 
        (err, value) => {
            if (err) console.log(err);
            else console.log(" " + i + " German word for: " + 
            germankey + " is: " + value)
        });
});

redisClient.quit();
});