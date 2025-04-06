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
  const [filterQuery, setFilterQuery] = useState<string>(''); // filterQury
  const [todoModal, setTodoModal] = useState<Todo | null>(null); // todoModalId

  useEffect(() => {
    // const loadTodos = async () => {
    //   try {
    //     const data: Todo[] = await getTodos();

    //     if (data) {
    //       setTodos(data);
    //     }
    //   } catch (error) {
    //     console.error('Errors with getting todos:', error);

    //     throw new Error();
    //   }
    // };

    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error();
      });

    // loadTodos();
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

  console.log(todoModal);

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
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              <TodoList
                todos={filteredTodos}
                filterQuery={filterQuery}
                setTodoModal={setTodoModal}
              />
            </div>
          </div>
        </div>
      </div>
      {!!todoModal && (
        <TodoModal todo={todoModal} setTodoModal={setTodoModal} />
      )}
    </>
  );
};
