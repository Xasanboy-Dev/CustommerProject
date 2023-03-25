import axios from "axios";
export async function RegisterAuth(
  name: string,
  lastname: string,
  phoneNumber: string,
  password: string,
  image: any
) {
  if (name && lastname && phoneNumber && password && image) {
    const result = await axios.post(`http://localhost:8080/user/`, {
      name,
      lastname,
      password,
      phoneNumber,
      image,
    });
    return result;
  } else {
    alert("You must to fill all the gaps!");
    return;
  }
}

export async function LoginAuth(phoneNumber: string, password: string) {
  if (password && phoneNumber) {
    const result = await axios.post("http://localhost:8080/user/login", {
      password,
      phoneNumber,
    });
    return result.data.user;
  } else {
    return "Please fill all the gaps!";
  }
}

export async function getTokenValid(token: string) {
  const result = await axios.get(`http://localhost:8080/user/token`, {
    headers: { Authorization: token },
  });
  return result;
}
