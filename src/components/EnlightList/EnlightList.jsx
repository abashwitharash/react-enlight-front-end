import { Link } from 'react-router';
import styles from './EnlightList.module.css';
import Icon from '../Icon/Icon';
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';


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
      

              <p>
        
              </p>
              <AuthorInfo content={enlight} />
            </header>
            <p>{enlight.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default EnlightList;