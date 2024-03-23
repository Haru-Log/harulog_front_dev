import { Input } from '../../ui/input';
import { TableCell, TableRow } from '../../ui/table';
import React, { useEffect, useState } from 'react';

const GetUpRow: React.FC<{
  isEdit: boolean;
  category: string;
  userGoal: number;
  updatedAt: Date;
  achievement: number;
  isLastRow: boolean;
  setMyGoal: any;
  myGoal: any;
}> = ({
  isEdit,
  category,
  userGoal,
  updatedAt,
  achievement,
  isLastRow,
  setMyGoal,
  myGoal,
}) => {
  const [hour, setHour] = useState(Math.floor(userGoal / 60));
  const [minute, setMinute] = useState(userGoal % 60);

  useEffect(() => {
    setMyGoal({
      ...myGoal,
      [category]: {
        ...myGoal[category],
        userGoal: 60 * hour + minute,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute]);
  return (
    <TableRow className="text-2xl text-center whitespace-nowrap text-white bg-[#92C7CF88] border-none hover:bg-[#92C7CF88]">
      <TableCell
        className={`font-bold py-6 text-center ${
          isLastRow && 'rounded-bl-2xl'
        } `}
      >
        {category}
      </TableCell>
      <TableCell
        className={`${
          isEdit && 'px-0 pb-0 pt-3 flex items-center h-full whitespace-nowrap'
        }`}
      >
        {isEdit ? (
          <>
            <Input
              type="number"
              value={hour}
              className="border-none shadow-none text-2xl bg-white text-black h-full"
              onChange={(e) => setHour(parseInt(e.target.value))}
            />
            <div className="ml-1 h-full">시</div>
            <Input
              type="number"
              value={minute}
              className="border-none shadow-none text-2xl bg-white text-black h-full ml-3"
              onChange={(e) => setMinute(parseInt(e.target.value))}
            />
            <div className="ml-1 h-full">분</div>
          </>
        ) : category === '기상' ? (
          `${Math.floor(userGoal / 60).toString()}시 ${userGoal % 60}분`
        ) : (
          `${userGoal}분`
        )}
      </TableCell>
      <TableCell>
        {category === '기상' ? `${achievement}일째` : `${achievement}분`}
      </TableCell>
      <TableCell className={`${isLastRow && 'rounded-br-2xl'} px-8`}>
        {updatedAt.toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
};

export default GetUpRow;
