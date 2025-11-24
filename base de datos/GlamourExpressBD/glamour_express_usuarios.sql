-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: glamour_express
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol_id` int NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Administrador Principal','admin@glamourexpress.com','123456789',1,1,'2025-11-20 21:03:44','2025-11-20 21:03:44'),(2,'maria_estilista','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','María González','maria@glamourexpress.com','987654321',2,1,'2025-11-20 21:03:44','2025-11-20 21:03:44'),(3,'juan_cliente','$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Juan Pérez','juan@email.com','555123456',3,1,'2025-11-20 21:03:44','2025-11-20 21:03:44'),(4,'pepe','123','pepe','pepe@gmail.com','71956438',3,1,'2025-11-20 21:03:44','2025-11-22 17:01:41'),(5,'carlos_lopez','carlos_lopez','Carlos López','carlos.lopez@email.com','5552345678',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(6,'ana_martinez','ana_martinez','Ana Martínez','ana.martinez@email.com','5553456789',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(7,'luisa_rodriguez','luisa_rodriguez','Luisa Rodríguez','luisa.rodriguez@email.com','5554567890',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(8,'miguel_sanchez','miguel_sanchez','Miguel Sánchez','miguel.sanchez@email.com','5555678901',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(9,'elena_diaz','elena_diaz','Elena Díaz','elena.diaz@email.com','5556789012',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(10,'jorge_gomez','jorge_gomez','Jorge Gómez','jorge.gomez@email.com','5557890123',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(11,'sofia_ramirez','sofia_ramirez','Sofía Ramírez','sofia.ramirez@email.com','5558901234',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(12,'david_fernandez','david_fernandez','David Fernández','david.fernandez@email.com','5559012345',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(13,'patricia_castro','patricia_castro','Patricia Castro','patricia.castro@email.com','5550123456',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(14,'roberto_herrera','roberto_herrera','Roberto Herrera','roberto.herrera@email.com','5551234567',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(15,'laura_mendoza','laura_mendoza','Laura Mendoza','laura.mendoza@email.com','5552345678',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(16,'ricardo_vargas','ricardo_vargas','Ricardo Vargas','ricardo.vargas@email.com','5553456789',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(17,'isabel_ortiz','isabel_ortiz','Isabel Ortiz','isabel.ortiz@email.com','5554567890',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07'),(18,'fernando_ruiz','fernando_ruiz','Fernando Ruiz','fernando.ruiz@email.com','5555678901',3,1,'2025-11-24 18:18:07','2025-11-24 18:18:07');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 14:10:14
