CREATE TABLE `auditSubmissionLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`name` varchar(160) NOT NULL,
	`company` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`serviceArea` varchar(180) NOT NULL,
	`status` enum('success','failure') NOT NULL,
	`resendMessageId` varchar(255),
	CONSTRAINT `auditSubmissionLogs_id` PRIMARY KEY(`id`)
);
