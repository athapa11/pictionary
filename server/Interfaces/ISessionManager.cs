using server.Models;

namespace server.Interfaces
{
  public interface ISessionManager
  {
    Session CreateSession(string playerName);
    bool GetSession(string sessionId, out Session? session);
    bool DeleteSession(string sessionId);
    bool IsEmptySession(string sessionId);
    bool AddPlayerToSession(string sessionId, string playerName, out Player? player, out Session? session);
    bool RemovePlayer(string sessionId, string playerId);
    void SetDrawer(string sessionId);
  }
}