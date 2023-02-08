import AuthAPI from '~/lib/api/auth';

const useLogout = () => {
  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      /* empty */
    }
    window.location.href = '/';
  };

  return logout;
};

export default useLogout;
