using server.Models;

namespace server.Services
{
	public class SessionManager : ISessionManager
	{
		private readonly Session _session;
		private static readonly Random _rng = new();
		private static readonly string[] _words = { "Cat", "Sun", "Tree", "Car", "House" };

		public SessionManager(Session session)
		{
			_session = session;
		}

		public IEnumerable<Player> GetPlayers()
		{
			return _session.Players.Values;
		}

		public Player? GetPlayer(string connectionId)
		{
			if (_session.Players.TryGetValue(connectionId, out var p))
			{
				return p;
			}
			else
			{
				return null;
			}
		}

		public Player GetDrawer() {
			return _session.Players[_session.DrawerId];
		}

		public string GetWord() {
			return _session.CurrentWord;
		}

		public void AddPlayer(string connectionId, string name) {
			_session.RoundStarted = false; // force reset on every join
			_session.Players[connectionId] = new Player
			{
				ConnectionId = connectionId,
				Name = name,
				Score = 0
			};
		}

		public void RemovePlayer(string connectionId) {
			_session.Players.Remove(connectionId);
			if (_session.Players.Count < 2) {
				_session.RoundStarted = false;
			}
		}

		public bool CanStartRound() {
			return !_session.RoundStarted && _session.Players.Count >= 2;
		}

		public void StartRound()
		{
			if (!CanStartRound())
			{
				throw new InvalidOperationException("Cannot start new round");
			}

			var playerKeys = _session.Players.Keys.ToArray();

			_session.CurrentWord = _words[_rng.Next(_words.Length)];
			_session.DrawerId = playerKeys[_rng.Next(playerKeys.Length)];
			_session.RoundStarted = true;
		}

		public bool CheckGuess(string connectionId, string guess)
		{
			if (guess != _session.CurrentWord) return false;

			var guesser = _session.Players[connectionId];
			guesser.Score += 100;

			var drawer = _session.Players[_session.DrawerId];
			drawer.Score += 50;

			_session.RoundStarted = false; // end round after first correct guess

			return true;
		}
	}
}