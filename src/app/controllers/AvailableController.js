import AvailableService from '../services/AvaillableService';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      res.status(400).json({ error: 'Invalid date' });
    }

    const parsedDate = Number(date);

    const available = await AvailableService.run({
      date: parsedDate,
      provider_id: req.params.providerId,
    });
    return res.json(available);
  }
}
export default new AvailableController();
