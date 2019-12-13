CREATE TABLE users(
  user_id INT AUTO_INCREMENT,
  first_name VARCHAR(40) NOT NULL,
  email VARCHAR(30) NOT NULL,
  user_password  VARCHAR(75)    NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE tasks (
  task_id INT AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL,
  task_user_id INT,
  is_done BIT(1) NOT NULL,
  PRIMARY KEY(task_id, task_user_id),
  FOREIGN KEY(task_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);