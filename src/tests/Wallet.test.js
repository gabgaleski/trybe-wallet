import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente wallet e suas funcionalidades', () => {
  it('Testa as funcionalidades do componente wallet', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const getValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });

    const getDescribe = screen.getByRole('textbox', {
      name: /descrição:/i,
    });

    const getButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(getValue, '10');
    userEvent.type(getDescribe, 'chocolate');
    userEvent.click(getButton);

    const getButtonEdit = await screen.findByRole('button', {
      name: /editar/i,
    });

    const getButtonDelet = await screen.findByRole('button', {
      name: /excluir/i,
    });

    userEvent.click(getButtonEdit);

    const editExpenses = screen.getByRole('button', {
      name: /editar despesa/i,
    });

    expect(editExpenses).toBeInTheDocument();

    userEvent.type(getValue, '20');
    userEvent.type(getDescribe, 'café');
    userEvent.click(editExpenses);

    expect(screen.getByRole('cell', {
      name: /café/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('cell', {
      name: /alimentação/i,
    })).toBeInTheDocument();

    userEvent.click(getButtonDelet);
  });
});
