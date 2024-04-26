import { render, screen, fireEvent } from '@testing-library/react';
import Dispensarization from '../../src/frontend/components/forms/dispensarization';
import { expect } from '@jest/globals';

describe('Dispensarization component', () => {
    const formDataMock = {};
    const setFormDataMock = jest.fn();
    const disabledMock = false;

    test('renders all sections correctly', () => {
        render(
            <Dispensarization
                formData={formDataMock}
                setFormData={setFormDataMock}
                disabled={disabledMock}
            />
        );

        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(5); 
    });

    test('updates form data on date picker change', () => {
        render(
            <Dispensarization
                formData={formDataMock}
                setFormData={setFormDataMock}
                disabled={disabledMock}
            />
        );

        const datePicker = screen.getAllByTestId('date-picker')[0]; // First date picker
        fireEvent.change(datePicker, { target: { value: '2024-04-15' } });
        expect(setFormDataMock).toHaveBeenCalled();
    });

    test('updates form data on conditional checkbox option change', () => {
        render(
            <Dispensarization
                formData={formDataMock}
                setFormData={setFormDataMock}
                disabled={disabledMock}
            />
        );

        const checkboxes = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxes[0]); // First checkbox option
        expect(setFormDataMock).toHaveBeenCalled();
    });

    test('disables inputs when disabled prop is true', () => {
        render(
            <Dispensarization
                formData={formDataMock}
                setFormData={setFormDataMock}
                disabled={true}
            />
        );

        document.querySelectorAll('input').forEach(input => {
            expect(input.disabled).toBeTruthy();
        });
    });
});
