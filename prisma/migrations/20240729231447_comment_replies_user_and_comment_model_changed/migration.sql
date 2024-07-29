/*
  Warnings:

  - Added the required column `content` to the `CommentReplies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CommentReplies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentReplies" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CommentReplies" ADD CONSTRAINT "CommentReplies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
