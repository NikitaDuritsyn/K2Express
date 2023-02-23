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
DROP TABLE rooms, services, tariffs, payment_types, sessions, visitors, clients, deposits, deponents, visitors_sessions_durations, visitors_services;

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
    title text NOT NULL,
    color text
);

create TABLE services(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    price NUMERIC NOT NULL
);

create TABLE tariffs(
    id SERIAL PRIMARY KEY,
    title text NOT NULL
);

create TABLE payment_types(
    id SERIAL PRIMARY KEY,
    type text NOT NULL
);

create TABLE sessions(
    id SERIAL PRIMARY KEY,
    room_id INTEGER NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms (id),
    booked_date timestamp with time zone NOT NULL,
    estimate_session_duration INTEGER NOT NULL,
    estimate_visitors_num INTEGER,
    start_time_session timestamp with time zone,
    end_time_session timestamp with time zone,
    status text NOT NULL
);

create TABLE visitors_sessions_durations(
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions (id),
    visitor_session_duration FLOAT,
    start_time_visitor timestamp with time zone,
    end_time_visitor timestamp with time zone
);

create TABLE clients(
    id SERIAL PRIMARY KEY,
    lastname text,
    number_phone text NOT NULL,
    status text
);

create TABLE visitors(
    id SERIAL PRIMARY KEY,
    visitor_session_duration_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_session_duration_id) REFERENCES visitors_sessions_durations (id),
    tariff_id INTEGER NOT NULL,
    FOREIGN KEY (tariff_id) REFERENCES tariffs (id),
    client_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    name text NOT NULL,
    status text NOT NULL
);

create TABLE deposits(
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    paymet_tipe_id INTEGER NOT NULL,
    FOREIGN KEY (paymet_tipe_id) REFERENCES payment_types (id),
    deposits FLOAT NOT NULL
);

create TABLE deponents(
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    deponent FLOAT NOT NULL
);

create TABLE visitors_services(
    id SERIAL PRIMARY KEY,
    visitor_id INTEGER NOT NULL,
    FOREIGN KEY (visitor_id) REFERENCES visitors (id),
    service_id INTEGER NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services (id),
    status text
);