import React from 'react'
import Filter from '../filter';
import SelectFilter from '../selectFilter';

import { Container } from './styles'

interface ISettingsFiltersProps {
    filterConfigs: {
        label: string;
        objectKey: any;
        type: string;
        min?: number;
        max?: number;
    }[]
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    setFilter: React.Dispatch<React.SetStateAction<{}>>;
    itemsOrderBy: any;
    objectKeyOrderBy: string;
    placeHolderOrderBy: string;
    itemsCategories: any;
    objectKeyCategories: string;
    placeHolderCategories: string;
}

const SettingsFilters: React.FC<ISettingsFiltersProps> = ({
    filterConfigs,
    isOpen,
    itemsCategories,
    itemsOrderBy,
    objectKeyCategories,
    objectKeyOrderBy,
    onClose,
    onOpen,
    placeHolderCategories,
    placeHolderOrderBy,
    setFilter
}) => (
    <Container>
        <SelectFilter
            items={itemsCategories}
            objectKey={objectKeyCategories}
            placeHolder={placeHolderCategories}
            setFilter={setFilter}
            isAsync
        />
        <Filter
            filterConfigs={filterConfigs}
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            setFilter={setFilter}
        />
        <SelectFilter
            items={itemsOrderBy}
            objectKey={objectKeyOrderBy}
            placeHolder={placeHolderOrderBy}
            setFilter={setFilter}
        />
    </Container>
)


export default SettingsFilters