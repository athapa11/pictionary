using Microsoft.AspNetCore.SignalR;
using server.Models;
using server.Services;

namespace server.Hubs
{
  public class PictionaryHub : Hub
  {
    private readonly ISessionManager _sessionManager;

    public PictionaryHub(ISessionManager sessionManager)
    {
      _sessionManager = sessionManager;
    }

    public async Task Join(string playerName)
    {
      _sessionManager.AddPlayer(Context.ConnectionId, playerName);

      var roster = _sessionManager.GetPlayers().ToList();
      var player = _sessionManager.GetPlayer(Context.ConnectionId);

      Console.WriteLine($"there are now {roster.Count} players");

      // broadcaster new players list
      await Clients.All.SendAsync("PlayerJoined", player, roster);
      Console.WriteLine($"Player {player?.Name} added. {roster.Count} players are now active.");

      if (_sessionManager.CanStartRound())
      {
        await StartSession();
      }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
      var leaver = _sessionManager.GetPlayer(Context.ConnectionId);
      _sessionManager.RemovePlayer(Context.ConnectionId);

      if (leaver != null) {
        var roster = _sessionManager.GetPlayers().ToList();
        Console.WriteLine($"Player {leaver.Name} disconnected.");
        await Clients.All.SendAsync("PlayerLeft", leaver.Name, roster);
      }

      await base.OnDisconnectedAsync(exception);
    }


    public async Task SendGuess(string guess) {
      var player = _sessionManager.GetPlayer(Context.ConnectionId);
      var isCorrect = _sessionManager.CheckGuess(Context.ConnectionId, guess);
      var scores = _sessionManager.GetPlayers().ToList();
      
      if (isCorrect) {
        await Clients.Client(Context.ConnectionId).SendAsync("CorrectGuess", player!.Name, scores);
      }
      else {
        await Clients.All.SendAsync("WrongGuess", player!.Name, guess);
      }
    }
    
    // broadcast drawing
    public async Task SendDrawing(Drawing drawing) {
      await Clients.Others.SendAsync("GetDrawing", drawing);
    }

    public async Task StartSession()
    {
      _sessionManager.StartRound();
      var drawer = _sessionManager.GetDrawer();
      var word = _sessionManager.GetWord();

      Console.WriteLine($"drawer is {drawer.Name}, word is {word}");

      // tell drawer
      await Clients.Client(drawer.ConnectionId).SendAsync("StartDrawing", word);

      // tell guessers
      await Clients.AllExcept(drawer.ConnectionId).SendAsync("StartGuessing", word, drawer.Name);
    }
  }
}