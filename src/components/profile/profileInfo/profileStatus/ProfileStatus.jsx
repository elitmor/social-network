import { useState } from 'react';

export const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
  };

  return (
    <div>
      {editMode ? (
        <input
          type='text'
          value={props.status}
          onBlur={deactivateEditMode}
          autoFocus={true}
        />
      ) : (
        <div onClick={activateEditMode}>{props.status}</div>
      )}
    </div>
  );
};
