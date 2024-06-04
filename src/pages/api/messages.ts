// pages/api/messages.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
      case 'GET':
        const { userId } = req.query;
        try {
          const messages = await prisma.message.findMany({
            where: {
              OR: [
                { senderId: Number(userId) },
                { receiverId: Number(userId) },
              ],
            },
            include: {
              sender: true,
              receiver: true,
            },
          });
          res.status(200).json(messages);
        } catch (error) {
          res.status(500).json({ error: 'Error fetching messages' });
        }
        break;
  
      case 'POST':
        try {
          const { senderId, receiverUsername, subject, content, resources } = req.body;
  
          const receiver = await prisma.user.findUnique({
            where: { username: receiverUsername },
          });
  
          if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
          }
  
          const message = await prisma.message.create({
            data: {
              senderId,
              receiverId: receiver.id,
              subject,
              content,
              resources,
            },
            include: {
                sender: true,
                receiver: true,
              },
          });
  
          res.status(201).json(message);
        } catch (error) {
          res.status(500).json({ error: 'Error sending message' });
        }
        break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
}
