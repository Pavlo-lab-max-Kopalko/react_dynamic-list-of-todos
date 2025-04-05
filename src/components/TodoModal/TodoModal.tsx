import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';

interface MyComponentProps {
  userId: number;
}

export const TodoModal: React.FC<MyComponentProps> = ({ userId }) => {
  const [user, setUsers] = useState<User | null>(null);

  useEffect(() => {
    const usersIsLoad = async () => {
      try {
        const date: User = await getUser(userId);

        console.log(date);

        if (date) {
          setUsers(date);
        }
      } catch (error) {
        console.error('Errors with getting todos:', error);

        throw new Error();
      }
    };

    usersIsLoad();
  }, [userId]);

  console.log(user);
  console.log(userId);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #2
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setUsers(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              quis ut nam facilis et officia qui
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">Leanne Graham</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
