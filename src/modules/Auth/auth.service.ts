import bcrypt from 'bcryptjs';
import { pool } from '../../db/db';
import type IUser from './auth.interface';
import jwt from 'jsonwebtoken';
import configuration from '../../config';


const createUserDb = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPwd = await bcrypt.hash(password,10);
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, role) 
    VALUES($1, $2, $3, $4) 
    RETURNING *;
    `,
    [name, email, hashedPwd, role || 'contributor'],
  );

  if (result.rows[0]) {
    delete result.rows[0].password;
  }

  return result;
};

const loginUserDb = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const findUserByEmail = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (findUserByEmail.rows.length === 0) {
    throw new Error('Invalid Credentials!!');
  }
  const user = findUserByEmail.rows[0];

  const matchPwd = bcrypt.compare(password, user.password);

  if (!matchPwd) {
    throw new Error('Invalid Credentials!!');
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, configuration.JWT_SECRET as string, {
    expiresIn: '1d',
  });

  

  return {
    accessToken
  }
};



const authServices = {
  createUserDb,
  loginUserDb,
};
export default authServices;
