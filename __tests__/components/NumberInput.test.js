import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NumberInput from '../../src/frontend/components/forms/number-input';
import { act } from 'react-dom/test-utils';

describe('NumberInput component', () => {
    test('renders label and input field', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = '123';
        const setFormDataMock = jest.fn();
        
        render(
            <NumberInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
            />
        );

        const labelElement = screen.getByText(/test label/i); // Case-insensitive matcher
        expect(labelElement).toBeInTheDocument();

        const inputElement = screen.getByDisplayValue('123'); // Exact text
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'number');
    });


    test('handles input change', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = '123';
        const setFormDataMock = jest.fn();
        
        render(
            <NumberInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
            />
        );

        const inputElement = screen.getByDisplayValue(data);
        fireEvent.change(inputElement, { target: { value: '456' } });

        expect(setFormDataMock).toHaveBeenCalledWith(expect.any(Function));
    });

    test('handles empty input value', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = '123';
        const setFormDataMock = jest.fn();
        
        render(
            <NumberInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
            />
        );

        const inputElement = screen.getByDisplayValue(data);
        fireEvent.change(inputElement, { target: { value: '' } });

        expect(setFormDataMock).toHaveBeenCalledWith(expect.any(Function));
    });

    test('calculates value from provided function', async () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const calculateMock = jest.fn(() => 456);
        const setFormDataMock = jest.fn();
        const formData = { [dbLabel]: 123 };
        
        render(
            <NumberInput
                label={label}
                dbLabel={dbLabel}
                calculate={calculateMock}
                calculateFrom={[dbLabel]}
                formData={formData}
                setFormData={setFormDataMock}
            />
        );

        const inputElement = screen.getByDisplayValue(/456/); // Exact text

        await act(async () => {
            fireEvent.change(inputElement, { target: { value: 10 } });
        });

        expect(calculateMock).toHaveBeenCalled();
        expect(setFormDataMock).toHaveBeenCalledWith(expect.any(Function));
    });
});
