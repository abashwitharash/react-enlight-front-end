import styles from './Loading.module.css'
import LoadingIcon from '../../assets/images/loading2.svg';

const Loading = () => {
  return (
    <main className={styles.container}>
      <img src={LoadingIcon} alt='A cute owl' />
    </main>
  )
}

export default Loading
