import { Link } from 'react-router';
import styles from './EnlightList.module.css';
import Icon from '../Icon/Icon';


const EnlightList = (props) => {
  console.log(props)
  return (
    <main className={styles.container}>
      {props.enlights.map((enlight) => (
        <Link key={enlight._id} to={`/enlights/${enlight._id}`}>
          <article>
            <header>

              <div>
                <h2>{enlight.title}</h2>
                <Icon category={enlight.category} />
              </div>
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