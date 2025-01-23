using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Interfaces;
using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;
using server.Dtos.Message;
using Microsoft.AspNetCore.Http.HttpResults;
using server.Mappers;
using server.Queryables;

namespace server.Repository
{
    public class MessageRepo : IMessageRepo
    {   
        private readonly serverDbContext _context;

        public MessageRepo(serverDbContext context){
            _context = context;
        }


        public async Task<List<Message>> GetAllAsync(MessageQuery query){
            var messages = _context.Message.AsQueryable();

            // search by message content
            if(!string.IsNullOrWhiteSpace(query.Content)){
                messages = messages.Where(s => s.Content.Contains(query.Content));
            }

            // sort by new or old
            if(!query.Old){
                messages = messages.OrderByDescending(m => m.CreatedOn);
            }
            else{
                messages = messages.OrderBy(m => m.CreatedOn);
            }

            // pagination calculation
            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await messages.Skip(skipNumber).Take(query.PageSize).Include(u => u.User).ToListAsync();
        }


        public async Task<Message?> GetByIdAsync(int id){
            return await _context.Message.Include(u => u.User).FirstOrDefaultAsync(m => m.Id == id);
        }


        public async Task<Message> CreateMessageAsync(Message message){
            await _context.Message.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }


        public async Task<Message?> EditMessageAsync(int id, Message dto)
        {
            var message = await _context.Message.FirstOrDefaultAsync(x => x.Id == id);

            if(message == null){ return null; }

            message.Content = dto.Content;
            message.Edited = true;
            await _context.SaveChangesAsync();

            return message;
        }


        public async Task<Message?> DeleteMessageAsync(int id)
        {
            var message = await _context.Message.FirstOrDefaultAsync(x => x.Id == id);
            
            if(message == null){ return null; }

            _context.Message.Remove(message);
            await _context.SaveChangesAsync();

            return message;
        }
    }
}