import { ChangeEventHandler, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../../redux/profile-reducer';

type PropsType = {
  status: string;
};

export const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const dispatch = useDispatch();

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    if (status !== props.status) {
      // @ts-ignore
      dispatch(updateStatus(status));
    }
  };

  const onStatusChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatus(e.currentTarget.value);
  };

  useEffect(() => {
    if (props.status !== status) {
      setStatus(props.status);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.status]);

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
