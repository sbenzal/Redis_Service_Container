const redis = require('redis');

// Creates a new Redis client
// In the workflow we are going ot set If REDIS_HOST and REDIS_PORT

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

redisClient.on("error", function(err) {
        console.log("Error " + err);
});

redisClient.set('hello', 'world', redis.print);
redisClient.hSet('spanish', 'red', 'rojo', redis.print);
redisClient.hSet('spanish', 'orange', 'naranja', redis.print);
redisClient.hSet('spanish', 'blue', 'azul', redis.print);
redisClient.hSet('german', 'red', 'rot', redis.print);
redisClient.hSet('german', 'orange', 'orange', redis.print);
redisClient.hSet('german', 'blue', 'blau', redis.print);

redisClient.get('hello', (err, value) => {
    if (err) console.log(err);
    else console.log(value);
});

redisClient.hGet('spanish', 'red', (err, value) => {
    if (err) console.log(err);
    else console.log(value);
});

redisClient.hKeys("german", function (err, germankeys) {
    console.log(germankeys.length + " germanWords:");
    germankeys.forEach(function (germankey, i) {
        redisClient.hGet('german', germankey, 
        (err, value) => {
            if (err) console.log(err);
            else console.log(" " + i + " German word for: " + 
            germankey + " is: " + value)
        });
});

redisClient.quit();
});