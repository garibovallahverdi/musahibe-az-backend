import app from './app';
import { PORT } from './config/dotenv';

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 