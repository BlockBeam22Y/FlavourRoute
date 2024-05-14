import 'reflect-metadata';
import app from './server';
import { AppDataSource } from './config/dataSource';
import { PORT } from './config/envs';

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  })
  .catch(err => {
    console.error(err);
  });