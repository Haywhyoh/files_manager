import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const dbURL = `mongodb://${host}:${port}/${database}`;

class DBClient {
  constructor() {
    MongoClient.connect(dbURL, (err, client) => {
      if (err) {
        console.log(err.message);
        this.db = false;
        return;
      }
      this.db = client.db(database);
      this.users = this.db.collection('users');
      this.files = this.db.collection('files');
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
