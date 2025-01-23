using Microsoft.AspNetCore.Mvc;
using server.Dtos.Message;
using server.Mappers;
using server.Interfaces;
using server.Queryables;
using Microsoft.AspNetCore.Identity;
using server.Models;
using server.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageRepo _messageRepo;
        private readonly IChatRepo _chatRepo;
        private readonly UserManager<User> _userManager;


        public MessagesController(IMessageRepo messageRepo, IChatRepo chatRepo, UserManager<User> userManager)
        {
            _messageRepo = messageRepo;
            _chatRepo = chatRepo;
            _userManager = userManager;
        }


        // get all messages
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] MessageQuery query)
        {
            if(!ModelState.IsValid){ return BadRequest(ModelState); }

            var messages = await _messageRepo.GetAllAsync(query);
            var messagesDto = messages.Select(message => message.ToMessageDto());
            return Ok(messagesDto);
        }


        // get message by id
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid){ return BadRequest(ModelState); }

            var message = await _messageRepo.GetByIdAsync(id);

            if(message == null)
            {
                return NotFound();
            }

            return Ok(message.ToMessageDto());
        }


        // create message
        [HttpPost("{chatId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int chatId, [FromBody] CreateMessageDto messageDto)
        {
            if(!ModelState.IsValid){ return BadRequest(ModelState); }

            if(!await _chatRepo.ChatExists(chatId))
            {
                BadRequest("Chat not found");
            }

            var username = User.GetUsername();
            var user = await _userManager.FindByNameAsync(username);

            var message = messageDto.ToMessageFromCreate(chatId);
            message.UserId = user.Id;
            await _messageRepo.CreateMessageAsync(message);

            return CreatedAtAction
            (
                nameof(GetById),
                new {id = message.Id},
                message.ToMessageDto()
            );
        }


        // Edit message body
        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Edit([FromRoute] int id, [FromBody] EditMessageDto dto)
        {
            if(!ModelState.IsValid){ return BadRequest(ModelState); }

            var message = await _messageRepo.EditMessageAsync(id, dto.ToMessageFromUpdate());

            if(message == null)
            {
                return NotFound("Message not found");
            }

            return Ok(message.ToMessageDto());
        }


        // Delete message
        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid){ return BadRequest(ModelState); }
            
            var message = await _messageRepo.DeleteMessageAsync(id);

            if(message == null){
                return NotFound();
            }

            return NoContent();
        }
    }
}