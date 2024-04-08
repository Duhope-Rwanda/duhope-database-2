/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { auth, db } from '../../../firebase';
import { useAuth } from '../core/Auth';
import { setUser, setToken } from '../../../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { UserProps } from '../../../types/app.type';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
});

const initialValues = {
  email: '',
  password: ''
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const [error, setError] = useState('');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user
    }
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,

    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setSubmitting(true);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
          const { user } = userCredential;
          let docRef = await getDoc(doc(db, 'users', user.uid));
          if (docRef.exists()) {
            let userData: UserProps = docRef.data() as UserProps;
            // Update current user and token in the application state
            setCurrentUser(userData);
            saveAuth(userCredential);
            dispatch(setUser(userData));
            dispatch(setToken(await user.getIdToken()));
            setSubmitting(false);

            setLoading(false);
          } else {
            setError('Invalid Credentials');
            setSubmitting(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log('ERROR: ', error);
          setError('Invalid Credentials');
          setSubmitting(false);
          setLoading(false);
        });
    }
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* begin::Heading */}
      <div className="text-center mb-11">
        <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
      </div>

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email
            }
          )}
          type="email"
          name="email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
        <input
          type="password"
          placeholder="Password"
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />

        {/* begin::Link */}
        <Link to="/auth/forgot-password" className="link-primary">
          Forgot Password ?
        </Link>

        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: 'block' }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      {/* <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div> */}
    </form>
  );
}
