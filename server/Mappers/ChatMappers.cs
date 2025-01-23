using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Chat;
using server.Models;

namespace server.Mappers
{
    public static class ChatMappers
    {
        public static ChatDto ToChatDto(this Chat chatModel){
            return new ChatDto{
                Id = chatModel.Id,
                ChatName = chatModel.ChatName,
                CreatedOn = chatModel.CreatedOn,
                Messages = chatModel.Messages.Select(m => m.ToMessageDto()).ToList()
            };
        }


        // for post request
        public static Chat ToChatFromCreate(this CreateChatDto dto){
            return new Chat{
                ChatName = dto.ChatName
            };
        }


        // for put request
        public static Chat ToChatFromUpdate(this EditChatDto dto){
            return new Chat{
                ChatName = dto.ChatName
            };
        }
    }
}