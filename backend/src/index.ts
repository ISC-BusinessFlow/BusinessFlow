import app from './app';
import { accessOrigin, accessPort } from './corsOptions';

const PORT = accessPort();

app.listen(PORT, () => {
  console.log(`${accessOrigin()}...`);
});
