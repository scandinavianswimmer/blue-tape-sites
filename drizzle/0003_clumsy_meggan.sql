CREATE TABLE `unsubscribeRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`senderEmail` varchar(320) NOT NULL,
	`reason` text,
	`sourcePath` varchar(512),
	`sourceOrigin` varchar(255),
	`status` enum('pending','processed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `unsubscribeRequests_id` PRIMARY KEY(`id`)
);
