import { settings } from "../settings";

const redis = require("redis");

export class RedisPubSub {
  public client;

  constructor() {
    this.client = redis.createClient(settings.redis.URI);
  }

  sendMessage(message: any) {
    return this.client.publish(
      settings.redis.AUTH_OUTPUT_CHANNEL,
      JSON.stringify(message)
    );
  }

  recieveMessage(callback: Function) {
    return this.client.on(settings.redis.AUTH_INPUT_CHANNEL, callback);
  }
}
