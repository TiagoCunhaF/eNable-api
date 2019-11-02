import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: `Agendamento Cancelado - ${format(
        parseISO(appointment.date),
        'dd/MM/yyyy H:mm '
      )} - ${appointment.user.name}`,
      template: 'cancellation',
      context: {
        providerName: appointment.provider.name,
        userName: appointment.user.name,
        appointmentDate: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às 'H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
