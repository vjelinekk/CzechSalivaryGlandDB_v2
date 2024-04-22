import { describe, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import FiltrationCheckbox from "../../src/frontend/components/filtration-checkbox";
import { FormType } from "../../src/frontend/constants"

describe('FiltrationCheckbox component', () => {
    test('should render form_type filter checkbox correctly', () => {
        const setFilteredColumnsMock = jest.fn();
        const filteredColumns = {
            form_type: [],
            histopatologie_vysledek: [],
            typ_terapie: [],
        }

        render(
            <FiltrationCheckbox 
                label="Podčelistní"
                dbValue={FormType.podcelistni}
                filterLabel="form_type"
                filteredColumns={filteredColumns}
                setFilteredColumns={setFilteredColumnsMock}
            />
        )

        expect(screen.getByText('Podčelistní')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Podčelistní'));
        expect(setFilteredColumnsMock).toBeCalled();
        expect(setFilteredColumnsMock).toBeCalledWith({
            form_type: [FormType.podcelistni],
            histopatologie_vysledek: [],
            typ_terapie: [],
        })
    })
})