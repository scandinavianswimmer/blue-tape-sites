CREATE TABLE `pageViews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(512) NOT NULL,
	`referrer` varchar(2048),
	`userAgent` varchar(512),
	`sessionId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pageViews_id` PRIMARY KEY(`id`)
);
