-- CreateEnum
CREATE TYPE "status" AS ENUM ('active', 'verified', 'deleted');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('client', 'developer', 'bot', 'moderator', 'admin', 'superuser');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320),
    "password" VARCHAR(1024) NOT NULL,
    "role" "role" NOT NULL DEFAULT 'client',
    "status" "status" NOT NULL DEFAULT 'active',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "family" TEXT,
    "brand" TEXT,
    "model" TEXT,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "os" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "family" TEXT,
    "major" TEXT,
    "minor" TEXT,
    "patch" TEXT,
    "patchMinor" TEXT,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "os_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "browser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "family" TEXT,
    "major" TEXT,
    "minor" TEXT,
    "patch" TEXT,
    "osId" INTEGER NOT NULL,

    CONSTRAINT "browser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "browserId" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("userId","browserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_browserId_key" ON "client"("browserId");

-- AddForeignKey
ALTER TABLE "os" ADD CONSTRAINT "os_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "browser" ADD CONSTRAINT "browser_osId_fkey" FOREIGN KEY ("osId") REFERENCES "os"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_browserId_fkey" FOREIGN KEY ("browserId") REFERENCES "browser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
