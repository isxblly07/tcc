import React from 'react'
import { Alert, Container, Button } from 'react-bootstrap'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <Alert variant="danger">
            <Alert.Heading>Oops! Algo deu errado</Alert.Heading>
            <p>
              Ocorreu um erro inesperado. Por favor, recarregue a página ou tente novamente mais tarde.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button 
                variant="outline-danger" 
                onClick={() => window.location.reload()}
              >
                Recarregar Página
              </Button>
            </div>
          </Alert>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary