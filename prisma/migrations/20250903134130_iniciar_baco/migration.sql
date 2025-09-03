-- CreateEnum
CREATE TYPE "public"."Especialidade" AS ENUM ('CARDIOLOGIA', 'DERMATOLOGIA', 'GINECOLOGIA', 'ORTOPEDIA', 'PEDIATRIA');

-- CreateTable
CREATE TABLE "public"."Medico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" "public"."Especialidade" NOT NULL,

    CONSTRAINT "Medico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Paciente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dataNascimento" DATE NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Consulta" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT,
    "medicoId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_email_key" ON "public"."Paciente"("email");

-- CreateIndex
CREATE INDEX "Consulta_medicoId_data_idx" ON "public"."Consulta"("medicoId", "data");

-- CreateIndex
CREATE UNIQUE INDEX "Consulta_medicoId_data_key" ON "public"."Consulta"("medicoId", "data");

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "public"."Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
