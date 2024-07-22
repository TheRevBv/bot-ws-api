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

## Autor de ConsorcioAGA

- [Joshua Morin](https://github.com/TheRevBv)

### Ejemplo de uso

```javascript
const { sendMessage } = require('./src/whatsapp');

sendMessage('573002222222', 'Hola, soy un chatbot');
```

## Documentación

Puedes encontrar más información en la [documentación](https://bot-whatsapp.netlify.app/docs/flows/)
