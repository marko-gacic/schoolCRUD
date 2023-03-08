-- CreateTable
CREATE TABLE `city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postalCode` INTEGER NOT NULL,
    `cityName` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `CityName_UNIQUE`(`cityName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `title` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(55) NOT NULL,

    UNIQUE INDEX `title_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `RoleName_UNIQUE`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(30) NOT NULL,
    `lastName` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(50) NULL,
    `postalCode` INTEGER NULL,
    `phone` VARCHAR(191) NULL,
    `reelectionDate` DATETIME(3) NOT NULL,
    `titleId` INTEGER NULL,
    `roleId` INTEGER NULL,
    `cityId` INTEGER NULL,
    `subjectId` INTEGER NULL,
    `examId` INTEGER NULL,

    UNIQUE INDEX `idprofessor_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `professor_cityId_fkey`(`cityId`),
    INDEX `professor_examId_fkey`(`examId`),
    INDEX `professor_roleId_fkey`(`roleId`),
    INDEX `professor_titleId_fkey`(`titleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(255) NULL,
    `numberOfEsp` INTEGER NOT NULL,
    `yearOfStudy` INTEGER NOT NULL,
    `semester` VARCHAR(10) NOT NULL,
    `examId` INTEGER NULL,

    UNIQUE INDEX `subject_id_key`(`id`),
    INDEX `subject_examId_fkey`(`examId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examregistration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examId` INTEGER NULL,
    `studentid` INTEGER NULL,

    UNIQUE INDEX `examregistration_id_key`(`id`),
    INDEX `examregistration_examId_fkey`(`examId`),
    INDEX `examregistration_studentid_fkey`(`studentid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `examperiodId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `professorId` INTEGER NOT NULL,

    UNIQUE INDEX `exam_id_key`(`id`),
    INDEX `exam_examperiodId_fkey`(`examperiodId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examperiod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `examPeriod_id_key`(`id`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    UNIQUE INDEX `end_UNIQUE`(`end`),
    UNIQUE INDEX `start_UNIQUE`(`start`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,

    INDEX `student_subject_studentId_fkey`(`studentId`),
    INDEX `student_subject_subjectId_fkey`(`subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `indexYear` INTEGER NOT NULL,
    `firstName` VARCHAR(30) NOT NULL,
    `lastName` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(50) NULL,
    `postalCode` INTEGER NOT NULL,
    `currentYearOfStudy` INTEGER NOT NULL,
    `roleId` INTEGER NULL,
    `cityId` INTEGER NULL,
    `examId` INTEGER NULL,
    `examperiodId` INTEGER NULL,

    UNIQUE INDEX `student_id_key`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `student_cityId_fkey`(`cityId`),
    INDEX `student_examId_fkey`(`examId`),
    INDEX `student_roleId_fkey`(`roleId`),
    INDEX `student_examperiodId_fkey`(`examperiodId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(255) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `username` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `iduser_UNIQUE`(`id`),
    UNIQUE INDEX `user_UNIQUE`(`username`),
    INDEX `user_roleId_fkey`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_professortosubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_professortosubject_AB_unique`(`A`, `B`),
    INDEX `_professortosubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_studenttosubject` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_studenttosubject_AB_unique`(`A`, `B`),
    INDEX `_studenttosubject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `professor` ADD CONSTRAINT `professor_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor` ADD CONSTRAINT `professor_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor` ADD CONSTRAINT `professor_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `professor` ADD CONSTRAINT `professor_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `subject_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examregistration` ADD CONSTRAINT `examregistration_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examregistration` ADD CONSTRAINT `examregistration_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exam` ADD CONSTRAINT `exam_examperiodId_fkey` FOREIGN KEY (`examperiodId`) REFERENCES `examperiod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_subject` ADD CONSTRAINT `student_subject_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_subject` ADD CONSTRAINT `student_subject_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `city`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_examId_fkey` FOREIGN KEY (`examId`) REFERENCES `exam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_examperiodId_fkey` FOREIGN KEY (`examperiodId`) REFERENCES `examperiod`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student` ADD CONSTRAINT `student_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_professortosubject` ADD CONSTRAINT `_professortosubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_professortosubject` ADD CONSTRAINT `_professortosubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_studenttosubject` ADD CONSTRAINT `_studenttosubject_A_fkey` FOREIGN KEY (`A`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_studenttosubject` ADD CONSTRAINT `_studenttosubject_B_fkey` FOREIGN KEY (`B`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
