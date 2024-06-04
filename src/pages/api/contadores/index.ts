import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      // Obtener todos los contadores
      try {
        const contadores = await prisma.contador.findMany();
        res.status(200).json(contadores);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: 'Error al obtener los contadores', details: error.message });
        } else {
          res.status(500).json({ error: 'Error desconocido al obtener los contadores' });
        }
      }
      break;
    case 'POST':
      // Crear un nuevo contador
      try {
        const { nombre, color } = req.body;
        const nuevoContador = await prisma.contador.create({
          data: {
            nombre,
            color,
          },
        });
        res.status(201).json(nuevoContador);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: 'Error al crear el contador', details: error.message });
        } else {
          res.status(500).json({ error: 'Error desconocido al crear el contador' });
        }
      }
      break;
    case 'PUT':
      // Actualizar el valor de un contador
      try {
        const { valor } = req.body;
        const contadorActualizado = await prisma.contador.update({
          where: { id: Number(id) },
          data: { valor },
        });
        res.status(200).json(contadorActualizado);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: 'Error al actualizar el contador', details: error.message });
        } else {
          res.status(500).json({ error: 'Error desconocido al actualizar el contador' });
        }
      }
      break;
    case 'DELETE':
      // Eliminar un contador
      try {
        await prisma.contador.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: 'Error al eliminar el contador', details: error.message });
        } else {
          res.status(500).json({ error: 'Error desconocido al eliminar el contador' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
