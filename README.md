# 🛒 API REST - Supermercado MarketSoft

Backend de un sistema de gestión de supermercado desarrollado con **Node.js**, **Express**, **Sequelize** y **PostgreSQL**, aplicando arquitectura **MVC**.

---

## 👤 Autor

| Nombre Completo | Responsabilidades |
| --- | --- |
| **Santiago Valencia Diaz** | Configuración del proyecto, modelos Sequelize y relaciones, controladores de Productos y Proveedores, controladores de Ventas y DetalleVenta (cálculo automático del total), rutas, Swagger UI y documentación del proyecto |

---

## 📋 Descripción del Proyecto

Sistema backend que permite administrar:

- **Proveedores** (`providers`)
- **Productos** (`products`) — cada uno asociado a un proveedor
- **Usuarios** (`users`) — con roles: admin, vendedor, cliente
- **Ventas** (`sales`) — con cálculo automático del total
- **DetalleVenta** (`sale_details`) — productos por venta

### Relaciones

```text
Proveedor (1) ──────< (N) Producto
Usuario (1) ──────< (N) Venta
Venta (1) ──────< (N) DetalleVenta
Producto (1) ──────< (N) DetalleVenta
```

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework backend
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM
- **Swagger UI** - Documentación interactiva
- **Arquitectura MVC** - Model, View, Controller

---

## 📁 Estructura del Proyecto

```text
supermercado-backend/
├── config/
│   └── database.js            # Configuración de Sequelize + PostgreSQL
├── models/                    # Modelos Sequelize
│   ├── index.js               # Definición de relaciones
│   ├── product.js
│   ├── provider.js
│   ├── sale.js
│   ├── saleDetail.js
│   └── user.js
├── controllers/               # Lógica de negocio
│   ├── productController.js
│   ├── providerController.js
│   ├── saleController.js
│   ├── saleDetailController.js
│   └── userController.js
├── routes/                    # Endpoints REST
│   ├── index.js
│   ├── productRoutes.js
│   ├── providerRoutes.js
│   ├── saleRoutes.js
│   ├── saleDetailRoutes.js
│   └── userRoutes.js
├── docs/
│   └── swagger.yaml           # Especificación OpenAPI 3.0
├── app.js                     # Configuración de Express
├── server.js                  # Punto de entrada
├── .env                       # Variables de entorno (no en GitHub)
├── .gitignore
└── package.json
```

---

## ⚙️ Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm

---

```markdown
> Los comandos son para Linux/Mac. En Windows, ajusta rutas y usa PowerShell.
```

## 🚀 Instrucciones de Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/satatti/supermercado-backend.git
cd supermercado-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos PostgreSQL

```bash
psql -U postgres -c "CREATE DATABASE supermercado_db;"
```
> Las tablas se crean automáticamente al iniciar el servidor (Sequelize `sync
> > La base de datos arranca vacía — no hay datos de prueba precargados.



### 4. Configurar variables de entorno

Copia el archivo de ejemplo y edítalo:
```bash
cp .env.example .env   # Linux/Mac
copy .env.example .env # Windows (CMD)
```

```env
PORT=3000
DB_NAME=supermercado_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
```


### 5. Ejecutar el proyecto

```bash
npm start
```

```markdown
Al arrancar, deberías ver:
Server running on http://localhost:3000
Database connected
```


El servidor estará disponible en: [http://localhost:3000](http://localhost:3000)

---

## 📖 Documentación Swagger

Una vez el servidor esté corriendo, accede a:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔗 Endpoints de la API

> La documentación completa e interactiva está en Swagger UI: `/api-docs`
> Las tablas de abajo son un resumen.

Todas las rutas usan el prefijo `/api`.

### Proveedores

| Método | Endpoint | Descripción |
| --- | --- | --- |
| **GET** | `/api/providers` | Listar todos |
| **GET** | `/api/providers/:id` | Obtener por ID |
| **POST** | `/api/providers` | Crear |
| **PUT** | `/api/providers/:id` | Actualizar |
| **DELETE** | `/api/providers/:id` | Eliminar |

### Productos

| Método | Endpoint | Descripción |
| --- | --- | --- |
| **GET** | `/api/products` | Listar todos (con proveedor) |
| **GET** | `/api/products/:id` | Obtener por ID |
| **POST** | `/api/products` | Crear (valida precio > 0 y stock ≥ 0) |
| **PUT** | `/api/products/:id` | Actualizar |
| **DELETE** | `/api/products/:id` | Eliminar |

### Usuarios

| Método | Endpoint | Descripción |
| --- | --- | --- |
| **GET** | `/api/users` | Listar todos |
| **GET** | `/api/users/:id` | Obtener por ID |
| **POST** | `/api/users` | Crear (valida email único) |
| **PUT** | `/api/users/:id` | Actualizar |
| **DELETE** | `/api/users/:id` | Eliminar |

### Ventas

| Método | Endpoint | Descripción |
| --- | --- | --- |
| **GET** | `/api/sales` | Listar todas (con usuario y detalles) |
| **GET** | `/api/sales/:id` | Obtener por ID |
| **POST** | `/api/sales` | Crear (total calculated automáticamente) |
| **PUT** | `/api/sales/:id` | Actualizar |
| **DELETE** | `/api/sales/:id` | Eliminar |

### Detalle de Ventas

| Método | Endpoint | Descripción |
| --- | --- | --- |
| **GET** | `/api/sale-details` | Listar todos |
| **GET** | `/api/sale-details/:id` | Obtener por ID |
| **POST** | `/api/sale-details` | Crear |
| **PUT** | `/api/sale-details/:id` | Actualizar |
| **DELETE** | `/api/sale-details/:id` | Eliminar |

---

## 📝 Ejemplos de Uso

### Crear un proveedor

```bash
curl -X POST http://localhost:3000/api/providers \
  -H "Content-Type: application/json" \
  -d '{"name":"Distribuidora ABC","phone":"3001112233","email":"contacto@abc.com","city":"Manizales"}'
```

### Crear un usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@test.com","role":"vendedor"}'
```

### Crear una venta

```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"details":[{"productId":1,"quantity":2},{"productId":2,"quantity":1}]}'
```

---

## ✅ Validaciones Implementadas

| Entidad | Validación |
| --- | --- |
| **Productos** | Precio mayor a 0 |
| **Productos** | Stock no negativo |
| **Productos** | Proveedor debe existir |
| **Usuarios** | Email único |
| **Usuarios** | Rol debe ser admin, vendedor o cliente |
| **Ventas** | Total calculado automáticamente |
| **Ventas** | Stock suficiente para cada producto |
| **Ventas** | Usuario y productos deben existir |
| **DetalleVenta** | Cantidad al menos 1 |

---

## 🧑‍💻 Autoría

Proyecto desarrollado como parte de la Actividad Colaborativa I - Taller Integrador Backend para la Universidad de Manizales.

---

## 📄 Licencia

Este proyecto es de uso académico.
