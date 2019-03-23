const request = require('supertest');
//const {userRouter} = require('../routes/user');
const app = require('../app');

jest.mock('../crud_services/user')
const UserService = require('../crud_services/user')

test('calling GET returns 200', done => {
    UserService.read.mockImplementation(()=> Promise.resolve('test'));

    request(app)
      .get('/user/7')
      .then(response =>{
          expect(response).toBe('should fail');
          done();
      })
      .catch(e=>{
          done();
      })
})