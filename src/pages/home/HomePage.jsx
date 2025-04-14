import css from "./HomePage.module.css";

// const HomePage = () => {
//   return <h1 className={css.title}>Welcome to your Contacts App!</h1>;
// };
const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.contentBox}>
        <h1 className={css.title}>Welcome to your Contacts App!</h1>
        <p className={css.subtitle}>
          Manage your contacts easily and securely 💼📱
        </p>
      </div>
    </div>
  );
};

export default HomePage;
