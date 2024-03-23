import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame } from 'lucide-react';
import MainChallengeImg from './MainChallengeImg';
import { fetchChallengeMain } from '@/api/challenge/FetchChallengeMain';
import { useChallengeAllStore } from '@/zustand/challengeAllStore';

const MainChallengeCard = () => {
  const fetchChallenges = useChallengeAllStore((state) => state.setChallenge);

  useEffect(() => {
    const fetchChallengesData = async () => {
      try {
        const response = await fetchChallengeMain();
        fetchChallenges(response.data);
      } catch (error) {}
    };
    fetchChallengesData();
  }, [fetchChallenges]);

  const challenge = useChallengeAllStore((state) => state.challenge);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-0">
      {challenge?.map((challenge) => (
        <div
          key={challenge.challengeId}
          className="cursor-pointer transform transition-transform hover:scale-110 drop-shadow-xl"
          onClick={() => navigate(`/challenge/${challenge.challengeId}`)}
        >
          <div className="min-w-72 min-h-72 w-[90%] h-[90%] aspect-square rounded-xl">
            <MainChallengeImg
              key={challenge.imageUrl}
              imageUrl={challenge.imageUrl}
            />
            <div
              className={`absolute top-0 right-[10%] text-white text-xs font-bold px-3 py-1 mr-2 mt-2 rounded-lg bg-${challenge.categoryName}`}
            >
              {challenge.categoryName}
            </div>
            <div className="absolute bottom-[10%] left-0 right-0 p-3 pt-9 bg-gradient-to-b from-transparent to-slate-800 rounded-b-xl w-[90%]">
              <span className="text-white text-lg font-semibold whitespace-nowrap">
                {challenge.challengeTitle}
              </span>
              <div className="flex flex-col items-center absolute bottom-0 right-0 pb-3 pr-3">
                <Flame color="white" strokeWidth={4} />
                <span className="text-white text-xs mt-1 font-semibold">
                  {challenge.challengeUserCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainChallengeCard;
