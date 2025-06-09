"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsController = void 0;
const departments_service_1 = require("./departments.service");
const data_source_1 = require("../../core/confi/data-source");
const Departments_1 = require("../../core/entity/Departments");
const Municipalities_1 = require("../../core/entity/Municipalities");
class DepartmentsController {
    constructor() {
        const departmentsRepository = data_source_1.AppDataSource.getRepository(Departments_1.Departments);
        const municipalitiesRepository = data_source_1.AppDataSource.getRepository(Municipalities_1.Municipalities);
        this.departmentsService = new departments_service_1.DepartmentsService(departmentsRepository, municipalitiesRepository);
    }
    getDepartments(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield this.departmentsService.getDepartments();
                res.status(200).json(departments);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getDepartmentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departmentId = parseInt(req.params.id, 10);
                const department = yield this.departmentsService.getDepartmentById(departmentId);
                if (department) {
                    res.status(200).json(department);
                }
                else {
                    res.status(404).json({ message: 'Departamento no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getMunicipalities(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const municipalities = yield this.departmentsService.getMunicipalities();
                res.status(200).json(municipalities);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getMunicipalityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const municipalityId = parseInt(req.params.id, 10);
                const municipality = yield this.departmentsService.getMunicipalityById(municipalityId);
                if (municipality) {
                    res.status(200).json(municipality);
                }
                else {
                    res.status(404).json({ message: 'Municipio no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getMunicipalitiesByDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departmentId = parseInt(req.params.departmentId, 10);
                const municipalities = yield this.departmentsService.getMunicipalitiesByDepartment(departmentId);
                res.status(200).json(municipalities);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.DepartmentsController = DepartmentsController;
