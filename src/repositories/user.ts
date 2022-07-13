import { getRepository } from 'typeorm';
import { User } from '../entities/user';

export const authenticate = async (email: string, password: string) => {
    return getRepository(User).findOne({
        where: {
            email,
            password,
            isActive: true
        },
    });
};

export const findById = async (id: number) => {
    return getRepository(User).findOne({
        where: {
            id,
            isActive: true
        }
    });
};

export const findByEmail = async (email: string) => {
    return getRepository(User).findOne({
        where: {
            email,
            isActive: true
        }
    });
};

export const saveUser = async (user: any) => {
    return getRepository(User).save(user);
};

export const deleteUser = async (id: number, email: string) => {
    return getRepository(User).update({ id }, { isActive: false, isDeleted: true, email });
};
