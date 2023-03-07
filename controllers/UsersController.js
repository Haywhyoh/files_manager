import sha1 from 'sha1';
import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ Error: 'Missing email' });
      return;
    }

    if (!password) {
      res.status(400).json({ Error: 'Missing Password' });
      return;
    }

    const user = await (await dbClient.userCollection()).findOne({ email });

    if (user) {
      res.status(400).json({ Error: 'Already Exists' });
      return;
    }

    const hashedPwd = sha1(password);
    const newUser = { email, password: hashedPwd };
    const insertedUser = await (await dbClient.userCollection()).insertOne(newUser);
    const userId = insertedUser.insertedId.toString();
    res.status(200).json({ email, id: userId });
  }

  static async getMe(req, res) {
    const { user } = req;
    if (!user.email) {
      res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
