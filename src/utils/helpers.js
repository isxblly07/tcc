export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const formatTime = (time) => {
  return time
}

export const formatPhone = (phone) => {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export const getStatusColor = (status) => {
  const colors = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'danger',
    completed: 'info'
  }
  return colors[status] || 'secondary'
}

export const getStatusText = (status) => {
  const texts = {
    confirmed: 'Confirmado',
    pending: 'Pendente',
    cancelled: 'Cancelado',
    completed: 'Concluído'
  }
  return texts[status] || status
}