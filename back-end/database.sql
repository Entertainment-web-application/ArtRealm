CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  likes INT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT,
  user_id INT,
  comment TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES post (post_id)
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL, 
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  deleted BOOLEAN DEFAULT false
);
