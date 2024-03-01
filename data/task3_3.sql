-- TODO Task 3
drop schema if exists csfassessment;

create database csfassessment;

use csfassessment;

    create table orders(
        orderId varchar(128),
        date date,
        name varchar(128),
        address varchar(128),
        priority boolean,
        comments varchar(256),
        primary key(orderId)
    );

    create table line_item(
        prod_index int auto_increment,
        productId varchar(128),
        name varchar(128),
        quantity int,
        price float,
        orderId varchar(128),

        primary key (prod_index),
        constraint foreign_id foreign key(orderId) references orders(orderId)

    );