CREATE TABLE `blogCtaClicks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postSlug` varchar(255) NOT NULL,
	`postTitle` varchar(255) NOT NULL,
	`postCategory` varchar(120) NOT NULL,
	`postPublishDate` varchar(10) NOT NULL,
	`postKeyword` varchar(255) NOT NULL,
	`ctaLabel` varchar(160) NOT NULL,
	`ctaHref` varchar(512) NOT NULL,
	`ctaPlacement` enum('primary','secondary') NOT NULL,
	`sourcePath` varchar(512) NOT NULL,
	`destinationPath` varchar(512) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blogCtaClicks_id` PRIMARY KEY(`id`)
);
