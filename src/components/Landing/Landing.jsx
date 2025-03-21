import styles from './Landing.module.css';
import Estars from '../../assets/images/Estars.svg';
import EnlightLogo from '../../assets/images/EnlightLogo.svg';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.splash}>
          <img src={EnlightLogo} alt='A cute owl' />
        </section>

        <section className={styles.about}>
          <header>
            <h3>WHO WE ARE</h3>
            <h1>ABOUT US</h1>
          </header>
          <article>
            <p>
            Welcome to The Enlight — a space built for healthy minds and real connections.
            We created this app for people who are into personal growth and good vibes.
            Whether you're passionate about sports, navigating relationships, 
            building your career, traveling the world, or leveling up your fitness,
            this is your place to talk about it all.
            The Enlight is where real conversations happen.
            No drama, no noise — just a community of people who want to connect, learn, and grow together.
            Let’s get better, together.
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h1>Why People Love The Enlight:</h1>
          </header>
          <article>
          <header>
  <h4>Jasmine Reyes</h4>
  <p>Wellness Coach</p>
</header>
<p>
  I stumbled upon The Enlight while looking for a place to connect with like-minded people, and it’s honestly been a game changer. The topics around fitness, travel, and self-growth are exactly what I needed. It feels like a breath of fresh air compared to other social apps — real conversations, real people.
</p>

            <footer>
              <img src={Estars} alt='Four blue stars' />
            </footer>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        © <a className={styles.names} href='www.google.com' target='_blank' >Mica Cohen-Fuentes </a>
        <a className={styles.names} href='www.google.com' target='_blank' >Kaya </a>
        <a className={styles.names} href='www.google.com' target='_blank' >Arash </a>
        <a className={styles.names} href='www.google.com' target='_blank' >Kiera</a>
      </footer>
    </>
  );
};

export default Landing;
