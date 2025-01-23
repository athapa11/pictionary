using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Message;
using server.Models;
using server.Queryables;

namespace server.Interfaces
{
    public interface IMessageRepo
    {
        Task<List<Message>> GetAllAsync(MessageQuery query);

        Task<Message?> GetByIdAsync(int id);

        Task<Message> CreateMessageAsync(Message message);

        Task<Message?> EditMessageAsync(int id, Message dto);

        Task<Message?> DeleteMessageAsync(int id);
    }
}