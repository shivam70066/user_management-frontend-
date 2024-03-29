import { Response, Request } from 'express';
import prisma from "../../DB/db.config";
import { isTemplateExist, updateTemplate } from '../services/emailTemplate.service';

export const getEmailTemplates = async (req:Request, resp:Response)=>{
    
    try {
        const templates = await prisma.um_email_templates.findMany();
        const count = await prisma.um_email_templates.count();
        
        if(templates.length > 0) {
            resp.status(200).json({ data: templates, count: count});
        } else {
            resp.status(400).json({ msg:"No data Found"});
        }
    } catch (error) {
        resp.status(500).json({ msg: "Internal Server Error"});
    }

}

export const getEmailTemplate = async (req:Request, resp:Response)=>{
    
    try {
        const templateSlug: string = req.params.slug;
        const templateData = await prisma.um_email_templates.findUnique({
            where: {
                et_slug: templateSlug
            }
        });
        if(templateData){
            resp.status(200).json({data:templateData})
        }
        else{
            resp.status(400).json({msg:"No data Found",data:null})
        }


    } catch (error) {
        resp.status(500).json({ msg: "Internal Server Error"});
    }

}

export const updateEmailTemplate = async (req:Request, resp:Response)=>{
    
    try {
        const templateSlug: string = req.params.slug;
        const isExist = await isTemplateExist(templateSlug);

        if(!isExist){
            resp.status(400).json({ msg:"No data Found"});
        }
        const { subject, body } = req.body;
        console.log(subject, body)

        if (typeof subject === 'undefined' && typeof body === 'undefined') {
            resp.status(400).json({msg:"Subject or body is undefined "})
        }

        else{
            const updated = await updateTemplate(body,subject,templateSlug);
            
            if(updated){
                resp.status(200).json({msg:"Successfully Updated"})
            }
            else{
                resp.status(400).json({msg:"Error in updating"})       
            }
        }


        

    } catch (error) {
        resp.status(500).json({ msg: "Internal Server Error"});
    }

}