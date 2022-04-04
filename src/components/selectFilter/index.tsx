import React, { useCallback } from 'react'
import ReactSelect from 'react-select';
import AsyncReactSelect from 'react-select/async'

interface ISelectFilterProps {
    items: any;
    setFilter: React.Dispatch<React.SetStateAction<{}>>;
    objectKey: string;
    placeHolder: string;
    isAsync?: boolean;
}

const SelectFilter: React.FC<ISelectFilterProps> = ({ items, setFilter, objectKey, placeHolder, isAsync }) => {

    const onChangeSelectHandler = useCallback((value: string) => {
        return setFilter(prevState => ({ ...prevState, [objectKey]: value }))
    }, [objectKey, setFilter])

    return (
        isAsync ?
            <AsyncReactSelect
                cacheOptions
                defaultOptions
                loadOptions={items}
                placeholder={placeHolder}
                onChange={(event: any) => onChangeSelectHandler(event.value)}
                isSearchable={false}
            />
            :
            <ReactSelect
                options={items}
                onChange={(event: any) => onChangeSelectHandler(event.value)}
                placeholder={placeHolder}
                isSearchable={false}
            />
    )
}

export default SelectFilter