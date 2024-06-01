-- -------------------------------------------------------------
-- TablePlus 6.0.6(558)
--
-- https://tableplus.com/
--
-- Database: db_fiverr
-- Generation Time: 2024-06-01 07:53:08.0830
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL,
  `content` varchar(255) NOT NULL,
  `stars` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`job_id`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DetailJobTypeLinks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail_type_link_name` varchar(150) NOT NULL,
  `job_detail_type_id` int DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `job_detail_type_id` (`job_detail_type_id`),
  CONSTRAINT `DetailJobTypeLinks_ibfk_1` FOREIGN KEY (`job_detail_type_id`) REFERENCES `DetailJobTypes` (`job_detail_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `DetailJobTypes` (
  `job_detail_type_id` int NOT NULL AUTO_INCREMENT,
  `detail_type_name` varchar(250) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `job_type_id` int DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`job_detail_type_id`),
  KEY `job_type_id` (`job_type_id`),
  CONSTRAINT `DetailJobTypes_ibfk_1` FOREIGN KEY (`job_type_id`) REFERENCES `JobTypes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `HireJobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `hire_date` timestamp NULL DEFAULT NULL,
  `is_done` tinyint(1) DEFAULT '0',
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `HireJobs_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`job_id`),
  CONSTRAINT `HireJobs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_name` varchar(250) NOT NULL,
  `rate` int DEFAULT '0',
  `price` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `job_desc` varchar(255) NOT NULL,
  `job_short_desc` varchar(100) NOT NULL,
  `star` int DEFAULT '0',
  `job_creator` int DEFAULT NULL,
  `job_detail_type_id` int DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `job_detail_type_link_id` int DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `job_creator` (`job_creator`),
  KEY `job_detail_type_id` (`job_detail_type_id`),
  KEY `job_detail_type_link_id` (`job_detail_type_link_id`),
  CONSTRAINT `Jobs_ibfk_1` FOREIGN KEY (`job_creator`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `Jobs_ibfk_2` FOREIGN KEY (`job_detail_type_id`) REFERENCES `DetailJobTypes` (`job_detail_type_id`),
  CONSTRAINT `Jobs_ibfk_3` FOREIGN KEY (`job_detail_type_link_id`) REFERENCES `DetailJobTypeLinks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_type_name` varchar(250) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `pass_word` varchar(255) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `skill` varchar(100) DEFAULT NULL,
  `certification` varchar(250) DEFAULT NULL,
  `refresh_token` varchar(250) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Comments` (`id`, `job_id`, `user_id`, `createdAt`, `content`, `stars`) VALUES
(1, 2, 1, '2024-05-30 08:57:00', 'Cool course', 0),
(2, 2, 1, '2024-05-30 08:59:00', 'I believe in you', 0);

INSERT INTO `DetailJobTypeLinks` (`id`, `detail_type_link_name`, `job_detail_type_id`, `isDeleted`) VALUES
(4, 'business-website', 1, 0),
(5, 'build-landing-page', 1, 0),
(6, 'e-commerce-development', 1, 0),
(7, 'cross-platform-development', 2, 0),
(8, 'android-app-development', 2, 0),
(9, 'ios-app-development', 2, 0),
(10, 'web-to-app-development', 2, 0),
(11, 'mobile-app-maintainance', 2, 0);

INSERT INTO `DetailJobTypes` (`job_detail_type_id`, `detail_type_name`, `image`, `job_type_id`, `isDeleted`) VALUES
(1, 'website-development', 'http://res.cloudinary.com/drfjok8d7/image/upload/v1716818164/clone_fiverr/1716818163264.jpeg.jpg', 3, 0),
(2, 'mobile-app-development', NULL, 4, 0);

INSERT INTO `HireJobs` (`id`, `job_id`, `user_id`, `hire_date`, `is_done`, `isDeleted`) VALUES
(1, 1, 1, '2024-05-31 14:52:00', 1, 0),
(2, 1, 1, '2024-05-31 14:54:13', 0, 1);

INSERT INTO `Jobs` (`job_id`, `job_name`, `rate`, `price`, `image`, `job_desc`, `job_short_desc`, `star`, `job_creator`, `job_detail_type_id`, `isDeleted`, `job_detail_type_link_id`) VALUES
(1, 'web-developer', 0, 200000, NULL, 'I will design and develop your mern stack applications', 'I will design and develop your mern stack applications', 0, 1, 2, 1, 10),
(2, 'test-job-2', 5, 1400000, NULL, 'I will design and develop your mern stack applications', 'I will design and develop your mern stack applications', 0, 1, 2, 0, 6);

INSERT INTO `JobTypes` (`id`, `job_type_name`, `isDeleted`) VALUES
(2, 'cong-nghe-tin-hoc', 1),
(3, 'quan-tri-kinh-doanh', 0),
(4, 'programming-tech', 0);

INSERT INTO `Users` (`user_id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `refresh_token`, `isDeleted`, `avatar`) VALUES
(1, 'lien-chi-khang', 'chikhang11a18@gmail.com', '$2b$07$iY/5ah/Myt/qxtE4bRmOwO5/6eue1V/a5BqUlOTWKeU2M6OHsfSlq', NULL, NULL, b'1', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOm51bGwsImlhdCI6MTcxNzE2OTEwNywiZXhwIjoxNzE3MTcwMzA3fQ.TOJ1ns0pty_50dxltgwxD2Gn6_Z28iAU9mlTioQKqRY', 0, NULL),
(2, NULL, 'chikhang12a18@gmail.com', '$2b$07$Q78h3o2OzVud9zxa7.2wtOYwilGsaQKLBW3v1fgrCEgMcsaTML4Zq', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(3, NULL, 'chikhang13a18@gmail.com', '$2b$07$TYGnU1Jy0XPpUeYvMHtchuOMdnnO8BQLN3IwEyCGo.0OteC4ympna', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL),
(4, 'melody-sky', 'chikhang14a18@gmail.com', '$2b$07$nBRv0HX6JZ2KaYUhJjAEoOaSk9K3h.S8C/Z3SS58yZgB5c9dXwtvu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL),
(5, 'melanie-dunne', 'chikhang15a18@gmail.com', '$2b$07$/2lj/4P4knRkah2RSLIA..upXBb9OmSBi5XtA3k6gghRQwQ6B25oW', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL),
(6, 'melanie-sky', 'chikhang16a18@gmail.com', '$2b$07$Q7PnfbB6Wr35.f8SJYJdze24nn5C3ltCZZT9d3l2oMNLDcaMlU9ka', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;