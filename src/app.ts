import express, {Request, Response} from 'express';
import {resolve} from 'path';

const PORT = 5000;
const app = express();

app.use(express.static(resolve(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html').sendFile(resolve('./public/index.html'));
});

app.listen(PORT, function () {
    console.log(`App is running at http://localhost:${PORT}`);
});
