import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { resetForm }) => {
        dispatch(login(values));
        resetForm();
      }}
    >
      <Form>
        <div className={css.box}>
          <label className={css.title}>
            Email
            <Field name="email" type="email" />
          </label>
          <label className={css.title}>
            Password
            <Field name="password" type="password" />
          </label>
          <button type="submit" className={css.btn}>
            Log In
          </button>
        </div>
      </Form>
    </Formik>
  );
}
