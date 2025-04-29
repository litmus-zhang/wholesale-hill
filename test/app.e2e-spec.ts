import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';

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
    pactum.request.setBaseUrl('http://localhost:3300');
  });

  afterAll(async () => {
    await app.close();
  });

  // it('health check', () => {
  //   return pactum
  //     .spec()
  //     .get('/healtch')
  //     .expectStatus(200)
  //     .expectBodyContains('All system operational ');
  // });

  describe('Auth Module', () => {
    it('Signup', () => {
      pactum.spec().post("")
    });
    it.todo('Login');
  });
  describe('Department Module', () => {
    it.todo('Create A Department');
    it.todo('Create A Department with subDepartments');
  });
});
