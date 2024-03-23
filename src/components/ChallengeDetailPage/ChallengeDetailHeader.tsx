import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { leaveChallenge } from '@/api/challenge/LeaveChallenge';
import getDiffInDays from '@/utils/getDiffInDays';
import { useChallengeDetailStore } from '@/zustand/challengeDetailStore';
import { Button } from '@/ui/button';

const ChallengeDetailHeader = () => {
  const challenge = useChallengeDetailStore((state) => state.challenge);
  const status = challenge ? getDiffInDays(challenge) : '';
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLeaveChallenge = async () => {
    try {
      await leaveChallenge(challenge.challengeId);
      alert('Challenge left successfully!');
    } catch (error) {
      console.error('Error leaving challenge:', error);
      alert('Failed to leave challenge. Please try again.');
    }
    setShowConfirmation(false);
    window.location.reload();
  };

  return (
    <div>
      {challenge && (
        <div className="flex justify-between items-end mt-[85px]">
          <div>
            <span className="text-4xl font-black mr-3 whitespace-nowrap">
              {challenge.challengeTitle}
            </span>
            <span className="font-black whitespace-nowrap">{status}</span>
          </div>
          <div className="flex">
            {challenge.participate && (
              <Button
                className="bg-[#FFCCCC] px-3 text-[#FF0000] rounded-md text-xs font-bold hover:bg-[#FFdddd] focus:outline-none focus:ring-4 focus:ring-[#FFdddd] whitespace-nowrap"
                onClick={() => setShowConfirmation(true)}
              >
                챌린지 나가기
              </Button>
            )}
          </div>
        </div>
      )}
      {showConfirmation && (
        <ConfirmationModal
          message="정말 챌린지를 나가시겠습니까?"
          onConfirm={handleLeaveChallenge}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default ChallengeDetailHeader;
