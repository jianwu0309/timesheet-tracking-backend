import { getRepository } from 'typeorm';
import { ListOfValue } from './../entities/list-of-values';
import { ListOfValues } from '../enum/list-of-value';

export const findByKeyAndId = async (id: number, key: ListOfValues) => {
    return getRepository(ListOfValue).findOne({
        where: {
            id,
            key,
            isActive: true
        }
    });
};

export const findByKey = async (key: ListOfValues) => {
    return getRepository(ListOfValue).find({
        where: {
            key,
            isActive: true
        }
    });
};
