import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    if (provider_id === user_id) {
      throw new Error('You can only create appointments with other provider');
    }

    const checkisProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkisProvider) {
      throw new Error('You can only create appointments with providers');
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      throw new Error('Past date as not permited');
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    // Notify appointment provider
    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às 'H:mm'h'",
      { locale: pt }
    );
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    await Cache.invalidatePrefix(`user:${user_id}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
