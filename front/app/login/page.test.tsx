import { render, screen } from '@testing-library/react';
import Login from './page';

describe('Login Page', () => {
  it('renders the login form', () => {
    render(<Login />);

    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });
});
