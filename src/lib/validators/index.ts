export const confirmPassword = ({ getFieldValue }: { getFieldValue: any }) => ({
  validator(rule: any, value: string) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("Пароли должны совпадать!");
  },
});

export const checkEmail = () => ({
  validator(rule: any, value: string) {
    const isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    );
    if (!value || isEmail) {
      return Promise.resolve();
    }
    return Promise.reject("Введён не корректный email!");
  },
});
