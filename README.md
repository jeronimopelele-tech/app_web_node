# 📦 APP WEB NODE PS 274

Proyecto fullstack básico con **Node.js**, **Express**, **MongoDB** , diseñado para gestionar empleados mediante una **API RESTful** con operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## 📁 Estructura del Proyecto.

```
app_web_node/
│
├── backend/                        # Servidor con Node.js + Express + MongoDB
│   ├── controllers/
│   │   └── empleado.controller.js   # Lógica de negocio de empleados
│   ├── models/
│   │   └── empleado.js              # Esquema de Mongoose
│   ├── routes/
│   │   └── empleado.route.js        # Rutas REST del recurso empleado
│   ├── database.js                  # Conexión a MongoDB
│   └── index.js                     # Punto de entrada del servidor

---

## 🚀 Instalación y Ejecución

### 🔹 Backend (Node.js + Express + MongoDB)

1. Clona el repositorio:

```bash
git clone https://github.com/candesjara/app_web_node.git
cd app_web_node/backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Verifica que tu MongoDB esté corriendo en `mongodb://localhost:27017`.

4. Ejecuta el servidor:

```bash
npm run dev
```
## 📡 Endpoints de la API

| Método | Ruta                  | Acción                          |
|--------|-----------------------|----------------------------------|
| GET    | `/api/empleados`      | Obtener todos los empleados      |
| POST   | `/api/empleados`      | Crear un nuevo empleado          |
| GET    | `/api/empleados/:id`  | Obtener un empleado por ID       |
| PUT    | `/api/empleados/:id`  | Actualizar un empleado por ID    |
| DELETE | `/api/empleados/:id`  | Eliminar un empleado por ID      |

---

## 🧰 Tecnologías utilizadas

### Backend:
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Morgan](https://www.npmjs.com/package/morgan)
- [CORS](https://www.npmjs.com/package/cors)
- [Nodemon](https://www.npmjs.com/package/nodemon)