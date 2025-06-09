import { Repository } from 'typeorm';
import { Departments } from '../../core/entity/Departments';
import { Municipalities } from '../../core/entity/Municipalities';


export class DepartmentsService {
    constructor(
        private readonly departmentsRepository: Repository<Departments>,
        private readonly municipalitiesRepository: Repository<Municipalities>
    ) {}


    async getDepartments(): Promise<Departments[]> {
        return this.departmentsRepository.find();
    }

    async getDepartmentById(id: number): Promise<Departments | null> {
        return this.departmentsRepository.findOneBy({ id });
    }
    async getMunicipalities(): Promise<Municipalities[]> {
        return this.municipalitiesRepository.find({
            relations: ['department']
        });
    }

    async getMunicipalityById(id: number): Promise<Municipalities | null> {
        return this.municipalitiesRepository.findOne({
            where: { id },
            relations: ['department']
        });
    }    async getMunicipalitiesByDepartment(departmentId: number): Promise<Municipalities[]> {
        return this.municipalitiesRepository.find({
            where: { department: { id: departmentId } },
            relations: ['department']
        });
    }

}
