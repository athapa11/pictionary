// mock validation at the moment
export const authenticate = (nickname: string) => {
  return nickname.trim() !== '';
}