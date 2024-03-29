import express, {Response,Request,NextFunction} from 'express'
import router from './routes';
import cors from 'cors'
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req:Request,res:Response, next: NextFunction)=>{
    next();
})


app.use('/',router);

app.listen(8000, ()=> console.log("Server started at http://localhost:8000/"))