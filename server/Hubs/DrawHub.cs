using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using server.Models;

namespace server.Hubs
{
  public class DrawHub : Hub
  {
    private readonly SessionManager _sessionManager;

    public DrawHub(SessionManager sessionManager){
      _sessionManager = sessionManager;
    }
    

    public async Task JoinSession(string sessionId, string playerName)
    {
      if(_sessionManager.AddPlayerToSession(sessionId, playerName, out var player))
      {
        await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
        if(_sessionManager.GetSession(sessionId, out var session))
        {
          await Clients.Group(sessionId).SendAsync("PlayerJoined", player, session);
        }
      }
    }

    public async Task LeaveSession(string sessionId, string playerId)
    {
      if(_sessionManager.RemovePlayer(sessionId, playerId))
      {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, sessionId);
        if(_sessionManager.GetSession(sessionId, out var session)) // find session to update
        {
          await Clients.Group(sessionId).SendAsync("PlayerLeft", session);
        }
      }
    }


    // process word guess
    public async Task SendGuess(string sessionId, string playerId, string guess)
    {
      if(_sessionManager.GetSession(sessionId, out var session)) 
      {
        var player = session.Players.Values.FirstOrDefault(p => p.Id == playerId);
        if(string.Equals(guess, session.CurrentWord, StringComparison.OrdinalIgnoreCase))
        {
          player.Score += 10;
        await Clients.Group(sessionId).SendAsync("CorrectGuess", player, guess);
        }
        else{
          await Clients.Group(sessionId).SendAsync("WrongGuess", player, guess);
        }
      }
    }


    // broadcast drawing
    public async Task SendDrawing(string sessionId, string type, int x, int y, string colour, int size){
      await Clients.Group(sessionId).SendAsync("ReceiveDrawing", type, x, y, colour, size);
    }
  }
}