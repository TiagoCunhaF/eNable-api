import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');
    user.confirmPassword = user.password;
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should compare correct user password', async () => {
    const user = await factory.create('User', {
      password: '12345678',
      confirmPassword: '12345678',
    });
    const compareHash = await user.checkPassword('12345678');

    expect(compareHash).toBe(true);
  });

  it('should not be able to list users without session token', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(401);
  });
});
