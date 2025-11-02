import Joi from 'joi';

export const registerValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El correo electrónico debe ser válido',
      'any.required': 'El correo electrónico es obligatorio',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'any.required': 'La contraseña es obligatoria',
    }),
  nombre: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres',
    }),
  apellido: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.min': 'El apellido debe tener al menos 2 caracteres',
      'string.max': 'El apellido no puede exceder 100 caracteres',
    }),
  rol: Joi.string()
    .valid('estudiante', 'profesor', 'admin')
    .optional()
    .messages({
      'any.only': 'El rol debe ser: estudiante, profesor o admin',
    }),
});

export const loginValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El correo electrónico debe ser válido',
      'any.required': 'El correo electrónico es obligatorio',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'La contraseña es obligatoria',
    }),
});
