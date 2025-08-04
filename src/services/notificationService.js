import api from './api'

export const notificationService = {
  async sendEmailNotification(data) {
    try {
      const notification = {
        id: Date.now(),
        type: 'email',
        recipient: data.email,
        subject: data.subject,
        message: data.message,
        status: 'sent',
        sentAt: new Date().toISOString()
      }

      // Simular envio de email
      console.log('Email enviado:', notification)
      
      const { data: result } = await api.post('/notifications', notification)
      return result
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      throw new Error('Erro ao enviar notificação por email')
    }
  },

  async sendSMSNotification(data) {
    try {
      const notification = {
        id: Date.now(),
        type: 'sms',
        recipient: data.phone,
        message: data.message,
        status: 'sent',
        sentAt: new Date().toISOString()
      }

      // Simular envio de SMS
      console.log('SMS enviado:', notification)
      
      const { data: result } = await api.post('/notifications', notification)
      return result
    } catch (error) {
      console.error('Erro ao enviar SMS:', error)
      throw new Error('Erro ao enviar notificação por SMS')
    }
  },

  async scheduleReminder(appointmentId, reminderTime) {
    try {
      const reminder = {
        id: Date.now(),
        appointmentId,
        reminderTime,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      }

      const { data } = await api.post('/reminders', reminder)
      return data
    } catch (error) {
      console.error('Erro ao agendar lembrete:', error)
      throw new Error('Erro ao agendar lembrete')
    }
  },

  async sendAppointmentConfirmation(appointment, user, service) {
    const emailData = {
      email: user.email,
      subject: 'Confirmação de Agendamento - TimeRight',
      message: `
        Olá ${user.name},
        
        Seu agendamento foi confirmado com sucesso!
        
        Detalhes:
        • Serviço: ${service.name}
        • Data: ${new Date(appointment.date).toLocaleDateString('pt-BR')}
        • Horário: ${appointment.time}
        • Valor: R$ ${service.price.toFixed(2)}
        
        Obrigado por escolher a TimeRight!
      `
    }

    const smsData = {
      phone: user.phone,
      message: `TimeRight: Agendamento confirmado para ${new Date(appointment.date).toLocaleDateString('pt-BR')} às ${appointment.time}. ${service.name} - R$ ${service.price.toFixed(2)}`
    }

    await Promise.all([
      this.sendEmailNotification(emailData),
      this.sendSMSNotification(smsData)
    ])
  },

  async sendAppointmentReminder(appointment, user, service) {
    const emailData = {
      email: user.email,
      subject: 'Lembrete de Agendamento - TimeRight',
      message: `
        Olá ${user.name},
        
        Lembramos que você tem um agendamento amanhã:
        
        • Serviço: ${service.name}
        • Data: ${new Date(appointment.date).toLocaleDateString('pt-BR')}
        • Horário: ${appointment.time}
        
        Nos vemos em breve!
      `
    }

    const smsData = {
      phone: user.phone,
      message: `TimeRight: Lembrete! Você tem agendamento amanhã às ${appointment.time} - ${service.name}`
    }

    await Promise.all([
      this.sendEmailNotification(emailData),
      this.sendSMSNotification(smsData)
    ])
  }
}