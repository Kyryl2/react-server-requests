import { Field, Form, Formik } from 'formik';

import s from './Posts.module.css';
export const SearchBar = ({ setSearchValue }) => {
  const handleSubmit = values => {
    setSearchValue(values.query);
  };
  return (
    <div className={s.search}>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field placeholder="Enter search value..." className="input" name="query" />
          <button type="submit" className={s.button}>
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};
