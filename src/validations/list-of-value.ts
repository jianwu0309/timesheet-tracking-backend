import * as boom from '@hapi/boom';
import * as lovRepo from '../repositories/list-of-value';
import { ListOfValues } from '../enum/list-of-value';

export const throwErrorIfListOfValueNotExist = async (id: number, key: ListOfValues) => {
    const lov = await lovRepo.findByKeyAndId(id, key);
    if (!lov) {
        throw boom.badRequest('LOV not exists');
    }
    return lov;
};
