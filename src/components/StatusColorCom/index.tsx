/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { useEffect, useState } from 'react';

interface Types {
  statusDesc: string | undefined;
  status: number | undefined;
}
// status color
const StatusColorCom: React.FC<Types> = ({ status, statusDesc }) => {
  const [tagColor, setTagColor] = useState<string>('#000');

  useEffect(() => {
    switch (status as number) {
      case -1:
        setTagColor('#000');
        break;
      case 0:
        setTagColor('#3d66e4');
        break;
      case 20:
        setTagColor('#3d66e4');
        break;
      case 30:
        setTagColor('#3d66e4');
        break;
      case 40:
        setTagColor('#2db7f5');
        break;
      case 45:
        setTagColor('#87d068');
        break;
      case 50:
        setTagColor('#87d068');
        break;
    }
  }, [status]);

  return <span style={{ color: tagColor }}> {statusDesc || ''} </span>;
};

export default StatusColorCom;
