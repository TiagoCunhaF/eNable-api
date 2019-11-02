import * as Yup from 'yup';
import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class ScheduleController {
  async index(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.query))) {
      res.status(400).json({ error: 'Validation fails' });
    }

    const checkUserProvider = await User.findByPk(req.userId);
    if (!checkUserProvider.provider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { page = 1, date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.send(appointments);
  }
}

export default new ScheduleController();
