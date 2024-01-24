CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, password)
VALUES('john', '$2b$13$lUbEmMhI2IbM7jT2aZmzl.vVAcYJsUQ/9.e5EXMxcL5gWtxPO.k.u')