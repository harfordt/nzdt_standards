-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 24, 2016 at 09:20 AM
-- Server version: 5.6.21
-- PHP Version: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `harfordt_nzdt_standards`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessment_type`
--

CREATE TABLE IF NOT EXISTS `assessment_type` (
`id` tinyint(4) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assessment_type`
--

INSERT INTO `assessment_type` (`id`, `name`) VALUES
(1, 'Internal'),
(2, 'External');

-- --------------------------------------------------------

--
-- Table structure for table `domain`
--

CREATE TABLE IF NOT EXISTS `domain` (
`id` tinyint(4) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `domain`
--

INSERT INTO `domain` (`id`, `name`) VALUES
(1, 'Digital Technologies');

-- --------------------------------------------------------

--
-- Table structure for table `standard`
--

CREATE TABLE IF NOT EXISTS `standard` (
`id` smallint(6) NOT NULL,
  `number` mediumint(8) unsigned NOT NULL,
  `version` tinyint(4) NOT NULL,
  `subject_reference_name` tinyint(4) NOT NULL,
  `subject_reference_number` varchar(6) NOT NULL,
  `title` varchar(255) NOT NULL,
  `level` tinyint(4) NOT NULL,
  `credits` tinyint(4) NOT NULL,
  `assessment_type` tinyint(4) NOT NULL,
  `subfield` tinyint(4) NOT NULL,
  `domain` tinyint(4) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `status_date` date NOT NULL,
  `publish_date` date NOT NULL,
  `review_date` date NOT NULL,
  `achievement_criteria` text NOT NULL,
  `merit_criteria` text NOT NULL,
  `excellence_criteria` text NOT NULL,
  `en2_a_1` text NOT NULL,
  `en2_a_2` text,
  `en2_a_3` text,
  `en2_a_4` text,
  `en2_a_5` text,
  `en2_a_6` text,
  `en2_m_1` text NOT NULL,
  `en2_m_2` text,
  `en2_m_3` text,
  `en2_m_4` text,
  `en2_m_5` text,
  `en2_m_6` text,
  `en2_e_1` text NOT NULL,
  `en2_e_2` text,
  `en2_e_3` text,
  `en2_e_4` text,
  `en2_e_5` text,
  `en2_e_6` text,
  `en3` text,
  `en4` text,
  `en5` text,
  `en6` text,
  `en7` text,
  `en8` text,
  `en9` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
`id` tinyint(4) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'Registered');

-- --------------------------------------------------------

--
-- Table structure for table `subfield`
--

CREATE TABLE IF NOT EXISTS `subfield` (
`id` tinyint(4) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subfield`
--

INSERT INTO `subfield` (`id`, `name`) VALUES
(1, 'Technology');

-- --------------------------------------------------------

--
-- Table structure for table `subject_reference`
--

CREATE TABLE IF NOT EXISTS `subject_reference` (
`id` tinyint(4) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject_reference`
--

INSERT INTO `subject_reference` (`id`, `name`) VALUES
(1, 'Digital Technologies');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessment_type`
--
ALTER TABLE `assessment_type`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `domain`
--
ALTER TABLE `domain`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `standard`
--
ALTER TABLE `standard`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `number` (`number`), ADD KEY `subject_reference_name` (`subject_reference_name`,`assessment_type`,`subfield`,`domain`,`status`), ADD KEY `assessment_type` (`assessment_type`), ADD KEY `subfield` (`subfield`), ADD KEY `domain` (`domain`), ADD KEY `status` (`status`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subfield`
--
ALTER TABLE `subfield`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject_reference`
--
ALTER TABLE `subject_reference`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessment_type`
--
ALTER TABLE `assessment_type`
MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `domain`
--
ALTER TABLE `domain`
MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `standard`
--
ALTER TABLE `standard`
MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `subfield`
--
ALTER TABLE `subfield`
MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `subject_reference`
--
ALTER TABLE `subject_reference`
MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `standard`
--
ALTER TABLE `standard`
ADD CONSTRAINT `standard_ibfk_1` FOREIGN KEY (`subject_reference_name`) REFERENCES `subject_reference` (`id`),
ADD CONSTRAINT `standard_ibfk_2` FOREIGN KEY (`assessment_type`) REFERENCES `assessment_type` (`id`),
ADD CONSTRAINT `standard_ibfk_3` FOREIGN KEY (`subfield`) REFERENCES `subfield` (`id`),
ADD CONSTRAINT `standard_ibfk_4` FOREIGN KEY (`domain`) REFERENCES `domain` (`id`),
ADD CONSTRAINT `standard_ibfk_5` FOREIGN KEY (`status`) REFERENCES `status` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
