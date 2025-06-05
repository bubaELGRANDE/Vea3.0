import { Request, Response } from 'express';
import { DepartmentsService } from './departments.service';
import { AppDataSource } from '../../core/confi/data-source';
import { Departments } from '../../core/entity/Departments';
import { Municipalities } from '../../core/entity/Municipalities';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class DepartmentsController {
    private readonly departmentsService: DepartmentsService;

    constructor() {
        const departmentsRepository = AppDataSource.getRepository(Departments);
        const municipalitiesRepository = AppDataSource.getRepository(Municipalities);
        
        this.departmentsService = new DepartmentsService(
            departmentsRepository,
            municipalitiesRepository
        );
    }


    async getDepartments(res: Response): Promise<void> {
        try {
            const departments = await this.departmentsService.getDepartments();
            res.status(200).json(departments);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getDepartmentById(req: Request, res: Response): Promise<void> {
        try {
            const departmentId = parseInt(req.params.id, 10);
            const department = await this.departmentsService.getDepartmentById(departmentId);
            if (department) {
                res.status(200).json(department);
            } else {
                res.status(404).json({ message: 'Departamento no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }



    async getMunicipalities(res: Response): Promise<void> {
        try {
            const municipalities = await this.departmentsService.getMunicipalities();
            res.status(200).json(municipalities);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMunicipalityById(req: Request, res: Response): Promise<void> {
        try {
            const municipalityId = parseInt(req.params.id, 10);
            const municipality = await this.departmentsService.getMunicipalityById(municipalityId);
            if (municipality) {
                res.status(200).json(municipality);
            } else {
                res.status(404).json({ message: 'Municipio no encontrado' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMunicipalitiesByDepartment(req: Request, res: Response): Promise<void> {
        try {
            const departmentId = parseInt(req.params.departmentId, 10);
            const municipalities = await this.departmentsService.getMunicipalitiesByDepartment(departmentId);
            res.status(200).json(municipalities);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}
