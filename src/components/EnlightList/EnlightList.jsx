import { Link } from 'react-router';

const EnlightList = (props) => {
    return (
        <main>
          {props.enlights.map((enlight) => (
            <Link key={enlight._id} to={`/enlights/${enlight._id}`}>
              <article>
                <header>
                  <h2>{enlight.title}</h2>
                  <p>
                    {`${enlight.author.username} posted on
                    ${new Date(enlight.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{enlight.text}</p>
              </article>
            </Link>
          ))}
        </main>
      );
  };
  
  export default EnlightList;