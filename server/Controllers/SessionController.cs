using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Interfaces;

namespace server
{
	[ApiController]
	[Route("api/session")]
	public class SessionController : ControllerBase
	{
		private readonly ISessionManager _sessionManager;

		public SessionController(ISessionManager sessionManager){
			_sessionManager = sessionManager;
		}


		[HttpPost("create-session")]
		public IActionResult CreateSession([FromBody] CreateRequest request)
		{
			var session = _sessionManager.CreateSession();
			_sessionManager.AddPlayerToSession(session.SessionId, request.PlayerName, out var player);
			_sessionManager.SetDrawer(session.SessionId);

			return Ok(session);
		}


		[HttpPost("join-session/{sessionId}/{playerName}")]
		public IActionResult JoinSession(string sessionId, string playerName)
		{
			if(_sessionManager.AddPlayerToSession(sessionId, playerName, out var player))
			{
				return Ok(player);
			}
			else{
				return NotFound("Session not found");
			}
		}


		[HttpGet("{sessionId}")]
		public IActionResult GetSession(string sessionId)
		{
			if(_sessionManager.GetSession(sessionId, out var session)){
				return Ok(session);
			}
			else{
				return NotFound("Session not found");
			}
		}


		[HttpDelete("{sessionId}")]
		public IActionResult DeleteSession(string sessionId)
		{
			if(_sessionManager.DeleteSession(sessionId)){
				return Ok("Session deleted");
			}
			else{
				return NotFound("Session not found");
			}
		}
	}
}