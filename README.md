# Pre-Entrega-Curso-NodeJS
Pre-Entrega de Proyecto del curso de NodeJS

Este proyecto es una pre-entrega para el curso de Node.js.
Permite gestionar productos usando la Fake Store API desde la terminal, implementando operaciones de consulta, creación y eliminación de productos de forma asíncrona.

## 🚀 ¿Qué hace este proyecto?
- Listar todos los productos
- Consultar un producto específico por su ID
- Crear un nuevo producto
- Eliminar un producto por ID

## 📦 Comandos disponibles

- Listar todos los productos
  - `npm run start GET products`

- Consultar un producto por ID
  - `npm run start GET products/<id>`
 
- Crear un nuevo producto
  - `npm run start POST products <titulo> <precio> <categoria>`

- Eliminar un producto por ID
  - `npm run start DELETE products/<id>`
 
## 📝 Notas:

- Los datos se manipulan usando la Fake Store API.

- El proyecto usa fetch nativo de Node.js, disponible desde Node 18.

- El código incluye validaciones de entrada y mensajes claros de éxito o error.

- Si pasás argumentos inválidos, el programa te indicará cómo usarlo correctamente.

