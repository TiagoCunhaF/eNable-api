import Project from '../models/Project';
import User from '../models/User';
import File from '../models/File';
import ProjectTransaction from '../models/ProjectTransaction';
import TransactionType from '../models/TransactionType';

class AverageCustController {
  async index(req, res) {
    return res.json({ averageCust: 130 });
  }
}

export default new AverageCustController();
