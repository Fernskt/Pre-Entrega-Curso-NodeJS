const BASE_URL = "https://fakestoreapi.com";

const [, , method, resource, ...args] = process.argv;

async function getAllProducts() {
  try {
    console.log("🔎 Buscando todos los productos...");
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error(`Error de la API (${res.status})`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      console.log(`Se obtuvieron ${data.length} productos:`);
      data.forEach(product => {
        console.log(`• [${product.id}] ${product.title} - $${product.price}`);
      });
    } else {
      console.log("No hay productos para mostrar.");
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error.message);
  }
}

async function getProduct(id) {
  if (!id || isNaN(Number(id))) {
    console.error("El ID debe ser un número válido.");
    return;
  }
  try {
    console.log(`🔎 Buscando producto con ID: ${id}...`);
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (res.status === 404) {
      console.error(`Producto con ID ${id} no encontrado.`);
      return;
    }
    if (!res.ok) throw new Error(`Error de la API (${res.status})`);
    const data = await res.json();
    console.log("Producto encontrado:");
    console.log(`ID: ${data.id}\nTítulo: ${data.title}\nPrecio: $${data.price}\nCategoría: ${data.category}`);
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
  }
}

async function createProduct(title, price, category) {
  if (!title || !price || !category) {
    console.error("Debes ingresar: título, precio y categoría.");
    return;
  }
  if (isNaN(Number(price))) {
    console.error("El precio debe ser un número.");
    return;
  }
  try {
    console.log("Creando producto...");
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        title,
        price: Number(price),
        category,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`Error de la API (${res.status})`);
    const data = await res.json();
    console.log("Producto creado exitosamente:");
    console.log(`ID: ${data.id}\nTítulo: ${data.title}\nPrecio: $${data.price}\nCategoría: ${data.category}`);
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
  }
}

async function deleteProduct(id) {
  if (!id || isNaN(Number(id))) {
    console.error("El ID debe ser un número válido.");
    return;
  }
  try {
    console.log(`Eliminando producto con ID: ${id}...`);
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (res.status === 404) {
      console.error(`Producto con ID ${id} no encontrado.`);
      return;
    }
    if (!res.ok) throw new Error(`Error de la API (${res.status})`);
    const data = await res.json();
    if (data && data.id) {
      console.log(`Producto con ID ${id} eliminado correctamente.`);
    } else {
      console.log("El producto no existía o ya fue eliminado.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
  }
}

(async () => {
  const parts = resource.split("/");
  if (method === "GET" && resource.startsWith("products")) {
    if (parts.length === 1) {
      await getAllProducts();
    } else if (parts.length === 2) {
      await getProduct(parts[1]);
    } else {
      console.error("Comando inválido para GET.");
    }
  } else if (method === "POST" && resource === "products") {
    const [title, price, category] = args;
    await createProduct(title, price, category);
  } else if (method === "DELETE" && resource.startsWith("products/")) {
    const id = resource.split("/")[1];
    await deleteProduct(id);
  } else {
    console.log("Comando no reconocido. Opciones:");
    console.log("npm run start GET products");
    console.log("npm run start GET products/<id>");
    console.log("npm run start POST products <titulo> <precio> <categoria>");
    console.log("npm run start DELETE products/<id>");
  }
})();
