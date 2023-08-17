import { AuthAPI } from '~/lib/api';

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
