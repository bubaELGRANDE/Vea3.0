import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { uploadSingle, uploadMultiple, handleMulterError } from '../../core/middleware/multer.config';

export const uploadRoutes = express.Router();

// Middleware para manejar errores de Multer
uploadRoutes.use(handleMulterError);

// Ruta para subir un archivo único
uploadRoutes.post('/upload', uploadSingle, (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'No se ha subido ningún archivo'
      });
      return;
    }    res.status(200).json({
      success: true,
      message: 'Archivo subido exitosamente',
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        extension: path.extname(req.file.originalname),
        path: req.file.path,
        url: `/api/files/${req.file.filename}`,
        downloadUrl: `/api/files/${req.file.filename}/download`
      }
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al subir el archivo'
    });
  }
});

// Ruta para subir múltiples archivos
uploadRoutes.post('/upload-multiple', uploadMultiple, (req: Request, res: Response): void => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      res.status(400).json({
        success: false,
        message: 'No se han subido archivos'
      });
      return;
    }    const filesInfo = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      extension: path.extname(file.originalname),
      path: file.path,
      url: `/api/files/${file.filename}`,
      downloadUrl: `/api/files/${file.filename}/download`
    }));

    res.status(200).json({
      success: true,
      message: `${req.files.length} archivo(s) subido(s) exitosamente`,
      data: {
        count: req.files.length,
        files: filesInfo
      }
    });
  } catch (error) {
    console.error('Error al subir archivos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al subir los archivos'
    });
  }
});

// Ruta para obtener/descargar un archivo
uploadRoutes.get('/files/:filename', (req: Request, res: Response): void => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
      return;
    }

    // Obtener información del archivo
    const stats = fs.statSync(filePath);
    const extension = path.extname(filename).toLowerCase();
    
    // Determinar el tipo MIME basado en la extensión
    const mimeType = getMimeTypeFromExtension(extension);
    
    // Establecer headers apropiados
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    
    // Para imágenes, permitir visualización directa
    if (mimeType.startsWith('image/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 año
    }
    
    // Enviar el archivo
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error al obtener archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener el archivo'
    });
  }
});

// Función auxiliar para obtener MIME type desde extensión
function getMimeTypeFromExtension(extension: string): string {
  const extToMime: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };  return extToMime[extension] || 'application/octet-stream';
}

// Función para validar la integridad del archivo
function validateFileIntegrity(filePath: string, originalMimeType: string): boolean {
  try {
    const extension = path.extname(filePath).toLowerCase();
    const expectedMimeType = getMimeTypeFromExtension(extension);
    
    // Verificar que el MIME type coincida con la extensión
    return expectedMimeType === originalMimeType || originalMimeType === 'application/octet-stream';
  } catch (error) {
    return false;
  }
}

// Ruta para verificar la integridad de un archivo
uploadRoutes.get('/files/:filename/verify', (req: Request, res: Response): void => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
      return;
    }

    const extension = path.extname(filename).toLowerCase();
    const expectedMimeType = getMimeTypeFromExtension(extension);
    const stats = fs.statSync(filePath);

    res.status(200).json({
      success: true,
      data: {
        filename: filename,
        exists: true,
        readable: fs.constants.R_OK,
        size: stats.size,
        extension: extension,
        expectedMimeType: expectedMimeType,
        isValid: validateFileIntegrity(filePath, expectedMimeType),
        lastModified: stats.mtime
      }
    });
  } catch (error) {
    console.error('Error al verificar archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al verificar el archivo'
    });
  }
});

// Ruta para forzar descarga de un archivo
uploadRoutes.get('/files/:filename/download', (req: Request, res: Response): void => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
      return;
    }

    // Obtener información del archivo
    const stats = fs.statSync(filePath);
    const extension = path.extname(filename).toLowerCase();
    const mimeType = getMimeTypeFromExtension(extension);
    
    // Establecer headers para forzar descarga
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Enviar el archivo
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error al descargar archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al descargar el archivo'
    });
  }
});

// Ruta para obtener información de un archivo sin descargarlo
uploadRoutes.get('/files/:filename/info', (req: Request, res: Response): void => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
      return;
    }

    // Obtener información del archivo
    const stats = fs.statSync(filePath);
    const extension = path.extname(filename);    res.status(200).json({
      success: true,
      data: {
        filename: filename,
        size: stats.size,
        extension: extension,
        mimetype: getMimeTypeFromExtension(extension),
        created: stats.birthtime,
        modified: stats.mtime,
        isFile: stats.isFile(),
        url: `/api/files/${filename}`,
        downloadUrl: `/api/files/${filename}/download`
      }
    });
  } catch (error) {
    console.error('Error al obtener información del archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener información del archivo'
    });
  }
});

// Ruta para eliminar un archivo
uploadRoutes.delete('/files/:filename', (req: Request, res: Response): void => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
      return;
    }

    // Eliminar el archivo
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: 'Archivo eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al eliminar el archivo'
    });
  }
});

// Ruta para listar todos los archivos
uploadRoutes.get('/files', (req: Request, res: Response): void => {
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    
    // Verificar si el directorio existe
    if (!fs.existsSync(uploadsDir)) {
      res.status(200).json({
        success: true,
        data: {
          count: 0,
          files: []
        }
      });
      return;
    }

    // Leer archivos del directorio
    const files = fs.readdirSync(uploadsDir);
    const filesInfo = files
      .filter(file => {
        const filePath = path.join(uploadsDir, file);
        return fs.statSync(filePath).isFile();
      })
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);        return {
          filename: file,
          size: stats.size,
          extension: path.extname(file),
          mimetype: getMimeTypeFromExtension(path.extname(file).toLowerCase()),
          created: stats.birthtime,
          modified: stats.mtime,
          url: `/api/files/${file}`,
          downloadUrl: `/api/files/${file}/download`
        };
      });

    res.status(200).json({
      success: true,
      data: {
        count: filesInfo.length,
        files: filesInfo
      }
    });
  } catch (error) {
    console.error('Error al listar archivos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al listar archivos'
    });
  }
});
