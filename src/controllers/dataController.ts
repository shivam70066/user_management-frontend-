import { Response, Request } from 'express';
import prisma from "../../DB/db.config";
import { deleteTheUser, updateTheUser } from "../services/users.service"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pageIndex = parseInt(req.query.pageIndex as string) || 0;
    const pagePerItem = parseInt(req.query.pagePerItem as string) || 10;
    const searchTerm = req.query.searchTerm as string || '';
    const sortBy = req.query.sortBy as string || 'user_created_at';
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' || 'asc';

    const start = pageIndex * pagePerItem;


    const users = await prisma.um_users.findMany({
      where: {
        user_deleted_at: null,
        OR: [
          { user_name: { contains: searchTerm, mode: 'insensitive' } },
          { user_email: { contains: searchTerm, mode: 'insensitive' } },
          { user_number: { contains: searchTerm, mode: 'insensitive' } },
          { user_gender: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: start,
      take: pagePerItem,
    });

    const totalUsers = await prisma.um_users.count({
      where: {
        user_deleted_at: null,
        OR: [
          { user_name: { contains: searchTerm, mode: 'insensitive' } },
          { user_email: { contains: searchTerm, mode: 'insensitive' } },
          { user_number: { contains: searchTerm, mode: 'insensitive' } },
          { user_gender: { contains: searchTerm, mode: 'insensitive' } },
        ],
      }
    });

    res.json({
      status: 200,
      data: users,
      count: totalUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {

    const userId: number = parseInt(req.params.id);

    const isDeleted = await deleteTheUser(userId);
    if (isDeleted) {
      res.json({
        status: 200, msg: "Deleted"
      });
    }
    else res.json({ status: 404, msg: "User Not found" })

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const users = await prisma.um_users.findFirst({
      where: {
        user_id: userId
      }
    });
    if (users) {
      res.json({
        status: 200, data: users
      });
    }
    else res.json({
      status: 400, msg: "User not found"
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {

    const userId: number = parseInt(req.params.id);
    const { name, email, number, gender } = req.body;
    console.log(name, email, number, gender);

    console.log(email + userId)

    const emailFound = await prisma.um_users.findFirst({
      where: {
        user_email: email,
        NOT: {
          user_id: userId
        }
      }
    });
    if (emailFound) return res.json({ status: 400, msg: "Email already registered" })


    const isUpdated = await updateTheUser(userId, name, email, number, gender);
    if (isUpdated) {
      res.json({
        status: 200, msg: "Updated successfully"
      });
    }
    else
      res.json({ status: 404, msg: "User Not found" })

  } catch (error) {
    console.error('Error fetching users:', error);
  }
};