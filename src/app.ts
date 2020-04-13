import express, { Request, Response } from 'express';
import { resolve } from 'path';

const PORT = 5000;
const app = express();

app.use(express.static(resolve(__dirname, 'public')));

app.get('/', (req: any, res: Response) => {
    res.set('Content-Type', 'text/html').sendFile(resolve('./public/index.html'));
});

var foo = someFunction();
app.listen(PORT, function () {
    console.log(`App is running at http://localhost:${PORT}`);
});
