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
exports.DepartmentsService = void 0;
class DepartmentsService {
    constructor(departmentsRepository, municipalitiesRepository) {
        this.departmentsRepository = departmentsRepository;
        this.municipalitiesRepository = municipalitiesRepository;
    }
    getDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentsRepository.find();
        });
    }
    getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.departmentsRepository.findOneBy({ id });
        });
    }
    getMunicipalities() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.municipalitiesRepository.find({
                relations: ['department']
            });
        });
    }
    getMunicipalityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.municipalitiesRepository.findOne({
                where: { id },
                relations: ['department']
            });
        });
    }
    getMunicipalitiesByDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.municipalitiesRepository.find({
                where: { department: { id: departmentId } },
                relations: ['department']
            });
        });
    }
}
exports.DepartmentsService = DepartmentsService;
