import Project from '../models/Project';

class ProjectDetailController {
  async index(req, res) {
    const projects = await Project.findAll();
    return res.json(projects);
  }

  async show(req, res) {
    const projects = await Project.findByPk(req.params.id);
    return res.json(projects);
  }

  async store(req, res) {
    const { name, status, dateStart } = req.body;
    const projectExists = await Project.findOne({
      where: { name },
    });

    if (projectExists) {
      return res.status(400).json({ error: 'project already exists.' });
    }

    const project = await Project.create({
      name,
      status,
      dateStart,
      user_id: req.userId,
    });

    return res.json(project);
  }

  async update(req, res) {
    const { id, name, status } = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(400).json({ error: 'Project does not exists.' });
    }

    if (name !== project.name) {
      const projectExists = await Project.findOne({ where: { name } });
      if (projectExists) {
        return res.status(400).json({ error: 'project already exists.' });
      }
    }

    await project.update(req.body);

    return res.json({
      id,
      name,
      status,
    });
  }

  async delete(req, res) {
    await Project.destroy({ where: { id: req.body.id } });
    return res.json({ message: `Project ${req.body.name} deleted` });
  }
}

export default new ProjectDetailController();
