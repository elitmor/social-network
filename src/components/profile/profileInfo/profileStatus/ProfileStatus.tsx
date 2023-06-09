import { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, updateStatus } from '../../../../redux/profile-reducer';
import { getCurrentStatus } from '../../../../redux/profile-selectors';

type PropsType = {
  userId: number; // Add the userId prop to fetch the status from the server
};

export const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const currentStatus = useSelector(getCurrentStatus);

  useEffect(() => {
    if (currentStatus !== status) {
      setStatus(currentStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getStatus(props.userId));
  }, [dispatch, props.userId]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    if (status !== currentStatus) {
      // @ts-ignore
      dispatch(updateStatus(status));
    }
  };

  const onStatusChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {editMode ? (
        <input
          type='text'
          value={status}
          onBlur={deactivateEditMode}
          autoFocus={true}
          onChange={onStatusChange}
        />
      ) : (
        <div onClick={activateEditMode}>{status || '-------'}</div>
      )}
    </div>
  );
};
