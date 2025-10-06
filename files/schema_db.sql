-- Reinicio seguro del esquema
DROP TABLE IF EXISTS pedido_productos CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

DROP TYPE IF EXISTS rol_usuario_enum CASCADE;
DROP TYPE IF EXISTS estado_pedido_enum CASCADE;

-- Tipos ENUM
CREATE TYPE rol_usuario_enum AS ENUM ('admin', 'cliente');
CREATE TYPE estado_pedido_enum AS ENUM ('pendiente', 'preparando', 'entregado');

-- Tablas

-- a) Usuario
CREATE TABLE usuarios (
  id            BIGSERIAL PRIMARY KEY,
  nombre        VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  rol           rol_usuario_enum NOT NULL DEFAULT 'cliente',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- b) Producto
CREATE TABLE productos (
  id            BIGSERIAL PRIMARY KEY,
  nombre        VARCHAR(120) NOT NULL,
  precio        NUMERIC(12,2) NOT NULL CHECK (precio >= 0),
  categoria     VARCHAR(60)  NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- c) Pedido
CREATE TABLE pedidos (
  id            BIGSERIAL PRIMARY KEY,
  fecha         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  estado        estado_pedido_enum NOT NULL DEFAULT 'pendiente',
  usuario_id    BIGINT NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT
);

-- d) PedidoProducto (N:M)
CREATE TABLE pedido_productos (
  pedido_id       BIGINT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id     BIGINT NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
  cantidad        INTEGER NOT NULL CHECK (cantidad > 0),
  PRIMARY KEY (pedido_id, producto_id)
);

-- Datos de prueba

-- Usuarios
INSERT INTO usuarios (nombre, email, rol) VALUES
  ('Ana Gómez',      'ana@example.com',   'admin'),
  ('Carlos Pérez',   'carlos@example.com','cliente'),
  ('Lucía Rojas',    'lucia@example.com', 'cliente');

-- Productos
INSERT INTO productos (nombre, precio, categoria) VALUES
  ('Café Molido 500g',      25000.00, 'Alimentos'),
  ('Té Verde 20 sobres',     12000.00, 'Alimentos'),
  ('Botella Térmica 750ml',  55000.00, 'Accesorios'),
  ('Cuaderno A5 100h',        9000.00, 'Papelería'),
  ('Bolígrafo Gel Negro',      3500.00, 'Papelería');

-- Pedidos (usuario_id debe existir en usuarios)
INSERT INTO pedidos (fecha, estado, usuario_id) VALUES
  (NOW() - INTERVAL '3 days', 'pendiente', 2),
  (NOW() - INTERVAL '2 days', 'preparando', 3),
  (NOW() - INTERVAL '7 days', 'entregado', 2);

-- PedidoProducto (pedido_id y producto_id deben existir)
INSERT INTO pedido_productos (pedido_id, producto_id, cantidad) VALUES
  (1, 1, 2),  -- Pedido 1: 2 unidades del producto 1
  (1, 3, 1),  -- Pedido 1: 1 unidad del producto 3
  (2, 2, 3),  -- Pedido 2: 3 unidades del producto 2
  (2, 5, 4),  -- Pedido 2: 4 unidades del producto 5
  (3, 1, 1),  -- Pedido 3: 1 unidad del producto 1
  (3, 4, 2);  -- Pedido 3: 2 unidades del producto 4



