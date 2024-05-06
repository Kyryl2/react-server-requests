import { useEffect, useState } from 'react';
import { List } from './List';
import { fetchPosts, fetchPostsByQuery } from '../../services/api';

import { useInView } from 'react-intersection-observer';
import { Loader } from './Loader';
import { SearchBar } from './SearchBar';
import Modal from '../Modal/Modal';
import s from './Posts.module.css';

export const PostsApp = () => {
  const [items, setItems] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [infinity, setInfinity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '0px 30px 30px 0px',
  });
  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { posts, total } = searchValue
          ? await fetchPostsByQuery({ skip, q: searchValue, limit })
          : await fetchPosts({ skip: skip, limit });

        setItems(prev => [...prev, ...posts]);
        setTotal(total);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [searchValue, skip, limit]);

  const handleOpenModal = item => {
    setIsOpen(true);
    setContent(item);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    infinity && setSkip(prev => prev + limit);
  }, [inView, infinity, limit]);

  const handleChangeSkip = () => {
    setSkip(prev => prev + limit);
  };

  const handleSetQuery = query => {
    setSearchValue(query);
    setItems([]);
    setSkip(0);
  };

  return (
    <div>
      <button className={s.button} onClick={() => setInfinity(prev => !prev)}>
        Enable Infinity scroll
      </button>
      <SearchBar setSearchValue={handleSetQuery} />
      <select onChange={e => setLimit(+e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <List items={items} openModal={handleOpenModal} />

      {error && <h2>Something went wrong...</h2>}
      {isLoading && <Loader />}
      {items.length && items.length < total ? (
        <div style={{ visibility: infinity ? 'hidden' : 'visible' }} ref={ref}>
          <button
            style={{ margin: '0 auto', display: 'block' }}
            className={s.button}
            onClick={handleChangeSkip}
          >
            Load more
          </button>
        </div>
      ) : null}

      {isOpen && (
        <Modal onClose={handleCloseModal}>
          <h2>{content.title}</h2>
          <p>{content.body}</p>
          <ul>
            {content.tags.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};
