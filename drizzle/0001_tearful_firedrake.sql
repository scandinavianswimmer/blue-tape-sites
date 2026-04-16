CREATE TABLE `auditLeads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(160) NOT NULL,
	`companyName` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40),
	`websiteUrl` varchar(2048),
	`primaryTrade` varchar(120) NOT NULL,
	`serviceArea` varchar(180) NOT NULL,
	`projectDetails` text NOT NULL,
	`sourcePath` varchar(512),
	`notifiedOwner` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLeads_id` PRIMARY KEY(`id`)
);
