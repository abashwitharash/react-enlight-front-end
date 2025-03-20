import { useParams, Link } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import * as enlightService from '../../services/enlightService';
import CommentForm from '../CommentForm/CommentForm';
import { UserContext } from '../../contexts/UserContext';

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

  if (!enlight) return <main>Loading...</main>;

  const handleAddComment = async (commentFormData) => {
    const newComment = await enlightService.createComment(enlightId, commentFormData);
    setEnlight({ ...enlight, comments: [...enlight.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    console.log('commentId:', commentId);
    enlightService.deleteComment([ enlightId, commentId ]);
    setEnlight({
      ...enlight,
      comments: enlight.comments.filter((comment) => comment._id !== commentId),
    });
  };


  return (
    <main>
      <section>
        <header>
          <p>{enlight.category}</p>
          <h1>{enlight.title}</h1>
          <p>
            {`${enlight.author.username} posted on
                ${new Date(enlight.createdAt).toLocaleDateString()}`}
          </p>
          {enlight.author._id === user._id && (
              <>
                 <button ><Link to={`/enlights/${enlightId}/edit`}>Edit</Link> </button>
                 <button onClick={() => props.handleDeleteEnlight(enlightId)}>
              Delete
            </button>
          </>
        )}
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
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
              <Link to={`/enlights/${enlightId}/comments/${commentId}/edit`}>Update</Link>

            <button onClick={() => props.handleDeleteComment(commentId)}>
              Delete Comment
            </button>

            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );


};

export default EnlightDetails;