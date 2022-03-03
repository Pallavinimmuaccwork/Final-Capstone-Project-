const { TestWatcher } = require('jest')
const request = require('supertest')

const app = require('../app.js')

describe("POST /register", ()=>{
    test("OK, Registration is successfull", async ()=>{
        const res = await request(app)
                          .post('/register')
                          .send({
                            "name":"kavya",
                            "email":"kavya@gmail.com",
                            "password":"rstdyuio",
                            "role":"admin",
                            "test":true
                          })
                    console.log(res);
                    expect(res.statusCode).toEqual(200)
    },10000)
})

describe("POST/login",()=>{
   test("OK, Login is Succefull", async ()=>{
       const res = await request(app)
                        .post('/login')
                        .send({
                            "email":"pallaviradder@gmail.com",
                            "password":"234567"
                        })
                   console.log(res);
                   expect(res.statusCode).toEqual(200)

   },10000)
})

 describe("GET /Samples",()=>{
    var token= null;
    beforeEach((done)=>{
       request(app)
         .post('/login')
         .send({
            "email":"pallaviradder@gmail.com",
                "password":"234567"
          })
         .end((err,res)=>{
             token = res._body.token
              console.log(res._body.data);
              done()
          })
    })

    test("OK, Products getting done", async ()=>{
        const res = await request(app)
                          .get('/samples')
                           .set("Authorization" , 'Bearer ' + token)
                     console.log(res);
                     expect(res.statusCode)
     },20000)
 })