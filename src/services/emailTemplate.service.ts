import prisma from "../../DB/db.config";

export const getAllTemplates = async (req:Request,resp:Response)=>{
    
    const templates = await prisma.um_email_templates.findMany();

    if(templates){
        // resp.json({status:200,data:templates})
    }
}


import { Prisma } from '@prisma/client';

export const isTemplateExist = async (slug: string): Promise<boolean> => {
    try {
        const isExist = await prisma.um_email_templates.findUnique({
            where: {
                et_slug: slug
            }
        });
        return !!isExist; // Convert to boolean
    } catch (error) {
        console.error("Error checking template existence:", error);
        throw new Error("Error checking template existence");
    }
}

export const updateTemplate = async (body: string, subject: string, slug: string): Promise<boolean> => {
    try {
        const isUpdated = await prisma.um_email_templates.update({
            where: {
                et_slug: slug
            },
            data: {
                et_subject: subject,
                et_data: body,
                et_updated_at: new Date()
            }
        });
        return !!isUpdated; // Convert to boolean
    } catch (error) {
        console.error("Error updating template:", error);
        throw new Error("Error updating template");
    }
}


