import React, { useCallback } from 'react'

import FilterItem from '../filterItem';

import { Container, Content, Footer } from './styles'

interface IFilterModalProps {
    isOpen: boolean;
    filterConfigs: {
        label: string;
        objectKey: any;
        type: string;
        min?: number;
        max?: number;
    }[]
    setFilter: React.Dispatch<React.SetStateAction<{}>>;
}

const FilterModal: React.FC<IFilterModalProps> = ({ isOpen, filterConfigs, setFilter }) => {

    const onReloadPageHandler = useCallback(() => {
        window.location.reload()
    }, [])

    return (
        <Container className={`${isOpen ? 'isOpen' : ''}`} >
            <Content>
                {
                    filterConfigs.map(item => (
                        <FilterItem
                            key={item.label}
                            setFilter={setFilter}
                            {...item}
                        />
                    ))
                }
            </Content>
            <Footer> <button onClick={onReloadPageHandler}> Limpar filtros </button> </Footer>
        </Container>
    )
}

export default FilterModal