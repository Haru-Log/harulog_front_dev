import Cards from '../components/ChallengePage/Cards'
import CreateButton from '../components/CreateButton'
import FilterGroup from '../components/FilterGroup'
import dummyChallengeData from '../types/ChallengeItem.dummy'

const ChallengePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <FilterGroup />
      <CreateButton />
      <Cards data={dummyChallengeData} />
    </div>
  );
};

export default ChallengePage
