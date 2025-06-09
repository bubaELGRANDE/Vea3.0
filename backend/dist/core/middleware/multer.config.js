"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMulterError = exports.uploadFields = exports.uploadMultiple = exports.uploadSingle = exports.uploadConfig = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de almacenamiento para Multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Directorio donde se guardarán los archivos
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Generar nombre único manteniendo la extensión original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path_1.default.extname(file.originalname);
        const basename = path_1.default.basename(file.originalname, extension);
        // Asegurar que siempre mantenga la extensión original
        const finalExtension = extension || getExtensionFromMimeType(file.mimetype);
        cb(null, `${basename}-${uniqueSuffix}${finalExtension}`);
    }
});
// Función auxiliar para obtener extensión desde MIME type
function getExtensionFromMimeType(mimetype) {
    const mimeToExt = {
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'application/pdf': '.pdf',
        'text/plain': '.txt',
        'application/msword': '.doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
    };
    return mimeToExt[mimetype] || '';
}
// Filtro de archivos para validar tipos permitidos
const fileFilter = (req, file, cb) => {
    // Tipos de archivo permitidos
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Tipo de archivo no permitido'));
    }
};
// Configuración principal de Multer
exports.uploadConfig = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB límite por archivo
        files: 10 // Máximo 10 archivos por request
    }
});
// Middleware específicos para diferentes tipos de upload
exports.uploadSingle = exports.uploadConfig.single('file');
exports.uploadMultiple = exports.uploadConfig.array('files', 10);
exports.uploadFields = exports.uploadConfig.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
]);
// Middleware para manejar errores de Multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer_1.default.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                res.status(400).json({
                    error: 'El archivo es demasiado grande. Tamaño máximo: 10MB'
                });
                return;
            case 'LIMIT_FILE_COUNT':
                res.status(400).json({
                    error: 'Demasiados archivos. Máximo permitido: 10'
                });
                return;
            case 'LIMIT_UNEXPECTED_FILE':
                res.status(400).json({
                    error: 'Campo de archivo inesperado'
                });
                return;
            default:
                res.status(400).json({
                    error: 'Error al procesar el archivo'
                });
                return;
        }
    }
    if (error.message === 'Tipo de archivo no permitido') {
        res.status(400).json({
            error: 'Tipo de archivo no permitido. Solo se permiten: JPG, PNG, GIF, WebP, PDF, TXT, DOC, DOCX'
        });
        return;
    }
    next(error);
};
exports.handleMulterError = handleMulterError;
