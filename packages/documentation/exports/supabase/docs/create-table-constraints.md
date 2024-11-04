---
title: "Create table with constraints"
description: Table with constraints example.
author: dshukertjr
github: https://github.com/dshukertjr
---

## Table with Constraints

Add constraints to your columns using `constraint`.

It is handy if you want to add additional constraints to your columns such as minimum character length.

```sql
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  name varchar(18) not null unique check (char_length(name) >= 4),
);
```

You can use keyword `constraint` to specify a name for constraint. If you don't specify a constraint name in this way, the system chooses a name for you.

```sql
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  name varchar(18) not null unique,

  constraint username_validation check (char_length(name) >= 4)
);
```
