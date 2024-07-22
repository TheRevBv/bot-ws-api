import BotWhatsapp from '@bot-whatsapp/bot';
import ProviderWS from '@bot-whatsapp/provider/venom' //Se cambia el provider de Baileys por el provider de venom

export default BotWhatsapp.createProvider(ProviderWS)