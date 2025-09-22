# Órdenes de Producción - Desafío Técnico Mini Fullstack

Una pequeña funcionalidad de Órdenes de Producción construida con backend NestJS y frontend Next.js.

## Características

- Crear y listar órdenes de producción
- API con validaciones y tipado seguro
- Interfaz limpia usando Ant Design
- Tests mínimos pero significativos
- Almacenamiento en memoria (sin base de datos requerida)

## Estructura del Proyecto

```
├── backend/          # API NestJS
├── frontend/         # App React Next.js
└── package.json      # package.json raíz con scripts de workspace
```

## Inicio Rápido

### Prerrequisitos

- Node.js (v18 o superior)
- Yarn

### Instalación

1. Instalar dependencias para todos los workspaces:
```bash
yarn install:all
```

### Desarrollo

Iniciar backend y frontend en modo desarrollo:

```bash
yarn dev
```

O iniciarlos por separado:

```bash
# Backend (corre en http://localhost:3001)
yarn backend:dev

# Frontend (corre en http://localhost:3000)
yarn frontend:dev
```

### Testing

Ejecutar tests para backend y frontend:

```bash
# Tests del backend
yarn test:backend

# Tests del frontend
yarn test:frontend
```

## Endpoints de la API

### POST /api/production-orders
Crea una nueva orden de producción.

**Body:**
```json
{
  "reference": "PO-001",
  "product": "Widget A",
  "quantity": 100,
  "dueDate": "2024-12-31T00:00:00.000Z"
}
```

**Respuesta:**
```json
{
  "id": "uuid",
  "reference": "PO-001",
  "product": "Widget A",
  "quantity": 100,
  "dueDate": "2024-12-31T00:00:00.000Z",
  "status": "planned",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/production-orders
Obtiene todas las órdenes de producción.

**Parámetros de Query:**
- `status` (opcional): Filtrar por estado (`planned`, `scheduled`, `in_progress`, `completed`)

## Esquema de Orden de Producción

- `id`: string (UUID) - Generado automáticamente
- `reference`: string (requerido) - Referencia de la orden
- `product`: string (requerido) - Nombre del producto
- `quantity`: number (requerido, entero positivo) - Cantidad de la orden
- `dueDate`: string (requerido, fecha ISO) - Fecha de vencimiento
- `status`: enum (por defecto: "planned") - Estado de la orden
- `createdAt`: string (fecha ISO) - Timestamp de creación

## Validaciones Implementadas

### Backend (NestJS)
- ✅ **Campos Requeridos:** `@IsNotEmpty()` en reference y product
- ✅ **Cantidad Positiva:** `@IsPositive()` en quantity
- ✅ **Fecha ISO Válida:** `@IsISO8601()` en dueDate
- ✅ **Status por Defecto:** Siempre se asigna "planned"
- ✅ **UUID Generado:** ID único generado automáticamente
- ✅ **Timestamp:** createdAt generado automáticamente

### Frontend (React)
- ✅ **Validaciones de Formulario:** Campos requeridos y validaciones de tipo
- ✅ **InputNumber con min=1:** Previene cantidades negativas
- ✅ **Integración con API:** Llamadas a la API funcionando
- ✅ **UI con Ant Design:** Interfaz limpia y funcional

## Tecnologías Utilizadas

### Backend
- NestJS
- TypeScript
- Class Validator
- Jest (testing)

### Frontend
- Next.js
- React
- TypeScript
- Ant Design
- Axios
- Jest (testing)

## Resultados de Tests

- **Backend Tests:** ✅ 3/3 pasando
- **Frontend Tests:** ✅ 2/2 pasando
- **Total:** ✅ 5/5 tests pasando

## Cumplimiento de Requisitos

- ✅ Crear y listar órdenes de producción end-to-end
- ✅ Tests mínimos pero significativos en ambos lados
- ✅ UI simple y limpia con Ant Design
- ✅ TypeScript en todo el proyecto
- ✅ Almacenamiento en memoria
- ✅ Validaciones de entrada
- ✅ Filtro opcional por status
