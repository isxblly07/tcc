import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().required('Email ou telefone é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
})

export const registerSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória')
})

export const appointmentSchema = yup.object({
  serviceId: yup.number().required('Selecione um serviço'),
  professionalId: yup.number().required('Selecione um profissional'),
  date: yup.string().required('Selecione uma data'),
  time: yup.string().required('Selecione um horário')
})