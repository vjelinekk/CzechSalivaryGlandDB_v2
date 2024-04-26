import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TextInput from '../../src/frontend/components/forms/text-input';

describe('TextInput component', () => {
    test('renders label and input field', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = 'Test Data';
        const setFormDataMock = jest.fn();
        const setFormErrorsMock = jest.fn();
        const validationMock = jest.fn((value) => value.length > 5);
        const disabled = false;

        render(
            <TextInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                setFormErrors={setFormErrorsMock}
                validation={validationMock}
                disabled={disabled}
            />
        );

        const labelElement = screen.getByText(/Test Label/i);
        expect(labelElement).toBeInTheDocument();

        const inputElement = screen.getByDisplayValue(/Test Data/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('calls setFormData and setFormErrors on input change', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = 'Test Data';
        const setFormDataMock = jest.fn();
        const setFormErrorsMock = jest.fn();
        const validationMock = jest.fn((value) => value.length > 5);
        const disabled = false;

        render(
            <TextInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                setFormErrors={setFormErrorsMock}
                validation={validationMock}
                disabled={disabled}
            />
        );

        const inputElement = screen.getByDisplayValue('Test Data');
        fireEvent.change(inputElement, { target: { value: 'New Value' } });

        expect(setFormDataMock).toHaveBeenCalledTimes(1);
        expect(setFormErrorsMock).toHaveBeenCalledTimes(1);
    });

    test('displays error message when validation fails', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = 'Test Data';
        const setFormDataMock = jest.fn();
        const setFormErrorsMock = jest.fn();
        const validationMock = jest.fn((value) => value.length > 5);
        const disabled = false;

        render(
            <TextInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                setFormErrors={setFormErrorsMock}
                validation={validationMock}
                disabled={disabled}
            />
        );

        const inputElement = screen.getByDisplayValue('Test Data');
        fireEvent.change(inputElement, { target: { value: 'New' } });

        const errorMessage = screen.getByText('Neplatný vstup');
        expect(errorMessage).toBeInTheDocument();
    });

    test('does not display error message when validation passes', () => {
        const label = 'Test Label';
        const dbLabel = 'testLabel';
        const data = 'Test Data';
        const setFormDataMock = jest.fn();
        const setFormErrorsMock = jest.fn();
        const validationMock = jest.fn((value) => value.length > 5);
        const disabled = false;

        render(
            <TextInput
                label={label}
                dbLabel={dbLabel}
                data={data}
                setFormData={setFormDataMock}
                setFormErrors={setFormErrorsMock}
                validation={validationMock}
                disabled={disabled}
            />
        );

        const inputElement = screen.getByDisplayValue('Test Data');
        fireEvent.change(inputElement, { target: { value: 'New Value' } });

        const errorMessage = screen.queryByText('Neplatný vstup');
        expect(errorMessage).not.toBeInTheDocument();
    });
});
