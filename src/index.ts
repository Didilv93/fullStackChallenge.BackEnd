import './shared/model/model';

import app from './app';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'local') dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, async (err: any) => {
  if (err) return console.log(err);
  return console.log(`Servidor executando na porta ${PORT}`);
});
