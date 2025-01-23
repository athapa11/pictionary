using server.Dtos.Message;
using server.Models;

namespace server.Mappers
{
    // map createDto to message to post
    public static class MessageMappers
    {
        public static MessageDto ToMessageDto(this Message messageModel)
        {
            return new MessageDto
            {
                Id = messageModel.Id,
                Content = messageModel.Content,
                CreatedOn = messageModel.CreatedOn,
                Edited = messageModel.Edited,
                CreatedBy = messageModel.CreatedBy,
                ChatId = messageModel.ChatId,
            };
        }

        
        // for post request
        public static Message ToMessageFromCreate(this CreateMessageDto messageDto, int chatId)
        {
            return new Message
            {
                Content = messageDto.Content,
                ChatId = chatId
            };
        }


        // for put request
        public static Message ToMessageFromUpdate(this EditMessageDto dto)
        {
            return new Message
            {
                Content = dto.Content
            };
        }
    }
}