 

INSERT INTO employees
(first_name, last_name, role_id, manager)
VALUES
("Bryan", "Pero", 1, "Arthur McKenzie"), ("Arthur", "McKenzie", 2, "Ken Pero"), ("Ken", "Pero", 3, "Lauren Orlandino"), ("Dan", "Pero", 4, "Lauren Orlandino"), ("John", "Dough", 3, "Arthur McKenzie");

INSERT INTO roles
(title, salary, department_id)
VALUES
("Account Manager", 110000, 1), ("Security Supervisor", 90000, 1), ("Operations Manager", 95000, 2), ("Operations Director", 150000, 3);

INSERT INTO departments
(department)
VALUES
("Security"), ("Operations"), ("Legal");