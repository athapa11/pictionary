// mock validation at the moment
export const validate = (nickname: string) => {
  return nickname.trim() !== '';
};