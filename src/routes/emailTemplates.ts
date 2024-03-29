import { Router } from "express";
const templatesRouter = Router();
import {getEmailTemplate, getEmailTemplates, updateEmailTemplate} from "../controllers/emailTemplateController"


templatesRouter.get('/',getEmailTemplates)
templatesRouter.get('/:slug',getEmailTemplate)
templatesRouter.put('/:slug',updateEmailTemplate)



export default templatesRouter;