export const isAuth = () => {
  try {
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}