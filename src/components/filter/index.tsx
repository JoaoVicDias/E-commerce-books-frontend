import React from 'react'
import { MdArrowDropDown } from 'react-icons/md'

import FilterModal from '../filterModal'

import { Container, FilterButton } from './styles'


interface IFilterProps {
    filterConfigs: {
        label: string;
        objectKey: string;
        type: string;
    }[]
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    setFilter: React.Dispatch<React.SetStateAction<{}>>;
}

const Filter: React.FC<IFilterProps> = ({ 
    filterConfigs, 
    isOpen, 
    onClose, 
    onOpen, 
    setFilter, 
}) => {

    return (
        <Container onMouseOver={onOpen} onMouseOut={onClose}>
            <FilterButton isOpen={isOpen}>
                Filtrar <MdArrowDropDown />
            </FilterButton>
            <FilterModal
                filterConfigs={filterConfigs}
                isOpen={isOpen}
                setFilter={setFilter}
            />
        </Container>
    )
}

export default Filter