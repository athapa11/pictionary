using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Data;
using server.Dtos.Chat;
using server.Interfaces;
using server.Mappers;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Repository
{
    public class ChatRepo : IChatRepo
    {
        private readonly serverDbContext _context;

        public ChatRepo(serverDbContext context){
            _context = context;
        }
        
        // get all cahts associated with user
        public async Task<List<Chat>> GetUserChatsAsync(User user)
        {
            return await _context.UserChats.Where(u => u.UserId == user.Id)
                .Include(u => u.User)
                .Select(chat => new Chat
                {
                    Id = chat.ChatId,
                    ChatName = chat.Chat.ChatName,
                    CreatedOn = chat.Chat.CreatedOn,
                })
                .ToListAsync();
        }

        public async Task<Chat?> GetByIdAsync(int id){
            return await _context.Chat.Include(m => m.Messages)
                .ThenInclude(u => u.User)
                .FirstOrDefaultAsync(i => i.Id == id);
        }


        public async Task<Chat> CreateChatAsync(Chat chat)
        {
            await _context.Chat.AddAsync(chat);
            await _context.SaveChangesAsync();
            return chat;
        }

        public async Task<UserChat> CreateAssociationAsync(UserChat userChat)
        {
            await _context.UserChats.AddAsync(userChat);
            await _context.SaveChangesAsync();
            return userChat;
        }


        public async Task<Chat?> EditChatAsync(int id, Chat dto)
        {
            var chat = await _context.Chat.FindAsync(id);

            if(chat == null){ return null; }

            chat.ChatName = dto.ChatName;
            await _context.SaveChangesAsync();

            return chat;
        }


        public async Task<Chat?> DeleteChatAsync(int id)
        {
            var chat = await _context.Chat.FirstOrDefaultAsync(i => i.Id == id);

            if(chat == null){ return null; }

            _context.Chat.Remove(chat);
            await _context.SaveChangesAsync();

            return chat;
        }


        public async Task<bool> ChatExists(int id)
        {
            return await _context.Chat.AnyAsync(s => s.Id == id);
        }

        public async Task<UserChat?> LeaveChat(User user, int id)
        {
            var userChats = await _context.UserChats.FirstOrDefaultAsync(u => u.UserId == user.Id && u.Chat.Id == id);

            if(userChats == null){ return null; }

            _context.UserChats.Remove(userChats);
            await _context.SaveChangesAsync();

            return userChats;
        }
    }
}