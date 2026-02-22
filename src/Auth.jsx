const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(''); // add an error state

  try {
    if (isForgotPassword) {
      await resetPassword(formEmail); // from AuthContext
      setIsResetSent(true);
    } else if (isLogin) {
      await login(formEmail, formPassword);
      navigate(redirectTo, { replace: true });
    } else {
      await register(formEmail, formPassword);
      navigate(redirectTo, { replace: true });
    }
  } catch (err) {
    setError(err.message); // show Firebase error to user
  } finally {
    setIsSubmitting(false);
  }
};