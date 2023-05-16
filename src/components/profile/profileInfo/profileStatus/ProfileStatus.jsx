import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../../../../redux/profile-reducer';

export const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const dispatch = useDispatch();

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value);
    dispatch(updateStatus(e.target.value));
  };

  useEffect(() => {
    if (props.status !== status) {
      setStatus(props.status);
    }
  }, [props.status, status]);

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
