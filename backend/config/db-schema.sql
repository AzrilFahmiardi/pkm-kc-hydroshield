-- Tabel yang sudah ada (User)
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel untuk Pompa Air
CREATE TABLE Pumps (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  location_address TEXT,
  status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
  installation_date DATE,
  last_maintenance_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel untuk Sensor Data
CREATE TABLE SensorData (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pump_id INT,
  water_level DECIMAL(10, 2) NOT NULL,
  flow_rate DECIMAL(10, 2),
  temperature DECIMAL(5, 2),
  humidity DECIMAL(5, 2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pump_id) REFERENCES Pumps(id)
);

-- Tabel untuk Alarm/Notifikasi
CREATE TABLE Alarms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pump_id INT,
  type ENUM('high_water', 'low_water', 'pump_failure', 'maintenance_needed') NOT NULL,
  threshold_value DECIMAL(10, 2),
  message TEXT NOT NULL,
  status ENUM('active', 'resolved', 'ignored') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  FOREIGN KEY (pump_id) REFERENCES Pumps(id)
);

-- Tabel untuk Operasi Pompa
CREATE TABLE PumpOperations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pump_id INT,
  operation_type ENUM('auto_start', 'auto_stop', 'manual_start', 'manual_stop', 'maintenance') NOT NULL,
  initiated_by INT,
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (pump_id) REFERENCES Pumps(id),
  FOREIGN KEY (initiated_by) REFERENCES Users(id)
);

-- Tabel untuk Pengaturan Alarm
CREATE TABLE AlarmSettings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pump_id INT,
  high_water_threshold DECIMAL(10, 2) NOT NULL,
  low_water_threshold DECIMAL(10, 2) NOT NULL,
  notification_email BOOLEAN DEFAULT true,
  notification_sms BOOLEAN DEFAULT false,
  notification_system BOOLEAN DEFAULT true,
  created_by INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pump_id) REFERENCES Pumps(id),
  FOREIGN KEY (created_by) REFERENCES Users(id)
);

-- Tabel untuk Tiket Bantuan
CREATE TABLE HelpDesk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  pump_id INT,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
  assigned_to INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id),
  FOREIGN KEY (pump_id) REFERENCES Pumps(id),
  FOREIGN KEY (assigned_to) REFERENCES Users(id)
);
