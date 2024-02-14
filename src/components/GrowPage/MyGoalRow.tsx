import { Input } from "../../ui/input";
import { TableCell, TableRow } from "../../ui/table";
import React from 'react'

const MyGoalRow: React.FC<{
  isEdit: boolean;
  category: string;
  userGoal: number;
  updatedAt: Date
  achievement: number;
  isLastRow: boolean;
  setMyGoal: any;
  myGoal: any
}> = ({ isEdit, category, userGoal, updatedAt, achievement, isLastRow, setMyGoal, myGoal }) => {



  return (
    <TableRow className='text-2xl text-center whitespace-nowrap text-white bg-[#92C7CF88] border-none hover:bg-[#92C7CF88]'>
      <TableCell className={`font-bold py-6 text-center ${(isLastRow) && 'rounded-bl-2xl'} `}>{category}</TableCell>
      <TableCell className={`${isEdit && 'px-0 pb-0 pt-3 flex items-center h-full whitespace-nowrap'}`}>
        {isEdit ?
          <>
            <Input type="number" value={userGoal} className="border-none shadow-none text-2xl bg-white text-black h-full"
              onChange={(e) => {
                setMyGoal(
                  {
                    ...myGoal,
                    [category]:{
                      ...myGoal[category],
                      goal: parseInt(e.target.value)
                    }
                  }
                )
              }}
            />
            <div className="ml-3 h-full">분</div>
          </>
          : category === '기상' ? `${Math.floor(userGoal / 60).toString()}시 ${userGoal % 60}분` : `${userGoal}분`
        }
      </TableCell>
      <TableCell>{
        category === '기상' ? `${achievement}일째` : `${achievement}분`
      }</TableCell>
      <TableCell className={`${isLastRow && "rounded-br-2xl"} px-8`}>{updatedAt.toLocaleDateString()}</TableCell>
    </TableRow>
  )
}

export default MyGoalRow