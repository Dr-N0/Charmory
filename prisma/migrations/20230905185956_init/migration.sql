-- CreateEnum
CREATE TYPE "GenMethod" AS ENUM ('MANUAL', 'ARRAY', 'POINT');

-- CreateEnum
CREATE TYPE "HowProficent" AS ENUM ('NONE', 'PROFICENT', 'EXTRA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "speed" INTEGER NOT NULL DEFAULT 30,
    "armorClass" INTEGER NOT NULL DEFAULT 10,
    "initiative" INTEGER NOT NULL DEFAULT 0,
    "inspiration" BOOLEAN NOT NULL DEFAULT false,
    "healthMax" INTEGER NOT NULL,
    "healthCurrent" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abilities" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "genMethod" "GenMethod" NOT NULL DEFAULT 'MANUAL',
    "strength" INTEGER NOT NULL,
    "dexterity" INTEGER NOT NULL,
    "constitution" INTEGER NOT NULL,
    "intelligence" INTEGER NOT NULL,
    "wisdom" INTEGER NOT NULL,
    "charisma" INTEGER NOT NULL,

    CONSTRAINT "Abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Description" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "background" TEXT,

    CONSTRAINT "Description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proficencies" (
    "id" SERIAL NOT NULL,
    "characterId" TEXT NOT NULL,
    "strength" "HowProficent" NOT NULL DEFAULT 'NONE',
    "dexterity" "HowProficent" NOT NULL DEFAULT 'NONE',
    "constitution" "HowProficent" NOT NULL DEFAULT 'NONE',
    "intelligence" "HowProficent" NOT NULL DEFAULT 'NONE',
    "wisdom" "HowProficent" NOT NULL DEFAULT 'NONE',
    "charisma" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingStrength" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingDexterity" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingConstitution" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingIntelligence" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingWisdom" "HowProficent" NOT NULL DEFAULT 'NONE',
    "savingCharisma" "HowProficent" NOT NULL DEFAULT 'NONE',
    "acrobatics" "HowProficent" NOT NULL DEFAULT 'NONE',
    "animalHandling" "HowProficent" NOT NULL DEFAULT 'NONE',
    "arcana" "HowProficent" NOT NULL DEFAULT 'NONE',
    "athletics" "HowProficent" NOT NULL DEFAULT 'NONE',
    "deception" "HowProficent" NOT NULL DEFAULT 'NONE',
    "history" "HowProficent" NOT NULL DEFAULT 'NONE',
    "insight" "HowProficent" NOT NULL DEFAULT 'NONE',
    "intimidation" "HowProficent" NOT NULL DEFAULT 'NONE',
    "investigation" "HowProficent" NOT NULL DEFAULT 'NONE',
    "medicine" "HowProficent" NOT NULL DEFAULT 'NONE',
    "nature" "HowProficent" NOT NULL DEFAULT 'NONE',
    "perception" "HowProficent" NOT NULL DEFAULT 'NONE',
    "performance" "HowProficent" NOT NULL DEFAULT 'NONE',
    "persuasion" "HowProficent" NOT NULL DEFAULT 'NONE',
    "religion" "HowProficent" NOT NULL DEFAULT 'NONE',
    "sleightOfHand" "HowProficent" NOT NULL DEFAULT 'NONE',
    "stealth" "HowProficent" NOT NULL DEFAULT 'NONE',
    "survival" "HowProficent" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "Proficencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Race_characterId_key" ON "Race"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_characterId_key" ON "Class"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Abilities_characterId_key" ON "Abilities"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Description_characterId_key" ON "Description"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_characterId_key" ON "Equipment"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Proficencies_characterId_key" ON "Proficencies"("characterId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Race" ADD CONSTRAINT "Race_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abilities" ADD CONSTRAINT "Abilities_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Description" ADD CONSTRAINT "Description_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proficencies" ADD CONSTRAINT "Proficencies_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
