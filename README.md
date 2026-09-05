🍽️ Proyecto Recetas

Aplicación web full-stack desarrollada con Next.js, TypeScript, Tailwind CSS y Supabase , que permite a los usuarios explorar recetas y, dependiendo de su rol, gestionar sus propias recetas.

El proyecto fue desarrollado como parte del Proyecto Integrador — Segundo Parcial de Aplicaciones Web .

La aplicación cuenta con autenticación, roles de usuario, operaciones CRUD, consumo de una API externa y conexión con una base de datos PostgreSQL mediante Supabase.

🌐 Demo en vivo

🔗 Aplicación desplegada en Vercel:

PENDIENTE — aquí colocaremos la URL después del deploy

📸 Capturas de pantalla
Página principal


Listado de recetas

Panel de control del chef

Las imágenes serán reemplazadas por las capturas reales de la aplicación.

🛠️ Pila tecnológica

El proyecto utiliza las siguientes tecnologías:

Next.js 14 — Framework principal que utiliza App Router.
React — Construcción de la interfaz.
TypeScript — Tipado estático del proyecto.
Tailwind CSS — Estilos y diseño de la aplicación.
Supabase : base de datos PostgreSQL y autenticación.
Supabase Auth — Registro, inicio y cierre de sesión.
Acciones del servidor : operaciones de creación, actualización y eliminación.
API externa — Obtención de información adicional relacionada con recetas.
Git y GitHub — Control de versiones.
Vercel — Despliegue de la aplicación.

Estos corresponden al stack obligatorio indicado para el proyecto.

👥 Roles de usuario

La aplicación cuenta con dos roles diferentes:

👨‍🍳 Chef

El usuario con rol Chef puede:

Iniciar sesión.
Acceder a su dashboard.
Publicar nuevas recetas.
Consultar sus recetas.
Editar sus recetas.
Eliminar sus recetas.
Gestionar el contenido que ha creado.
👤 Lector

El usuario con rol Lector puede:

Registrarse.
Iniciar sesión.
Explora las recetas disponibles.
Consulta el detalle de las recetas.
Interactuar con el contenido disponible según los permisos establecidos.

Los dos roles tienen permisos diferentes, cumpliendo el requisito de contar con al menos dos tipos de usuario.

🍴 Funcionalidades principales
🔐 Autenticación

La aplicación permite:

Registro de usuarios.
Inicio de sesión.
Cierre de sesión.
Protección de rutas privadas.
Manejo de diferentes roles.

La autenticación se realiza utilizando Supabase Auth .

📝 Gestión de recetas

Los chefs pueden gestionar sus recetas mediante un CRUD completo.

Crear

El chef puede publicar una nueva receta indicando:

Nombre.
Descripción.
URL de la imagen.
Tiempo de preparación.
Ingredientes.
Mirada lasciva

Los usuarios pueden consultar el listado de recetas y acceder al detalle de cada receta.

Actualizar

El propietario de una receta puede modificar su información.

Eliminar

El propietario de una receta puede eliminarla desde su tablero.

La aplicación cumple así con las cuatro operaciones principales del CRUD requeridas en el proyecto.

🔎 Búsqueda y filtros

La aplicación incluye componentes interactivos para facilitar la búsqueda y navegación entre recetas.

Se utilizan componentes de cliente cuando es necesario para manejar la interacción mediante React y useState.

Esto corresponde al requisito de incorporar al menos un componente interactivo de búsqueda o filtro.

🌐 API externa — TheMealDB

Para complementar la información de las recetas, el proyecto utiliza TheMealDB, una API REST pública relacionada con la temática de cocina y recetas.

TheMealDB proporciona información sobre diferentes comidas y recetas, incluyendo nombres, categorías, ingredientes, instrucciones e imágenes.

Endpoint utilizado

El proyecto utiliza el siguiente endpoint:

https://www.themealdb.com/api/json/v1/1/search.php?f=a

Este endpoint permite obtener recetas cuyo nombre comienza con la letra A.

🌐 Consumo de la API

La información se obtiene utilizando fetch y async/await, y posteriormente los datos recibidos en formato JSON son procesados y renderizados dinámicamente dentro de la aplicación.

Ejemplo del proceso:

Aplicación Recetas
       ↓
fetch()
       ↓
TheMealDB API
       ↓
Respuesta JSON
       ↓
Procesamiento de datos
       ↓
Renderizado de recetas
Manejo de errores

La aplicación contempla el manejo básico de errores para evitar que la interfaz falle si la API no responde correctamente.

De esta manera, la aplicación combina dos fuentes de información:

Supabase: almacena las recetas y los datos generados por los usuarios.
TheMealDB: proporciona información externa sobre comidas y recetas.

Esto permite cumplir con el requisito de utilizar una API REST externa independiente de la base de datos propia del proyecto. 

Documentación

La documentación oficial de TheMealDB se encuentra disponible en:

TheMealDB API — documentación oficial

🗄️ Modelo de datos

La aplicación utiliza Supabase PostgreSQL como base de datos.

Las tablas están relacionadas mediante llaves foráneas para mantener la relación entre usuarios y recetas.

La estructura permite representar, entre otras relaciones:

Usuario
   │
   │ 1
   │
   │
   └──────────< Recetas
                  │
                  ├── nombre
                  ├── descripción
                  ├── imagen
                  ├── tiempo
                  ├── ingredientes
                  └── chef_id

La relación principal es:

Un chef puede tener muchas recetas.

Además, el proyecto utiliza una tabla de perfil relacionada con los usuarios de autenticación.

Esto corresponde al requisito de utilizar mínimo tres tablas relacionadas, una tabla de perfil y relaciones mediante claves foráneas.

📁 Estructura del proyecto

La estructura principal del proyecto es:

proyecto-recetas/
│
├── app/
│   ├── actions/
│   │   └── recetas.ts
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── nuevo/
│   │       └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── recetas/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│
├── lib/
│   └── supabase/
│
├── middleware.ts
├── .env.local
├── .gitignore
├── package.json
└── README.md
⚙️ Instalación local

Para ejecutar el proyecto localmente:

1. Clonar el repositorio
git clone https://github.com/priscila-qui/proyecto-recetas
2. Entrar en la carpeta
cd proyecto-recetas
3. Instalar dependencias
npm install
4. Crear las variables de entorno.

Crear un archivo:

.env.local

y agregue las variables correspondientes de Supabase.

5. Ejecutar el proyecto
npm run dev

La aplicación estará disponible en:

http://localhost:3000

🔑 Variables de entorno

El proyecto utiliza variables de entorno para mantener las credenciales de Supabase fuera del código fuente.

El archivo .env.localdebe contener las variables correspondientes a la configuración de Supabase.

Ejemplo:

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_de_supabase

No se deben colocar las claves reales dentro del README ni subir .env.locala GitHub.

El documento de la asignatura establece expresamente que .env.localdebe mantenerse fuera del repositorio.

🔒 Seguridad

Se utilizan variables de entorno para evitar exponer las credenciales de Supabase.

Además, las rutas privadas están protegidas para impedir que los usuarios sin sesión puedan acceder a funcionalidades destinadas a usuarios autenticados.

El rol del usuario se obtiene de la base de datos y se utiliza para determinar los permisos disponibles.

🚀 Despliegue

El proyecto quedará desplegado utilizando Vercel , conectado directamente con el repositorio de GitHub.

Una vez realizado el despliegue, aquí colocaremos la URL:

https://proyecto-recetas.vercel.app




🧪 Credenciales de prueba

Para facilitar la revisión del proyecto se incluirán usuarios de prueba.

👨‍🍳 Chef
Correo: PENDIENTE
Contraseña: PENDIENTE
👤 Lector
Correo: PENDIENTE
Contraseña: PENDIENTE

Las credenciales reales las colocaremos únicamente cuando tengamos creadas las cuentas definitivas para la demostración.

La tarea solicita credenciales de prueba para cada rol.

✅ Requisitos implementados
Requisito	Estado
Next.js 14	✅
Mecanografiado	✅
Tailwind CSS	✅
Supabase	✅
Autenticación	✅
Registro	✅
Acceso	✅
Cerrar sesión	✅
Rol Chef	✅
Rol Lector	✅
Rutas públicas	✅
Rutas privadas	✅
Ruta dinámica[id]	✅
Crear recetas	✅
Leer recetas	✅
Editar recetas	✅
Eliminar recetas	✅
Búsqueda/filtro	✅
API externa	⚠️ Verificar nombre
Acciones del servidor	✅
GitHub	✅
Más de 15 confirmaciones	✅
Despliegue en Vercel	⬜ Pendiente
LÉAME completo	🔄 En proceso
Video de defensa	⬜ Pendiente

Los requisitos y criterios anteriores se basan en el documento oficial del proyecto.

📚 Aprendizajes

Durante el desarrollo del proyecto se trabajó con:

Desarrollo de aplicaciones Full-Stack.
Enrutador de aplicaciones Next.js.
Componentes Servidor y Cliente.
Mecanografiado.
Tailwind CSS.
Supabase PostgreSQL.
Autenticación de Superbase.
Acciones del servidor.
Operaciones CRUD.
Relaciones entre tablas.
Protección de rutas.
Consumo de APIs REST.
Git y GitHub.
Despliegue en Vercel.

👩‍💻 Autora

Priscila Quiñónez

Proyecto Integrador — Aplicaciones Web

Repositorio:

GitHub — proyecto-recetas
