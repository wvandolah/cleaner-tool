import React from 'react';
import { Houses } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import { createMemoryHistory } from 'history';
import 'jest';
import { waitForElement, cleanup } from 'react-testing-library';

const mockdata = [
  {
    address: '123 go duck yourself ave',
    ast_guide: null,
    cleaning_fee: '65.00',
    created_at: '2019-01-11T21:48:05.233Z',
    default_ast: 1,
    extra_guest_fee: '30.00',
    guest_guide: null,
    id: 1,
    manager: 1,
    name: 'house name 1',
    price: '450.50',
  },
  {
    address: '123 go duck yourself st',
    ast_guide: null,
    cleaning_fee: '65.00',
    created_at: '2019-01-11T21:48:05.233Z',
    default_ast: 1,
    extra_guest_fee: '30.00',
    guest_guide: null,
    id: 2,
    manager: 1,
    name: 'house name 2',
    price: '450.50',
  },
  {
    address: '123 go duck yourself ln',
    ast_guide: null,
    cleaning_fee: '65.00',
    created_at: '2019-01-11T21:48:05.233Z',
    default_ast: 1,
    extra_guest_fee: '30.00',
    guest_guide: null,
    id: 3,
    manager: 1,
    name: 'house name 3',
    price: '450.50',
  },
];

jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: mockdata,
      }),
    ),
  };
});
afterEach(cleanup);

describe('Houses dashboard', () => {
  test('should render a house card for every house received through axios call', async () => {
    const { getAllByTestId } = renderWithRouter(
      // @ts-ignore
      <Houses />,
      {},
    );
    const houseCards = await waitForElement(() => getAllByTestId('house-item'));
    expect(houseCards.length).toBe(mockdata.length);
  });
  test('should include 2 buttons for every house card,', async () => {
    const { getAllByTestId } = renderWithRouter(
      // @ts-ignore
      <Houses />,
      {},
    );

    const buttons = await waitForElement(() => getAllByTestId('house-button'));
    expect(buttons.length).toBe(mockdata.length * 2);
  });
  test('should include 1 button "Edit Checklists" for every house card', async () => {
    // @ts-ignore
    const { getAllByText } = renderWithRouter(<Houses />, {});

    const buttons = await waitForElement(() =>
      getAllByText(/edit checklists/i),
    );
    expect(buttons.length).toBe(mockdata.length);
  });
  test('should include 1 button "Edit Resources" for every house card', async () => {
    // @ts-ignore
    const { getAllByText } = renderWithRouter(<Houses />, {});

    const buttons = await waitForElement(() => getAllByText(/edit resources/i));
    expect(buttons.length).toBe(mockdata.length);
  });
});
