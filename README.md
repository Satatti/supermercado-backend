# 🛒 API REST - Supermercado MarketSoft

Backend de un sistema de gestión de supermercado desarrollado con **Node.js**, **Express**, **Sequelize** y **PostgreSQL**, aplicando arquitectura **MVC**.

---

## 👥 Integrantes y Responsabilidades

| Nombre Completo | Responsabilidad Principal |
|---|---|
| **Santiago Valencia Diaz** |
| Configuración del proyecto, modelos Sequelize y relaciones |
| Controladores de Productos y Proveedores |
| Controladores de Ventas y DetalleVenta (cálculo automático del total) |
| Rutas, Swagger UI y documentación del proyecto |


## 📋 Descripción del Proyecto

Sistema backend que permite administrar:

- **Proveedores** (`providers`)
- **Productos** (`products`) — cada uno asociado a un proveedor
- **Usuarios** (`users`) — con roles: admin, vendedor, cliente
- **Ventas** (`sales`) — con cálculo automático del total
- **DetalleVenta** (`sale_details`) — productos por venta

### Relaciones
Proveedor (1) ──────< (N) Producto
Usuario (1) ──────< (N) Venta
Venta (1) ──────< (N) DetalleVenta
Producto (1) ──────< (N) DetalleVenta


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
supermercado-backend/
├── config/
│ └── database.js # Configuración de Sequelize + PostgreSQL
├── models/ # Modelos Sequelize
│ ├── index.js # Definición de relaciones
│ ├── product.js
│ ├── provider.js
│ ├── sale.js
│ ├── saleDetail.js
│ └── user.js
├── controllers/ # Lógica de negocio
│ ├── productController.js
│ ├── providerController.js
│ ├── saleController.js
│ ├── saleDetailController.js
│ └── userController.js
├── routes/ # Endpoints REST
│ ├── index.js
│ ├── productRoutes.js
│ ├── providerRoutes.js
│ ├── saleRoutes.js
│ ├── saleDetailRoutes.js
│ └── userRoutes.js
├── docs/
│ └── swagger.yaml # Especificación OpenAPI 3.0
├── app.js # Configuración de Express
├── server.js # Punto de entrada
├── .env # Variables de entorno (no en GitHub)
├── .gitignore
└── package.json


---

## ⚙️ Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm

---

## 🚀 Instrucciones de Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/satatti/supermercado-backend.git
cd supermercado-backend

🧑‍💻 Autoría
Proyecto desarrollado como parte de la Actividad Colaborativa I - Taller Integrador Backend para la Universidad de Manizales.
