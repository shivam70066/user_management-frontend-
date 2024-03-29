import prisma from "../../DB/db.config";


export const deleteTheUser = async (id:number)=>{


    const user = await prisma.um_users.findFirst({
        where: {
          user_id: id,
          user_deleted_at: null

        }
      });
      if(!user){return false}

      const users = await prisma.um_users.update({
        where: {
            user_id: id
        },
        data: {
            user_deleted_at: new Date()
        }
      });
      return true;
}

export const updateTheUser = async (id:number,name:string,email:string,number:number,gender:string)=>{

  // error create
    // const userFound = await prisma.um_users.findFirst({
    //   where: {
    //     user_id: id
    //   }
    // });
    // if (userFound) {
    //   return false;
    // }
    

    const isUpdated = await prisma.um_users.update({
      where: {
          user_id: id
      },
      data: {
        user_name: name,
        user_email: email,
        user_number : String(number),
        user_gender: gender,
          user_updated_at: new Date()
      }
    });
    if(isUpdated)   return true;
    
    return false;

}