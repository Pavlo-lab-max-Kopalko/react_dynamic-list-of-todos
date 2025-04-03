/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [actualFilters, setActualFilters] = useState('All');
  const [filterParam, setFiltrParam] = useState<string>('');
  const [isTodoModal, setIsTodoModal] = useState<number>(0);

  useEffect(() => {
    const todosIsLoad = async () => {
      try {
        const date: Todo[] = await getTodos();

        if (date) {
          setTodos(date);
        }
      } catch (error) {
        console.error('Errors with getting todos:', error);

        throw new Error();
      }
    };

    todosIsLoad();
  }, []);

  const getFilteredTodos = (array: Todo[], filter: string) => {
    switch (filter) {
      case 'All':
        return todos;
      case 'Active':
        return array.filter(todo => !todo.completed);
      case 'Completed':
        return array.filter(todo => todo.completed);
      default:
        return array;
    }
  };

  const filteredTodos = getFilteredTodos(todos, actualFilters);

  // console.log(filteredTodos);
  // console.log(actualFilters);

  console.log(filterParam);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                actualFilters={actualFilters}
                setActualFilters={setActualFilters}
                filterParam={filterParam}
                setFiltrParam={setFiltrParam}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                filterParam={filterParam}
                setIsTodoModal={setIsTodoModal}
              />
            </div>
          </div>
        </div>
      </div>

      {isTodoModal && <TodoModal />}
    </>
  );
};
