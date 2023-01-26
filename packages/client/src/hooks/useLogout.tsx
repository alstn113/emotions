import AuthAPI from '~/api/auth';

const useLogout = async () => {
  try {
    await AuthAPI.logout();
  } catch (error) {}
  window.location.href = '/';
};

export default useLogout;
