/*
  Warnings:

  - Added the required column `et_subject` to the `um_email_templates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "um_email_templates" ADD COLUMN     "et_subject" TEXT NOT NULL;
