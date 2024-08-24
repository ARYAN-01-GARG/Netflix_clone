const { PrismaClient } = require('@prisma/client');

// Instantiate PrismaClient

const prisma = new PrismaClient();

module.exports = { prisma };