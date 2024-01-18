CREATE TABLE doctor(
    id int primary key AUTO_INCREMENT,
    name varchar(50)
);

insert into doctor (name) values ('Stranger');
insert into doctor (name) values ('Who');

CREATE TABLE working_hours(
    id int primary key AUTO_INCREMENT,
    day_of_week int,
    hour_from int,
    hour_to int,
    doctor_id int,
    INDEX IDX_DOCTOR_ID (doctor_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

insert into working_hours (day_of_week, hour_from, hour_to, doctor_id) 
values 
    (0, 9, 17, 1),
    (1, 9, 17, 1),
    (2, 9, 17, 1),
    (3, 9, 17, 1),
    (4, 9, 17, 1),
    (5, 9, 17, 1),
    (6, 0, 0, 1);

insert into working_hours (day_of_week, hour_from, hour_to, doctor_id) 
values 
    (0, 0, 0, 2),
    (1, 8, 16, 2),
    (2, 8, 16, 2),
    (3, 8, 16, 2),
    (4, 8, 16, 2),
    (5, 8, 16, 2),
    (6, 0, 0, 2);