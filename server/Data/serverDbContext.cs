using server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace server.Data
{
    public class serverDbContext : IdentityDbContext<User>
    {
        public serverDbContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Chat> Chat { get; set; }
        public DbSet<Message> Message { get; set; }

        public DbSet<UserChat> UserChats { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // composite primary key
            builder.Entity<UserChat>(x => 
            {
                x.HasKey(p => new { p.UserId, p.ChatId});

                // foreign key to user
                x.HasOne(u => u.User)
                    .WithMany(u => u.UserChats)
                    .HasForeignKey(p => p.UserId);
                
                // foreign key to chat
               x.HasOne(c => c.Chat)
                    .WithMany(c => c.UserChats)
                    .HasForeignKey(p => p.ChatId);

            });
        }
    }
}