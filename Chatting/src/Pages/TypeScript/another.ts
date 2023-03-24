import axios from "axios";

export function Register(
  name: string,
  lastname: string,
  phoneNumber: string,
  password: string,
  image: File
){
    if(name && lastname && phoneNumber && password && image){
        axios.post(`http://localhost:8080://`)
    }
}
