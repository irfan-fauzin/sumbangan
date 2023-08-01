-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CAMPAIGN_MANAGER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "fullname" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CAMPAIGN_MANAGER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "Title" TEXT,
    "Image" TEXT,
    "Description" TEXT,
    "Target" INTEGER NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT true,
    "Date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Date_end" TEXT,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donate" (
    "id_donate" INTEGER NOT NULL,
    "Amount" INTEGER,
    "Mesage" TEXT,
    "Name" TEXT,

    CONSTRAINT "Donate_pkey" PRIMARY KEY ("id_donate")
);

-- CreateTable
CREATE TABLE "_CampaignToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_Title_key" ON "Campaign"("Title");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToUser_AB_unique" ON "_CampaignToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToUser_B_index" ON "_CampaignToUser"("B");

-- AddForeignKey
ALTER TABLE "Donate" ADD CONSTRAINT "Donate_id_donate_fkey" FOREIGN KEY ("id_donate") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToUser" ADD CONSTRAINT "_CampaignToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToUser" ADD CONSTRAINT "_CampaignToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
