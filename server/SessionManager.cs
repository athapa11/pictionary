using System.Collections.Concurrent;
using server.Interfaces;
using server.Models;

namespace server
{
	public class SessionManager : ISessionManager
	{
		private readonly ConcurrentDictionary<string, Session> ActiveSessions = new();
		private static readonly Random _random = new Random();

		private string GenerateRandomWord()
		{
			string[] words = { "Cat", "Sun", "Tree", "Car", "House" };
			return words[_random.Next(words.Length)];
    }

		public void SetDrawer(string sessionId){
			if(ActiveSessions.TryGetValue(sessionId, out var session) && session.Players.Count > 0)
			{
				// randomise drawer and current word
				var randomPlayer = session.Players.Values.ElementAt(_random.Next(session.Players.Count));
				session.DrawerId = randomPlayer.Id;
				session.CurrentWord = GenerateRandomWord();
			}
		}

		// for signalr logic
		public Session? GetCurrentSessionState(string sessionId)
		{
			ActiveSessions.TryGetValue(sessionId, out var session);
			return session;
		}

		public Session CreateSession(string playerName)
		{
			var sessionId = Guid.NewGuid().ToString();

			var player = new Player
			{
				Id = Guid.NewGuid().ToString(),
				Name = playerName
			};

			var session = new Session
			{
				SessionId = sessionId,
				DrawerId = player.Id,
				CurrentWord = GenerateRandomWord()
			};

			session.Players.TryAdd(player.Id, player);

			if (ActiveSessions.TryAdd(sessionId, session))
			{
				return session;
			}
			else
			{
				throw new Exception("On the insane coincidence of a duplicate session id");
			}
		}
			

		public bool GetSession(string sessionId, out Session? session)
		{
			return ActiveSessions.TryGetValue(sessionId, out session);
		}


		public bool DeleteSession(string sessionId){
			return ActiveSessions.TryRemove(sessionId, out _);
		}

		public bool IsEmptySession(string sessionId)
		{
			if(ActiveSessions.TryGetValue(sessionId, out var session)){
				return session.Players.Count == 0;
			}
			else{
				return false;
			}
		}


		public bool AddPlayerToSession(string sessionId, string playerName, out Player? player, out Session? session)
		{
			session = null;
			if (ActiveSessions.TryGetValue(sessionId, out var foundSession))
			{
				player = new Player
				{
					Id = Guid.NewGuid().ToString(),
					Name = playerName
				};
				foundSession.Players.TryAdd(player.Id, player);
				// session.Scores.TryAdd(player.Id, 0);
				session = foundSession; // to let the method return updated session as well
				return true;
			}
			else
			{
				player = null;
				return false;
			}
		}

		public bool RemovePlayer(string sessionId, string playerId)
		{
			if(ActiveSessions.TryGetValue(sessionId, out var session))
			{
				session.Players.TryRemove(playerId, out _);
				// session.Scores.TryRemove(playerId, out _);

				if(IsEmptySession(sessionId)){
          DeleteSession(sessionId);
        }
				return true; 
			}
			else{
				Console.WriteLine($"RemovePlayer failed: session {sessionId} not found");
				return false;
			}
		}

		// public bool UpdateScore(string sessionId, string playerId, int points)
		// {
		// 	if(ActiveSessions.TryGetValue(sessionId, out var session)){
		// 		// session.Scores.AddOrUpdate(playerId, points, (_, scoreNow) => scoreNow + points);
		// 		return true;
		// 	}
		// 	else{
		// 		return false;
		// 	}
		// }
	}
}