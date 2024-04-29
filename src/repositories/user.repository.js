

const Userfactory = require("../dao/userFactory");
const userService = new Userfactory();


class UserRepository {


    async findByEmail(email) {
        try {
            const usuario = await userService.BuscarPorEmail(email);
            return usuario;
        } catch (error) {
            throw new  error("error")
        }
    }

    async RegisterUser(first_name, last_name, email, password, age) {
        try {
            nuevoUsuario = await userService.registrarUsuario(first_name, last_name, email, password, age);
            return nuevoUsuario;
            console.log(nuevoUsuario);
        } catch (error) {
            throw new  error("error")
        }
    }
}

module.exports = UserRepository;