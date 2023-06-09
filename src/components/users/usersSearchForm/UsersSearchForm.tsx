import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actions, fetchUsers } from '../../../redux/users-reducer';
import { getPageSize } from '../../../redux/users-selectors';

type FormType = {
  term: string;
  friend: 'true' | 'false' | 'null';
};

export const UsersSearchForm: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const pageSize = useSelector(getPageSize);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormType>({
    defaultValues: {
      term: '',
      friend: 'null',
    },
  });

  const submit = async (values: FormType) => {
    const { term, friend } = values;

    dispatch(actions.toggleIsFetchingAC(true));
    dispatch(actions.setCurrentPageAC(1));
    dispatch(actions.setFilterAC({ term, friend }));
    // @ts-ignore
    dispatch(fetchUsers(1, pageSize, { term, friend }));
    dispatch(actions.toggleIsFetchingAC(false));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <input
          type='text'
          {...register('term')}
        />
        <select {...register('friend')}>
          <option value='null'>All</option>
          <option value='true'>Only follow</option>
          <option value='false'>Only unfollow</option>
        </select>
        <button
          type='submit'
          disabled={isSubmitting}
        >
          Find
        </button>
      </form>
    </div>
  );
});
