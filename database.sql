-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      ВОПРОСЫ     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- Где дожны храниться Payments и тарифы с услугами. Потому что пока мне не особо понятно как это правильно реализовать. Я так понял относится эта сущьность к Session (или сделать 2 payment сущности одна относиться к Session, а вторая к клиенту)
-- Может ли тариф быть разным у каждого пользователя? (скорее всего нет) Если да, то нужна помощь чтобы понять как распределить данные о них в бд и логику на фронте (кажется что так проще но хз)
-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- |||||||||||||||||||||||||||||||||||||||||||||||||||||||      НАПОМИН     |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
-- UNIQUE - свойство которое делает поле уникальным во всем столбце таблицы
-- Email CHARACTER VARYING(30) UNIQUE, как пример. Нужно сделать с мыслом
-- FOREIGN KEY (user_id) REFERENCES person (id)
-- user_id INTEGER,
-- sql lenguage Russian кодировка - \! chcp 1251
-- отчистить экран -  \! cls
-- DROP TABLE client_services,clients,clients_timelines,payments,rooms,services,sessions,tariffs,users;
DROP TABLE users, rooms, tariffs, services, sessions, visitors, payments, payment_types, visitors_timelines, visitors_services;
-- DataBase kamenka2
create TABLE users(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    phone VARCHAR(20) NOT NULL,
    token text,
    status text NOT NULL
);

create TABLE rooms(
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

create TABLE tariffs(
    id SERIAL PRIMARY KEY,
    name text NOT NULL
);

create TABLE services(
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    price NUMERIC NOT NULL
);

create TABLE payment_types(
    id SERIAL PRIMARY KEY,
    type_name text NOT NULL
);

create TABLE sessions(
    id SERIAL PRIMARY KEY,
    room_id INTEGER,
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    date text NOT NULL,
    time_booking text NOT NULL,
    timeLine text NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL,
    status INTEGER NOT NULL
);

create TABLE visitors(
    id SERIAL PRIMARY KEY,
    session_id INTEGER,
    FOREIGN KEY (session_id) REFERENCES sessions (id),
    tariff_id INTEGER,
    FOREIGN KEY (tariff_id) REFERENCES tariffs (id),
    name text NOT NULL,
    lastname text NOT NULL,
    number_phone text,
    deposit INTEGER,
    deponent INTEGER,
    status INTEGER NOT NULL
);

create TABLE payments(
    id SERIAL PRIMARY KEY,
    session_id INTEGER,
    FOREIGN KEY (session_id) REFERENCES sessions (id),
    visitor_id INTEGER,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    payment_types_id INTEGER,
    FOREIGN KEY (payment_types_id) REFERENCES payment_types (id),
    payment INTEGER NOT NULL
);

create TABLE visitors_timelines(
    id SERIAL PRIMARY KEY,
    session_id INTEGER,
    FOREIGN KEY (session_id) REFERENCES sessions (id),
    visitor_id INTEGER,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    time_line INTEGER NOT NULL,
    start_time text NOT NULL,
    end_time text NOT NULL
);

create TABLE visitors_services(
    visitor_id INTEGER,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    service_id INTEGER,
    FOREIGN KEY (service_id) REFERENCES services (id)
);