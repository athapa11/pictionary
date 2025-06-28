using server.Models;

namespace server.Services
{
	public interface ISessionManager
	{
		void StartRound();
		void AddPlayer(string connectionId, string name);
		void RemovePlayer(string connectionId);
		IEnumerable<Player> GetPlayers();
		Player? GetPlayer(string connectionId);
		Player GetDrawer();
		string GetWord();
		bool CheckGuess(string connectionId, string guess);
		bool CanStartRound();
	}
}