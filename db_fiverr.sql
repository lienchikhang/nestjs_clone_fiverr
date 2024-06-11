-- -------------------------------------------------------------
-- TablePlus 6.0.6(558)
--
-- https://tableplus.com/
--
-- Database: db_fiverr
-- Generation Time: 2024-06-11 16:05:33.0350
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
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `job_id` (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `Jobs` (`job_id`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `JobTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_type_name` varchar(250) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

INSERT INTO `Comments` (`id`, `job_id`, `user_id`, `createdAt`, `content`, `stars`, `isDeleted`) VALUES
(1, 2, 1, '2024-05-30 08:57:00', 'Cool course', 5, 0),
(2, 2, 1, '2024-05-30 08:59:00', 'he is too good actually ,you can blindly trust this kind person ,he is too good in programming and he is too kind', 5, 0),
(3, 1, 2, '2024-06-06 13:44:16', 'Very good freelancer', 4, 0),
(4, 2, 1, '2024-06-06 13:45:35', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 4, 1),
(5, 2, 4, '2024-05-30 08:59:00', 'Bad', 1, 0),
(6, 2, 5, '2024-05-30 08:59:00', 'Not bad at all', 3, 0),
(7, 2, 6, '2024-05-30 08:59:00', 'goood', 4, 0),
(8, 3, 4, '2024-06-11 08:37:50', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 4, 0),
(9, 4, 4, '2024-06-11 08:37:57', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 4, 0),
(10, 6, 4, '2024-06-11 08:38:04', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 5, 0),
(11, 4, 4, '2024-06-11 08:38:07', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 5, 0),
(12, 4, 4, '2024-06-11 08:38:11', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 3, 0),
(13, 7, 4, '2024-06-11 08:38:14', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 3, 0),
(14, 2, 4, '2024-06-11 08:44:58', 'I run an active company that\'s serving 10s of thousands of active members. We need work produced at a different, much higher, standard of work produced. This is my go-to freelancer on Fiverr for design and coding work!', 3, 0);

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
(2, 1, 1, '2024-05-31 14:54:13', 0, 1),
(3, 1, 1, '2024-06-08 15:31:48', 0, 0),
(4, 1, 1, '2024-06-08 15:31:59', 0, 0),
(5, 1, 1, '2024-06-08 15:38:18', 0, 0),
(6, 1, 1, '2024-06-08 15:42:36', 0, 0),
(7, 2, 1, '2024-06-08 16:00:33', 0, 0),
(8, 2, 1, '2024-06-08 16:01:40', 0, 0),
(9, 2, 1, '2024-06-08 16:01:55', 0, 0),
(10, 2, 1, '2024-06-08 16:02:46', 0, 0),
(11, 2, 1, '2024-06-08 16:08:25', 0, 0),
(12, 2, 1, '2024-06-08 16:17:27', 0, 0),
(13, 2, 1, '2024-06-08 16:17:55', 0, 0),
(14, 2, 1, '2024-06-08 16:21:38', 0, 0),
(15, 2, 1, '2024-06-08 16:22:18', 0, 0),
(16, 2, 1, '2024-06-08 16:22:34', 0, 0),
(17, 2, 1, '2024-06-09 08:45:32', 0, 0),
(18, 2, 1, '2024-06-10 12:18:13', 0, 0),
(19, 1, 2, '2024-06-10 12:25:15', 0, 0),
(20, 1, 2, '2024-06-10 12:26:04', 0, 0),
(21, 1, 2, '2024-06-10 12:26:38', 0, 0),
(22, 1, 2, '2024-06-10 12:28:59', 0, 0),
(23, 1, 2, '2024-06-10 12:35:19', 0, 0),
(24, 2, 3, '2024-06-10 15:34:57', 0, 0),
(25, 2, 3, '2024-06-10 15:36:13', 0, 0),
(26, 1, 1, '2024-06-10 16:32:29', 0, 0),
(27, 11, 5, '2024-06-11 08:18:18', 0, 0),
(28, 11, 1, '2024-06-11 08:53:17', 0, 0);

INSERT INTO `Jobs` (`job_id`, `job_name`, `rate`, `price`, `image`, `job_desc`, `job_short_desc`, `star`, `job_creator`, `job_detail_type_id`, `isDeleted`, `job_detail_type_link_id`) VALUES
(1, 'web-developer', 0, 200000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718087008/clone_fiverr/1718087004785.png.png', 'I will design and develop your mern stack applications', 'I will design and develop your mern stack applications', 0, 1, 2, 0, 10),
(2, 'test-job-2', 5, 1400000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718086992/clone_fiverr/1718086989890.jpeg.jpg', 'I will design and develop your mern stack applications', 'I will design and develop your mern stack applications', 0, 1, 2, 0, 6),
(3, 'java-app-developer', 0, 400000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718087777/clone_fiverr/1718087773727.jpeg.jpg', 'I will design and develop java', 'I will design and develop your mern stack applications', 0, 3, 2, 0, 6),
(4, 'javascript-app-developer', 0, 450000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718088558/clone_fiverr/1718088546813.jpeg.jpg', 'I will design and develop javascript javascript javascript javascript javascript javascript javascript javascript javascriptjavascript', 'I will design and develop your mern stack applications javascript', 0, 3, 2, 0, 6),
(5, 'javascript-app-developer', 0, 450000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089241/clone_fiverr/1718089238419.jpeg.jpg', 'I will design and develop javascript javascript javascript javascript javascript javascript javascript javascript javascriptjavascript', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(6, 'javascript-basis', 0, 450000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089229/clone_fiverr/1718089221693.jpeg.jpg', 'I will teach javascript basis', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(7, 'javascript-advanced', 0, 350000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089184/clone_fiverr/1718089181438.png.png', 'I will teach javascript advanced', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(8, 'javascript-best-practice', 0, 350000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089123/clone_fiverr/1718089117654.jpeg.jpg', 'I will teach javascript best practice', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(9, 'javascript-core', 0, 350000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089109/clone_fiverr/1718089106431.jpeg.jpg', 'I will teach javascript core', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(10, 'javascript-es6', 0, 350000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089059/clone_fiverr/1718089056540.jpeg.jpg', 'I will teach javascript es6', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(11, 'html-css', 0, 350000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718089044/clone_fiverr/1718089042109.jpeg.jpg', 'I will teach html & css', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(12, 'tailwind', 0, 450000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718088998/clone_fiverr/1718088995899.jpeg.jpg', 'I will teach tailwind', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5),
(13, 'nestjs', 0, 850000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718088955/clone_fiverr/1718088952749.jpeg.jpg', 'I will do NestJs job', 'I will design and develop your mern stack applications javascript', 0, 5, 2, 0, 5),
(14, 'nextjs', 0, 950000, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1718088942/clone_fiverr/1718088939096.jpeg.jpg', 'I will do NextJs job', 'I will design and develop your mern stack applications javascript', 0, 5, 2, 0, 5),
(15, 'nextjs', 0, 950000, NULL, 'I will do React job', 'I will design and develop your mern stack applications javascript', 0, 4, 2, 0, 5);

INSERT INTO `JobTypes` (`id`, `job_type_name`, `isDeleted`) VALUES
(2, 'graphics-design', 0),
(3, 'digital-marketing', 0),
(4, 'video-animation', 0),
(5, 'music-audio', 0),
(6, 'programming-tech', 0),
(7, 'business', 0),
(8, 'lifestyle', 0),
(9, 'data', 0),
(10, 'photography', 0);

INSERT INTO `Users` (`user_id`, `full_name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`, `refresh_token`, `isDeleted`, `avatar`) VALUES
(1, 'lien-chi-khang', 'chikhang11a18@gmail.com', '$2b$07$iY/5ah/Myt/qxtE4bRmOwO5/6eue1V/a5BqUlOTWKeU2M6OHsfSlq', NULL, NULL, b'1', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOm51bGwsImlhdCI6MTcxODA5NTk1MCwiZXhwIjoxNzE4MDk3MTUwfQ.EDXhkgC3cd6GxZKd54zxoSGMGaP-TH1-8zo2vP7kZVs', 0, 'http://res.cloudinary.com/drfjok8d7/image/upload/v1717829245/clone_fiverr/1717829243417.jpeg.jpg'),
(2, 'khang', 'chikhang12a18@gmail.com', '$2b$07$Q78h3o2OzVud9zxa7.2wtOYwilGsaQKLBW3v1fgrCEgMcsaTML4Zq', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOm51bGwsImlhdCI6MTcxODAyMjA4MywiZXhwIjoxNzE4MDIzMjgzfQ.MrXKxqpbDTHC-BCKqq-bycluIGpVui6GRNTNhkvE7ZU', 1, NULL),
(3, 'po', 'chikhang13a18@gmail.com', '$2b$07$TYGnU1Jy0XPpUeYvMHtchuOMdnnO8BQLN3IwEyCGo.0OteC4ympna', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOm51bGwsImlhdCI6MTcxODA4ODMzOCwiZXhwIjoxNzE4MDg5NTM4fQ.VbSDyIAmgXhev2H5KU_eJuUCMIG5aaBLlrHd6BnDUf0', 1, NULL),
(4, 'melody-sky', 'chikhang14a18@gmail.com', '$2b$07$nBRv0HX6JZ2KaYUhJjAEoOaSk9K3h.S8C/Z3SS58yZgB5c9dXwtvu', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOm51bGwsImlhdCI6MTcxODA5NTQ4NiwiZXhwIjoxNzE4MDk2Njg2fQ.sXF6E8U1_GM0o8PhiTk_iSToLZkvpAGmpDD-mTOzAXY', 0, NULL),
(5, 'melanie-dunne', 'chikhang15a18@gmail.com', '$2b$07$/2lj/4P4knRkah2RSLIA..upXBb9OmSBi5XtA3k6gghRQwQ6B25oW', NULL, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInJvbGUiOm51bGwsImlhdCI6MTcxODA5NDA5NCwiZXhwIjoxNzE4MDk1Mjk0fQ.jKlxoFV3PNzxSKzDyk5yw8eQADy9ni513mc20ThPz3I', 0, NULL),
(6, 'melanie-sky', 'chikhang16a18@gmail.com', '$2b$07$Q7PnfbB6Wr35.f8SJYJdze24nn5C3ltCZZT9d3l2oMNLDcaMlU9ka', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;