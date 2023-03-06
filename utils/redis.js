import { createClient } from 'redis';

/** This file contains functions that help work
  * with the redis client
  */

class RedisClient {
/**
  * Create a new redis client instance
  */
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

  /**
   * Gets the value of a given key.
   * @param {STRING} key The key of the item to get.
   * @returns {Srtring | Object}
   */
  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  /**
   *
   * @param {STRING} key the key of the value to be set.
   * @param {STRING} value the values to be stored.
   * @param {STRING | Number | Boolean} duration time before the cache expires.
   * @returns {Promise<void>}
   */
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
