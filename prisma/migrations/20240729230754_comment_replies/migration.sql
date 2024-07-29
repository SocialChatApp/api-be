-- CreateTable
CREATE TABLE "CommentReplies" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER,

    CONSTRAINT "CommentReplies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentReplies" ADD CONSTRAINT "CommentReplies_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
