import type {NextApiRequest, NextApiResponse} from 'next';
import { UserModel } from '../../models/UserModel';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';
import {connect} from '../../middlewares/connectToMongoDB';


const register = async (req : NextApiRequest, res : NextApiResponse<DefaultMsgResponse>) => {
    try{
        if(req.method === 'POST'){
            const {name, email, password} = req.body;

            if (!name || name.trim().lenght < 2){
                return res.status(400).json({error: 'Nome não é válido'})
            }

            if (!email || email.trim().lenght < 5 || !email.includes('@') || !email.includes('.')){
                return res.status(400).json({error: 'Email não é válido'})
            }

            if (!password || password.trim().lenght < 6){
                return res.status(400).json({error: 'Senha deve ter pelo menos 6 caracteres.'})
            }

            const user = {
                name,
                email,
                password
            };

            await UserModel.create(user);

            return res.status(200).json({msg: 'Sucesso'})
        }

        return res.status(405).json({error: 'Metodo informado nao é permitido'})
    } catch (e) {
        console.log('Erros on create user:', e)
        return res.status(500).json({error: 'Não foi possível cadastrar usuário'})
    }

}

export default connect (register);