
import { fetchMatches } from '@/services/firestore';
import { useEffect, useState } from 'react';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  stadium: string;
  date: string;
  competition: string;
  played: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const NextMatchCountdown = () => {
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const loadNextMatch = async () => {
      try {
        const matches = await fetchMatches();
        const upcomingMatch = matches
          .filter((m: Match) => !m.played)
          .sort((a: Match, b: Match) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
        
        if (upcomingMatch) {
          setNextMatch(upcomingMatch as Match);
        } else {
          setNextMatch(null);
        }
      } catch (error) {
        console.error('Error loading next match:', error);
        setNextMatch(null);
      }
    };

    loadNextMatch();
  }, []);

  useEffect(() => {
    if (!nextMatch) return;

    const calculateTimeLeft = () => {
      const matchDate = new Date(nextMatch.date);
      const difference = matchDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [nextMatch]);

  if (!nextMatch) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="bg-gradient-to-r from-xilo-blue to-xilo-purple text-white py-3 md:py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 text-center md:text-left">
            <h3 className="text-lg md:text-xl font-bold">
              Próximo partido - {nextMatch.competition}
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mt-2">
              <div className="flex items-center">
                <img src={nextMatch.homeTeamLogo} alt={nextMatch.homeTeam} className="h-8 md:h-10 w-auto mr-2" />
                <span className="font-semibold">{nextMatch.homeTeam}</span>
              </div>
              <span className="mx-2 font-bold">VS</span>
              <div className="flex items-center">
                <img src={nextMatch.awayTeamLogo} alt={nextMatch.awayTeam} className="h-8 md:h-10 w-auto mr-2" />
                <span className="font-semibold">{nextMatch.awayTeam}</span>
              </div>
            </div>
            <p className="text-sm md:text-base mt-1">{formatDate(nextMatch.date)} - {nextMatch.stadium}</p>
          </div>

          <div className="md:col-span-7 grid grid-cols-4 gap-2 text-center">
            {['Días', 'Horas', 'Minutos', 'Segundos'].map((label, i) => (
              <div key={label} className="bg-white/20 backdrop-blur-sm rounded-md p-2">
                <div className="text-xl md:text-3xl font-bold">
                  {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][i]}
                </div>
                <div className="text-xs md:text-sm text-white/80">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextMatchCountdown;
