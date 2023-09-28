create table public.browser
(
    id         serial,
    created_at timestamp with time zone not null,
    family     varchar(50),
    major      varchar(10),
    minor      varchar(10),
    patch      varchar(10),
    primary key (id),
    constraint browser_key
        unique (family, major, minor, patch)
);

alter table public.browser
    owner to zavx0z;

create table public.device
(
    id         serial,
    created_at timestamp with time zone not null,
    family     varchar(50),
    brand      varchar(50),
    model      varchar(50),
    primary key (id),
    constraint family_barand_model_key
        unique (family, brand, model)
);

alter table public.device
    owner to zavx0z;

create table public.os
(
    id          serial,
    created_at  timestamp with time zone not null,
    family      varchar(50),
    major       varchar(10),
    minor       varchar(10),
    patch       varchar(10),
    patch_minor varchar(10),
    primary key (id),
    constraint unique_os
        unique (family, major, minor, patch, patch_minor)
);

alter table public.os
    owner to zavx0z;

create table public.profile
(
    id              uuid      default uuid_generate_v4() not null,
    username        varchar(50)                          not null,
    email           varchar(320),
    hashed_password varchar(1024)                        not null,
    is_active       boolean   default true               not null,
    is_verified     boolean   default false              not null,
    created_at      timestamp default now()              not null,
    role            role      default 'client'::role     not null,
    primary key (id),
    unique (email)
);

alter table public.profile
    owner to zavx0z;

create unique index profile_username_key
    on public.profile (username);

create table public.device_browser_os
(
    id         serial,
    device_id  integer,
    browser_id integer,
    os_id      integer,
    primary key (id),
    constraint device_browser_os_key
        unique (device_id, browser_id, os_id),
    foreign key (browser_id) references public.browser,
    foreign key (device_id) references public.device,
    foreign key (os_id) references public.os
);

alter table public.device_browser_os
    owner to zavx0z;

create table public.dialog
(
    id         serial,
    name       varchar(50),
    created_at timestamp not null,
    owner_id   uuid      not null,
    primary key (id),
    foreign key (owner_id) references public.profile
);

alter table public.dialog
    owner to zavx0z;

create table public.client
(
    id                   serial,
    created_at           timestamp with time zone not null,
    profile_id           uuid                     not null,
    device_browser_os_id integer                  not null,
    primary key (id),
    unique (device_browser_os_id),
    constraint client_key
        unique (profile_id, device_browser_os_id),
    foreign key (device_browser_os_id) references public.device_browser_os,
    foreign key (profile_id) references public.profile
);

alter table public.client
    owner to zavx0z;

create table public.dialog_participant
(
    id         serial,
    profile_id uuid    not null,
    dialog_id  integer not null,
    primary key (id),
    foreign key (dialog_id) references public.dialog,
    constraint dialog_participant_user_id_fkey
        foreign key (profile_id) references public.profile
);

alter table public.dialog_participant
    owner to zavx0z;

create table public.message
(
    id         serial,
    text       varchar(1000) not null,
    created_at timestamp     not null,
    sender_id  uuid          not null,
    dialog_id  integer       not null,
    primary key (id),
    foreign key (dialog_id) references public.dialog,
    foreign key (sender_id) references public.profile
);

alter table public.message
    owner to zavx0z;

create table public.message_readers
(
    message_id integer   not null,
    profile_id uuid      not null,
    read_time  timestamp not null,
    primary key (message_id, profile_id),
    foreign key (message_id) references public.message,
    constraint message_readers_user_id_fkey
        foreign key (profile_id) references public.profile
);

alter table public.message_readers
    owner to zavx0z;