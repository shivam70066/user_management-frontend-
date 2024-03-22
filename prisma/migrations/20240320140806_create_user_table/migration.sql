-- CreateTable
CREATE TABLE "um_users" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_gender" TEXT NOT NULL,
    "user_number" INTEGER NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_deleted_at" TIMESTAMP(3),

    CONSTRAINT "um_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "um_users_user_email_key" ON "um_users"("user_email");

-- CreateIndex
CREATE INDEX "um_users_user_id_idx" ON "um_users"("user_id");
