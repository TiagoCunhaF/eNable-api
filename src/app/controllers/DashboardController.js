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
          include: [
            {
              model: TransactionType,
              as: 'transactionType',
              attributes: ['name', 'debit_credit'],
            },
          ],
        },
      ],
    });

    // projects.forEach(function(project) {
    //  project.revenue = 30;
    //  project.expenses = 20;
    //  project.balance = 10;
    //  // project.trasactions.map(transaction => {
    //  //  if (transaction.transactionType.debit_credit === 'Credit')
    //  //    project.revenue += transaction.value;
    //  //  else project.expenses += transaction.value;
    //  // });
    //  project.balance = project.revenue - project.expenses;
    // });

    const teste = projects.map(obj => ({
      project: obj,
      revenue: 0,
      expenses: 0,
      balance: 0,
    }));
    return res.json(teste);
  }
}

export default new DashboardController();
