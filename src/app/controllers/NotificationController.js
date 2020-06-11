import Notification from '../models/Notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      user_id: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notification);
  }
}

export default new NotificationController();
