import React from 'react'
import { Container, Alert, Button } from 'react-bootstrap'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Ops! Algo deu errado</Alert.Heading>
            <p>Ocorreu um erro inesperado. Tente recarregar a página.</p>
            <Button 
              variant="outline-danger" 
              onClick={() => window.location.reload()}
            >
              Recarregar Página
            </Button>
          </Alert>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary