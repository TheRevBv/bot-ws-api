# API para pnvio de mensajes de chatbot a WhatsApp

## Descripción

API para envio de mensajes de chatbot a WhatsApp, utilizando la librería [Bot WhatsApp](https://bot-whatsapp.netlify.app/docs/flows/)

## Instalación

```bash
pnpm install
```

## Uso

```bash
pnpm start
```

## Contribución

Para contribuir al proyecto, por favor sigue los siguientes pasos:

1. Crea un Fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/featureName`)
3. Realiza los cambios necesarios
4. Agrega los cambios (`git add .`)
5. Realiza un commit (`git commit -m 'feat: new feature'`)
6. Realiza un push a la rama (`git push origin feature/featureName`)
7. Crea un Pull Request

## Licencia

MIT

## Autor

- [Joshua Morin](https://github.com/TheRevBv)

### Ejemplo de uso

```typescript
-- Agregar en services/index.ts
import { handleCtx } from "@bot-whatsapp/provider-baileys";

const main = async () => {
  const ctx = await handleCtx({
    phone: "573002222222",
    message: "Hola, soy un mensaje de prueba",
  });

  console.log(ctx);
};
```

- Las rutas las puedes consultar en

```typescript
-- src/routes/index.ts

server.post("/ruta", callbackFn())
server.get("/ruta", callbackFn())

```

## Documentación

Puedes encontrar más información en la [documentación](https://bot-whatsapp.netlify.app/docs/flows/)

## Endpoints

- GET /qr -> Retorna un QR para escanear y loguearse en WhatsApp
- POST /send-message -> Envia un mensaje a un número de WhatsApp
-- Ejemplo de uso

```json
{
  "phone": "573002222222",
  "message": "Hola, soy un mensaje de prueba",
  // optional params
  "imageUrl": "https://img.freepik.com/vector-gratis/diseno-icono-whatsapp_23-2147900927.jpg"
}
```
