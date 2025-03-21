import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as enlightService from '../../services/enlightService';
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';
import styles from './EnlightDetails.module.css';
import Loading from '../Loading/Loading';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';

const EnlightDetails = (props) => {
  const { enlightId } = useParams();
  const { user } = useContext(UserContext);
  const [enlight, setEnlight] = useState(null);


  useEffect(() => {
    const fetchEnlight = async () => {
      const enlightData = await enlightService.show(enlightId);
      setEnlight(enlightData);
    };
    fetchEnlight();
  }, [enlightId]);

  if (!enlight) return <Loading />;

  const handleAddComment = async (commentFormData) => {
    const newComment = await enlightService.createComment(enlightId, commentFormData);
    setEnlight({ ...enlight, comments: [...enlight.comments, newComment] });
  };

  const handleDeleteComment = async (enlightId, commentId) => {
    const deleteComment = await enlightService.deleteComment(enlightId, commentId)
    setEnlight({
      ...enlight,
      comments: enlight.comments.filter((comment) => comment._id !== commentId)

    });
  };

  return (
    <main className={styles.container}>
      <section>
        <header>
          <div>
            <p>
              <header>
                <p>{enlight.category.toUpperCase()}</p>
                <h1>{enlight.title}</h1>
                <div>
                  <AuthorInfo content={enlight} />
                  {enlight.author._id === user._id && (
                    <>
                      <Link to={`/enlights/${enlightId}/edit`}>
                        <Icon category='Edit' />
                      </Link>
                      <button onClick={() => props.handleDeleteEnlight(enlightId)}>
                        <Icon category='Trash' />
                      </button>
                    </>
                  )}
                </div>
              </header>
            </p>
          </div>
        </header>
        <p>{enlight.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!enlight.comments.length && <p>There are no comments.</p>}

        {enlight.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <div>
                  <AuthorInfo content={comment} />
                {comment.author._id === user._id && (
                  <>
                    <Link to={`/enlights/${enlightId}/comments/${comment._id}/edit`}><button><Icon category='Edit' /></button></Link>


                    {comment.author._id === user._id && (
                      <button onClick={() => handleDeleteComment(enlightId, comment._id)}>
                        <Icon category='Trash' />
                      </button>)}
                  </>
                )}
              </div>

            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );


};

export default EnlightDetails;