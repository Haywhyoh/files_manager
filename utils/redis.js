import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.connect();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      this.isClientConnected = false;
      console.log(`Redis client not connected to the server: ${err.message}`);
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key, value, duration) {
    return this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    return this.client.del(key);
  }

  isAlive() {
    return this.isClientConnected;
  }
}

const redisClient = new RedisClient();
export default redisClient;
