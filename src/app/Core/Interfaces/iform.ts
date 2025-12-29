export interface FormRequest { //formRequestInterface = form.value = formInputs
  username: string;
  password: string;
}

export interface FormResponse { //formResponse = access & refresh tokens
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
