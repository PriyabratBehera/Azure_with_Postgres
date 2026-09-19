CREATE TABLE IF NOT EXISTS employees (

    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    department VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO employees
(name, email, department)
VALUES
('Priyabrat', 'priyabrat@example.com', 'QA'),
('Rahul', 'rahul@example.com', 'Development'),
('Amit', 'amit@example.com', 'DevOps')
('Amit11', 'amit@example.com11', 'DevOps11')
('Amit11', 'amit@example.com11', 'DevOps1122')

ON CONFLICT (email) DO NOTHING;