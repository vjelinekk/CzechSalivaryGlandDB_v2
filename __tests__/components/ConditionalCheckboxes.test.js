import React from 'react'
import { render, act } from '@testing-library/react'
import ConditionalCheckboxes from '../../src/frontend/components/forms/conditional-checkboxes'
import ConditionalCheckboxOption from '../../src/frontend/components/forms/conditional-checkbox-option'

describe('ConditionalCheckboxes', () => {
    test('renders without errors', async () => {
        await act(async () => {
            render(
                <ConditionalCheckboxes
                    dbLabel="test"
                    setFormData={jest.fn()}
                    enableSingleSelect={false}
                    data={null}
                    children={[]}
                />
            )
        })
    })

    test('renders with children', async () => {
        await act(async () => {
            render(
                <ConditionalCheckboxes
                    dbLabel="test"
                    setFormData={jest.fn()}
                    enableSingleSelect={false}
                    data={null}
                    children={[
                        <ConditionalCheckboxOption
                            key={1}
                            disabled={false}
                            checked={false}
                            setChecked={jest.fn()}
                            label="Test1"
                        />,
                        <ConditionalCheckboxOption
                            key={2}
                            disabled={false}
                            checked={false}
                            setChecked={jest.fn()}
                            label="Test2"
                        />,
                    ]}
                />
            )
        })

        expect(
            document.querySelector('input[type="checkbox"]')
        ).toBeInTheDocument()
    })
})
