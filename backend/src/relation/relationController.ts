import { validateRelation } from '../../../packages/validator/generate';
import RelationRepository, {
  CreateRelationType,
  RelationProtocol,
  RelationType,
} from './relationRepository';

const relationRepository = new RelationRepository();

export default class RelationController implements RelationProtocol {
  constructor() {}

  async createRelation(
    relation: CreateRelationType
  ): Promise<RelationType | Error> {
    const { isValid, errors } = validateRelation({
      fromId: relation.from.typeId,
      pathId: relation.path.pathTypeId,
      toId: relation.to.typeId,
    });
    if (!isValid) {
      const errorMessages = errors
        .map((i) => {
          return i.getError().message;
        })
        .join('\n');

      const e = new Error(errorMessages);
      return e;
    }

    const result = await relationRepository.createRelation(relation);
    return result;
  }
}
