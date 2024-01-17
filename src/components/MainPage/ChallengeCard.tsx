import React from 'react'

const ChallengeCard:React.FC<{img: any; name: string}> = ({img, name}) => {
  return (
    <div className="w-60 object-contain flex flex-col items-center">
      <div className="mb-3">
        <img src={img} alt="챌린지 이미지" className="rounded-xl"/>
      </div>
      <div>
        {name}
      </div>

    </div>
  )
}

export default ChallengeCard