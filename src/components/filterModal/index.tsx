import React from 'react'

import FilterItem from '../filterItem';

import { Container } from './styles'

interface IFilterModalProps {
    isOpen: boolean;
    filterConfigs: {
        label: string;
        objectKey: string;
        type: string;
    }[]
    setFilter: React.Dispatch<React.SetStateAction<{}>>;
}

const FilterModal: React.FC<IFilterModalProps> = ({ isOpen, filterConfigs, setFilter }) => {

    return (
        <Container className={`${isOpen ? 'isOpen' : ''}`} >
            {
                filterConfigs.map(item => (
                    <FilterItem
                        key={item.objectKey}
                        setFilter={setFilter}
                        {...item}
                    />
                ))
            }
        </Container>
    )
}

export default FilterModal