import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { faker } from '@faker-js/faker';


describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3300);
    const baseUrl = 'http://localhost:3300'
    pactum.request.setBaseUrl(baseUrl);
  });

  afterAll(async () => {
    await app.close();
  });

  it('health check', () => {
    const query = `query {
  healthcheck
}`
    request("http://localhost:3300")
    .post('?')
    .send(query)
    .expect("All system operational")
  });


  describe('Auth Module', () => {
    it('Signup', () => {
      pactum.spec().post('/auth/signup')
        .withGraphQLQuery(`
          mutation {
              signup(user_input: {
                username: ${faker.person.firstName},
                password: ${faker.internet.password}
              }){
                status
                message
              }
            }
      `)
        .inspect()
        .expectStatus(200)
        .expectJsonLike({
          "data": {
            "signup": {
              "status": 200,
              "message": "User created successfully"
            }
          }
        })
        ;
    });
    it('Login', () => {
      pactum.spec().post('/auth/login')
        .withGraphQLQuery(`
          mutation {
              signup(user_input: {
                username: ${faker.person.firstName},
                password: ${faker.internet.password}
              }){
                status
                message
              }
            }
      `)
        .inspect()
        .expectStatus(200)
        .expectJsonLike({
          "data": {
            "signup": {
              "status": 200,
              "message": "User created successfully",
              "token": /.+d/
            }
          }
        })
        ;
    });
  });
  describe('Department Module', () => {
    it('Create A Department', () => {
      pactum.spec().post('/departments/create')
        .withGraphQLQuery(`
        mutation {
          createDepartment(
            input: {name: "Engineering"}
          ) {
            id
            name
          }
        }
    `)
        .inspect()
        .expectStatus(201);

    });
    it('Create A Department with subDepartments', () => {
      pactum.spec().post('/departments/create')
        .withGraphQLQuery(`
       mutation {
        createDepartment(input: {
          name: "Finance",
          subDepartments: [
            { name: "Accounts" },
            { name: "Audit" }
          ]
        }) {
          id
          name
          subDepartments {
            id
            name
          }
        }
        }

    `)
        .inspect()
        .expectStatus(201);

    });
    it("Get All Departments", () => {
      pactum.spec().post('/departments/all')
        .withGraphQLQuery(`
        query {
          getDepartments{
            name
            id
            childDepartments{
              name
              id
            }
          }
        }
    `)
        .inspect()
        .expectStatus(201);
    })
    it("Update A Department", () => {
      pactum.spec().post('/departments/update')
        .withGraphQLQuery(`
        mutation {
          updateDepartment(id: 2, input: {
            name: "Human resource (HR)"
          }){
            status
            message
          }
          }
    `)
        .inspect()
        .expectStatus(201);

    })
    it("Delete A Department", () => {
      pactum.spec().post('/departments/update')
        .withGraphQLQuery(`
        mutation {
          updateDepartment(id: 2, input: {
            name: "Human resource (HR)"
          }){
            status
            message
          }
          }
    `)
        .inspect()
        .expectStatus(201);

    })
  });
});
