using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Message;

namespace server.Dtos.Chat
{
    public class ChatDto
    {   
        public int Id { get; set; }
        public string ChatName { get; set; } = string.Empty;

        // activity
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        // relationships
        public List<MessageDto>? Messages { get; set; }
    }
}