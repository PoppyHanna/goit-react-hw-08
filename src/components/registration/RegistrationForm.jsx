import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values, { resetForm }) => {
        dispatch(register(values));
        resetForm();
      }}
    >
      <Form>
        <div className={css.box}>
          <label className={css.title}>
            Name
            <Field name="name" type="text" />
          </label>
          <label className={css.title}>
            Email
            <Field name="email" type="email" />
          </label>
          <label className={css.title}>
            Password
            <Field name="password" type="password" />
          </label>
          <button type="submit" className={css.btn}>
            Register
          </button>
        </div>
      </Form>
    </Formik>
  );
}
