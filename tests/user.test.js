const request = require('supertest');
const {userRouter} = require('../routes/user');


test('calling GET returns 200', done => {
    request(userRouter)
      .get('/mo')
      .then(res =>{
          expect(res.status).toBe(200);
          done();
      })
})