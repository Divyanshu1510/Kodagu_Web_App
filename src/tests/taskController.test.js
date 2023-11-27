import { use, expect as _expect, request } from 'chai';
import chaiHttp from 'chai-http';
import app, { close } from '../app';
import { deleteMany, insertMany } from '../models/task';

use(chaiHttp);
const expect = _expect;

describe('Task Controller', () => {
  beforeEach(async () => {
    await deleteMany();
  });

  describe('GET /tasks', () => {
    it('should get all tasks', async () => {
      await insertMany([
        { title: 'Task 1', description: 'Description 1' },
        { title: 'Task 2', description: 'Description 2' },
      ]);

      const res = await request(app).get('/tasks');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });
  });


  after(() => {
    close();
  });
});
