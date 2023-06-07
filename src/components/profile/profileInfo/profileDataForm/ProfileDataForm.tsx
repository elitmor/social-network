import { useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './profileDataForm.module.css';

interface Contact {
  [key: string]: string;
}

interface ProfileDataFormProps {
  defaultValues: {
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    aboutMe: string;
    contacts: Contact;
  };
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

export const ProfileDataForm: React.FC<ProfileDataFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    try {
      await onSubmit(data);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.messages
      ) {
        setErrorMessages(error.response.data.messages);
      } else {
        setErrorMessages(['An error occurred. Please try again.']);
      }
    }
  };

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={style.formSection}>
        <h4>Full Name</h4>
        <label>
          <input
            placeholder='Full Name'
            {...register('fullName')}
          />
        </label>
      </div>

      <div className={style.formSection}>
        <h4>Job Information</h4>
        <label>
          <input
            type='checkbox'
            {...register('lookingForAJob')}
          />
          Looking for a job
        </label>
        <label>
          <textarea
            placeholder='Job Description'
            {...register('lookingForAJobDescription')}
          />
        </label>
      </div>

      <div className={style.formSection}>
        <h4>About Me</h4>
        <label>
          <input
            placeholder='About Me'
            {...register('aboutMe')}
          />
        </label>
      </div>

      <div className={style.formSection}>
        <h4>Contacts</h4>
        {Object.keys(defaultValues.contacts).map((key) => (
          <div key={key}>
            <label>
              <b>{key}: </b>
              <input
                placeholder={key}
                {...register(`contacts.${key}`)}
              />
            </label>
          </div>
        ))}
      </div>

      {errorMessages.length > 0 && (
        <div className={style.errorMessages}>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}

      <button type='submit'>Save</button>
    </form>
  );
};
