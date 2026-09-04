-- 1. Tabla profiles: extiende auth.users con nombre y rol
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null check (role in ('lector', 'chef')),
  created_at timestamp with time zone default now()
);

-- 2. Tabla recetas: publicadas por chefs
create table recetas (
  id uuid default gen_random_uuid() primary key,
  chef_id uuid references profiles(id) on delete cascade not null,
  nombre text not null,
  descripcion text,
  imagen_url text,
  tiempo_minutos integer,
  ingredientes text[],
  created_at timestamp with time zone default now()
);

-- 3. Tabla favoritos: qué recetas guardó cada lector
create table favoritos (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references profiles(id) on delete cascade not null,
  receta_id uuid references recetas(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  unique (usuario_id, receta_id)
);

-- Activar Row Level Security en las 3 tablas
alter table profiles enable row level security;
alter table recetas enable row level security;
alter table favoritos enable row level security;

-- Políticas para profiles
create policy "Cualquiera puede ver perfiles"
  on profiles for select
  using (true);

create policy "El usuario puede crear su propio perfil"
  on profiles for insert
  with check (auth.uid() = id);

create policy "El usuario puede editar su propio perfil"
  on profiles for update
  using (auth.uid() = id);

-- Políticas para recetas
create policy "Cualquiera puede ver recetas"
  on recetas for select
  using (true);

create policy "Solo chefs autenticados pueden crear recetas"
  on recetas for insert
  with check (auth.uid() = chef_id);

create policy "El chef dueño puede editar su receta"
  on recetas for update
  using (auth.uid() = chef_id);

create policy "El chef dueño puede eliminar su receta"
  on recetas for delete
  using (auth.uid() = chef_id);

-- Políticas para favoritos
create policy "El usuario ve sus propios favoritos"
  on favoritos for select
  using (auth.uid() = usuario_id);

create policy "El usuario puede agregar sus favoritos"
  on favoritos for insert
  with check (auth.uid() = usuario_id);

create policy "El usuario puede quitar sus favoritos"
  on favoritos for delete
  using (auth.uid() = usuario_id);