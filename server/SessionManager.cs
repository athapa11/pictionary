using System.Collections.Concurrent;
using server.Interfaces;
using server.Models;

namespace server
{
	public class SessionManager : ISessionManager
	{
		private readonly ConcurrentDictionary<string, Session> ActiveSessions = new();

		public Session CreateSession()
    {
			var sessionId = Guid.NewGuid().ToString();
			var session = new Session{ SessionId = sessionId };
			if(ActiveSessions.TryAdd(sessionId, session))
			{
				return session;
			}
			else{
				throw new Exception("On the insane coincidence of a duplicate id");
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


		private string GenerateRandomWord()
		{
			string[] words = { "Cat", "Sun", "Tree", "Car", "House" };
			int randomIndex = new Random().Next(words.Length);
			return words[randomIndex];
    }


		public bool AddPlayerToSession(string sessionId, string playerName, out Player? player)
		{
			if(ActiveSessions.TryGetValue(sessionId, out var session))
			{
				player = new Player
				{
					Id = Guid.NewGuid().ToString(),
					Name = playerName
				};
				session.Players.TryAdd(player.Id, player);
				// session.Scores.TryAdd(player.Id, 0);
				return true;
			}
			else{
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
				return false;
			}
		}


		public void SetDrawer(string sessionId){
			if(ActiveSessions.TryGetValue(sessionId, out var session))
			{
				// randomise drawer and current word
				var randomise = new Random();
				var randomPlayer = session.Players.Values.ElementAt(randomise.Next(session.Players.Count));
				session.DrawerId = randomPlayer.Id;
				session.CurrentWord = GenerateRandomWord();
			}
		}

		public bool UpdateScore(string sessionId, string playerId, int points)
		{
			if(ActiveSessions.TryGetValue(sessionId, out var session)){
				// session.Scores.AddOrUpdate(playerId, points, (_, scoreNow) => scoreNow + points);
				return true;
			}
			else{
				return false;
			}
		}
	}
}