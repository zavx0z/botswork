BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE browser
(
    id         SERIAL                   NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    family     VARCHAR(50),
    major      VARCHAR(10),
    minor      VARCHAR(10),
    patch      VARCHAR(10),
    PRIMARY KEY (id),
    CONSTRAINT unique_browser UNIQUE (family, major, minor, patch)
);

CREATE TABLE device
(
    id         SERIAL                   NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    family     VARCHAR(50),
    brand      VARCHAR(50),
    model      VARCHAR(50),
    PRIMARY KEY (id),
    CONSTRAINT unique_device UNIQUE (family, brand, model)
);

CREATE TABLE os
(
    id          SERIAL                   NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    family      VARCHAR(50),
    major       VARCHAR(10),
    minor       VARCHAR(10),
    patch       VARCHAR(10),
    patch_minor VARCHAR(10),
    PRIMARY KEY (id),
    CONSTRAINT unique_os UNIQUE (family, major, minor, patch, patch_minor)
);

CREATE TYPE role AS ENUM ('client', 'developer', 'bot', 'moderator', 'admin', 'superuser');

create table "user"
(
    id              uuid      default uuid_generate_v4() not null primary key,
    username        varchar(50)                          not null,
    email           varchar(320) unique,
    hashed_password varchar(1024)                        not null,
    is_active       boolean   default true               not null,
    is_verified     boolean   default false              not null,
    created_at      timestamp default now()              not null,
    role            role      default 'client'::role     not null
);

alter table "user"
    owner to zavx0z;
create unique index ix_user_username on "user" (username);

CREATE TABLE device_browser_os
(
    id         SERIAL NOT NULL,
    device_id  INTEGER,
    browser_id INTEGER,
    os_id      INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (browser_id) REFERENCES browser (id),
    FOREIGN KEY (device_id) REFERENCES device (id),
    FOREIGN KEY (os_id) REFERENCES os (id),
    CONSTRAINT unique_device_browser_os UNIQUE (device_id, browser_id, os_id)
);

CREATE TABLE dialog
(
    id         SERIAL                      NOT NULL,
    name       VARCHAR(50),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    owner_id   UUID                        NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES "user" (id)
);

CREATE TABLE client
(
    id                   SERIAL                   NOT NULL,
    created_at           TIMESTAMP WITH TIME ZONE NOT NULL,
    user_id              UUID                     NOT NULL,
    device_browser_os_id INTEGER                  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (device_browser_os_id) REFERENCES device_browser_os (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    UNIQUE (device_browser_os_id),
    CONSTRAINT unique_client UNIQUE (user_id, device_browser_os_id)
);

CREATE TABLE dialog_participant
(
    id        SERIAL  NOT NULL,
    user_id   UUID    NOT NULL,
    dialog_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dialog_id) REFERENCES dialog (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE message
(
    id         SERIAL                      NOT NULL,
    text       VARCHAR(1000)               NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    sender_id  UUID                        NOT NULL,
    dialog_id  INTEGER                     NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dialog_id) REFERENCES dialog (id),
    FOREIGN KEY (sender_id) REFERENCES "user" (id)
);

CREATE TABLE message_readers
(
    message_id INTEGER                     NOT NULL,
    user_id    UUID                        NOT NULL,
    read_time  TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    PRIMARY KEY (message_id, user_id),
    FOREIGN KEY (message_id) REFERENCES message (id),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

COMMIT;

