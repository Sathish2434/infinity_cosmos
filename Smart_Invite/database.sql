CREATE DATABASE IF NOT EXISTS invitation_app;
USE invitation_app;

CREATE TABLE invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    event_title VARCHAR(255) NOT NULL,
    
    -- Birthday-specific
    birthday_age INT DEFAULT NULL,
    birthday_name VARCHAR(100) DEFAULT NULL,
    
    -- Wedding-specific
    bride_name VARCHAR(100) DEFAULT NULL,
    groom_name VARCHAR(100) DEFAULT NULL,
    
    -- Corporate-specific
    company_name VARCHAR(150) DEFAULT NULL,
    meeting_type VARCHAR(50) DEFAULT NULL,
    
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    event_location VARCHAR(255) NOT NULL,
    host_name VARCHAR(100) NOT NULL,
    event_message TEXT,
    
    theme VARCHAR(50) DEFAULT 'modern',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
