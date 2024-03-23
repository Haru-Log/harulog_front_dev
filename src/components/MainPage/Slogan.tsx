import { useContext } from 'react';
import achievement from '../../assets/achievement-5597527_640.png';
import { SetModalContext } from '../../App';

const Slogan = () => {
  const setRegisterModal = useContext(SetModalContext)?.setRegisterModal;
  return (
    <div className="flex flex-row w-full max-h-64 items-center mb-28 mt-20">
      <div className="flex flex-col w-[70%] items-center">
        <div className="flex flex-col">
          <div className="text-6xl font-bold mb-5">매일 1%의 성장기록</div>
          <div className="text-2xl mt-5">
            운동과 독서, 기상 인증 등 목표가 무엇이든 HaruLog에는 사람들이
            각자의 성장을 공유합니다.
            <br />
            매일 반복되는 하루, 기록을 통해 성장하는 자신을 발견해보세요.
          </div>
        </div>
        {!localStorage.getItem('AccessToken') && (
          <button
            className="bg-[#92C7CF] w-fit px-5 py-2 text-white rounded-xl mt-10"
            onClick={() => {
              setRegisterModal(true);
            }}
          >
            가입하기
          </button>
        )}
      </div>
      <div className="w-fit h-fit p-5 flex">
        <img
          src={achievement}
          alt="Achievement"
          className="w-full max-w-[40rem] h-fit min-w-60 object-contain"
        />
      </div>
    </div>
  );
};

export default Slogan;
