import { PrismaClient } from '@prisma/client';

// Esta es la configuración del Singleton.
// Previene la creación de múltiples instancias de PrismaClient en desarrollo.
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;