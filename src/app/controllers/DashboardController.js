import Project from '../models/Project';
import User from '../models/User';
import File from '../models/File';
import ProjectTransaction from '../models/ProjectTransaction';
import TransactionType from '../models/TransactionType';

class DashboardController {
  async index(req, res) {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'url', 'path'],
            },
          ],
        },
        {
          model: ProjectTransaction,
          as: 'trasactions',
        },
      ],
    });

    return res.json(projects);
  }
}

export default new DashboardController();
