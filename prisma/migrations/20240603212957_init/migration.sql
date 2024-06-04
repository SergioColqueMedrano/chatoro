-- CreateTable
CREATE TABLE "Contador" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "color" VARCHAR(7) NOT NULL,
    "valor" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Contador_pkey" PRIMARY KEY ("id")
);
