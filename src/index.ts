import express, {Response,Request} from 'express'
import router from './routes';
import cors from 'cors'
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/',router);

app.listen(8000, ()=> console.log("Server started at http://localhost:8000/"))