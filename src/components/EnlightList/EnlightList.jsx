import { Link } from 'react-router';
import styles from './EnlightList.module.css';

const EnlightList = (props) => {
  console.log(props)
    return (
        <main className={styles.container}>
          {props.enlights.map((enlight) => (
            <Link key={enlight._id} to={`/enlights/${enlight._id}`}>
              <article>
                <header>
                
                  <h2>{enlight.title}</h2>
                  <p>Category: {enlight.category}</p>
                  <p>{enlight.text}</p>
                  
                  <p>
                    {`${enlight.author.username} posted on
                    ${new Date(enlight.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                
              </article>
            </Link>
          ))}
        </main>
      );
  };
  
  export default EnlightList;