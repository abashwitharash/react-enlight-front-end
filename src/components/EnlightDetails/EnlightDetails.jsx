import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import * as enlightService from '../../services/enlightService';

const EnlightDetails = () => {
    const [enlight, setEnlight] = useState(null);

    const { enlightId } = useParams();
    console.log('enlightId', enlightId);

    useEffect(() => {
        const fetchEnlight = async () => {
          const enlightData = await enlightService.show(enlightId);
          setEnlight(enlightData);
        };
        fetchEnlight();
      }, [enlightId]);
    
      if (!enlight) return <main>Loading...</main>;


      return (
        <main>
          <section>
            <header>
              <p>{enlight.category.toUpperCase()}</p>
              <h1>{enlight.title}</h1>
              <p>
                {`${enlight.author.username} posted on
                ${new Date(enlight.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{enlight.text}</p>
          </section>
          <section>
        <h2>Comments</h2>

        {!enlight.comments.length && <p>There are no comments.</p>}

        {enlight.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
        </main>
      );


  };
  
  export default EnlightDetails;