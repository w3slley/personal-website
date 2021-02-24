-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: personal_website
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COMMENT`
--

DROP TABLE IF EXISTS `COMMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMMENT` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `username` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENT`
--

LOCK TABLES `COMMENT` WRITE;
/*!40000 ALTER TABLE `COMMENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMMENT_POST`
--

DROP TABLE IF EXISTS `COMMENT_POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMMENT_POST` (
  `post_id` int NOT NULL,
  `comment_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `COMMENT_POST_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `POST` (`post_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `COMMENT_POST_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `COMMENT` (`comment_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENT_POST`
--

LOCK TABLES `COMMENT_POST` WRITE;
/*!40000 ALTER TABLE `COMMENT_POST` DISABLE KEYS */;
/*!40000 ALTER TABLE `COMMENT_POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POST`
--

DROP TABLE IF EXISTS `POST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POST` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `view_count` int DEFAULT '1',
  `slug` text NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `POST_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST`
--

LOCK TABLES `POST` WRITE;
/*!40000 ALTER TABLE `POST` DISABLE KEYS */;
INSERT INTO `POST` VALUES (2,'Post to test code and mathjax among other things',1,'I\'m now editing this inside the `create post` section!\n\nI\'m now using MathJax to render LaTex in the browser as well as hightlight.js for the syntax highlighting on code snippets. I think I have all I need to start writing stuff. \n\nFor instance, this is the gauss law in differential form:\n\n$$ \\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0} $$ \n\nAnd this is is a Node object in java for the implementation of linked lists (and so many other stuff):\n\n```python\n#This is a test\nlist = [\'a\',\'b\',\'c\']\ndict = {}\nfor i in range(len(list)):\n    dict[list[i]] = 1\nprint(dict)\n```\n\nNow, how can I type inline code? `this is a line of code;`.\nI managed to do everything I wanted so far, but there is a lot of things to do:\n- Implementation of posts. \n- Authentication system using _express-session_\n\nWhen it comes to the first one, the database modeling is already set and the MySQL database is already created.\n\nI still don\'t know whether I should put these static files into the database and create an in-browser tool to edit them or if I should leave them as a markdown file in the root folder of the project. The way it is, it\'s easy to edit. I\'ll just leave it like this for now.','2020-05-07 04:25:46','2020-08-15 14:18:33',275,'post-to-test-code-and-mathjax-among-other-things'),(3,'First post (for real)',1,'I\'m right now writing on the newly created section of the website. I should be able to use latex and everything I wanted from here, like code:\n\n```java\nfor(int i=0;i<n;i++)\n  System.out.println(\"Hello World\");\n```\n\nand also math:\n\n$$ F = m\\frac{dv}{dt} $$\n\nSo everything is coming together. Next thing is to implement a front-end markdown parser for live comparison between text and compiled markdown.\n\nWhen I think about it, I should add a navbar with directions to places. I don\'t think if the current sidebar is the best for navigation. In the navbar I should put at least a link for the home page and for the posts (and when I\'m logged in, a link to the dashboard).\n\nTesting update feature.','2020-05-07 04:55:19','2020-08-18 17:43:54',38,'first-post-for-real'),(9,'Testing markdown',1,'Testing lists:\n- 1\n- 2\n- 3\n\nCode in line: `this.myMethod()`!\n\nThis is a block code:\n\n```java\npublic static void main(String[] args){\n  System.out.println(\"Hello world\");\n}\n\n```\n\nNow testing MathJax:\n\n$$ E = mc^2 $$\n\n\nRight now I can only see the html parsed from the markdown - I have to find a way to somehow call the methods on the hightlightjs and mathJax so that they compile the text everytime I write something here.\n\nI\'ll probably have to use the nodejs module.','2020-07-24 22:25:51','2020-08-15 12:34:40',29,'testing-markdown'),(10,'Scientific thinking amidst a pandemic',1,'One of the things I learned so far while studying a STEM field is the fact that, prior to taking the time to study a given subject, I’m usually wrong on the assertions I make. Due to its inherent difficulty and the high level of competence you need to have to get things right, being wrong is the default result, really. You have to study a bit to, for instance, understand the implications the second law of the thermodynamics or to know the physical meaning of the equation $\\nabla \\cdot \\vec{B} = 0$ (fun fact: it has to do with the fact that there are no - as far as anyone knows - magnetic monopoles in nature).\n\nAnd perhaps that’s what some people who don’t come from a scientific background sometimes don\'t grasp: that the “most obvious” thing you think about is often not the actual solution to a given problem nor the correct interpretation of reality. It’s not easy to say correct things about celestial mechanics, epidemiology or macroeconomics when you don’t have enough knowledge on these subjects to begin with. Each one is a rabbit hole you would need years (perhaps decades) to actually understand deeper and to make contributions to the field. That’s why people have to have PhDs and do research. That’s what science is all about.\n\nThere are people though who think their affirmations can guide them through these difficult subjects, that perhaps their common knowledge based assertions are correct, when in fact they are simply a minor representation of reality, when not blatantly wrong. Even people from their respective scientific fields, who possess a lot of experience on what they do, still are not certain about everything. That’s what it means to be in the edge of the knowledge acquisition process. \n\nUnfortunately, we’ve had to wait for the strike of a global pandemic to start listening more carefully to what scientists have to say. When it comes to understanding any area that involves science, the first advice we should take would have to be from the researchers and experts in their respective fields, not some random channel on Youtube nor a Facebook page. And that’s specially true for \"controversial\" topics that imply at least a basic scientific understanding of nature (like the affirmation that the earth is flat or that Covid-19 is just a little flu). \n\nIt certainly isn\'t the easiest route to take in the short attention span and clickbait headline based information world we live in today.  But the wide spread impact of getting this wrong (i.e spread of misinformation about this virus who already killed so many people, the whole 5G conspiracy stuff, mistrust on vaccines and a lot of other conspiracy theories out there) is too big to leave it aside and just go for the easiest option.','2020-07-24 23:32:44','2020-08-23 18:51:34',68,'scientific-thinking-amidst-a-pandemic');
/*!40000 ALTER TABLE `POST` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `POST_TAG`
--

DROP TABLE IF EXISTS `POST_TAG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `POST_TAG` (
  `post_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `POST_TAG_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `POST` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `POST_TAG_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `TAG` (`tag_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `POST_TAG`
--

LOCK TABLES `POST_TAG` WRITE;
/*!40000 ALTER TABLE `POST_TAG` DISABLE KEYS */;
INSERT INTO `POST_TAG` VALUES (2,3),(3,3),(9,7),(3,8),(2,9),(10,10),(3,14),(10,15);
/*!40000 ALTER TABLE `POST_TAG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TAG`
--

DROP TABLE IF EXISTS `TAG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAG` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TAG`
--

LOCK TABLES `TAG` WRITE;
/*!40000 ALTER TABLE `TAG` DISABLE KEYS */;
INSERT INTO `TAG` VALUES (1,'java'),(2,'c++'),(3,'python'),(4,'php'),(5,'haskell'),(6,'algorithms'),(7,'javascript'),(8,'web development'),(9,'physics'),(10,'science'),(14,'git'),(15,'thoughts');
/*!40000 ALTER TABLE `TAG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL,
  `joined` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'Weslley Victor','wvict','$2b$10$rSnyfRTH3KmfleYAoH0Dmuotj/qeP9Jq0kcl5OJU2lHXCLUfdvxxW','admin','2020-04-23 23:22:11');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-04  0:25:53
