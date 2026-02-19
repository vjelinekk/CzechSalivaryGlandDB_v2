import { StudyDto } from '../../ipc/dtos/StudyDto'
import { StudyEntity } from '../db-entities/StudyEntity'

export class StudyMapper {
    static toPersistence(dto: StudyDto): StudyEntity {
        return {
            id: dto.id,
            study_name: dto.nazev_studie ?? '',
            study_type: dto.typ_studie ?? 0,
        }
    }

    static toDto(entity: StudyEntity): StudyDto {
        return {
            id: entity.id,
            nazev_studie: entity.study_name,
            typ_studie: entity.study_type,
        }
    }

    static toDtoList(entities: StudyEntity[]): StudyDto[] {
        return entities.map((entity) => StudyMapper.toDto(entity))
    }
}
