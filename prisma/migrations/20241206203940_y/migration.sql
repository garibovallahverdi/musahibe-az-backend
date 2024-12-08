-- CreateTable
CREATE TABLE "Ghost" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Ghost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "ghostId" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interaction_ghostId_newsId_key" ON "Interaction"("ghostId", "newsId");

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_ghostId_fkey" FOREIGN KEY ("ghostId") REFERENCES "Ghost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
