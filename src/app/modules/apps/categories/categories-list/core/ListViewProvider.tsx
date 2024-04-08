import { FC, createContext, useContext, useMemo, useState } from 'react';
import {
  ID,
  ListViewContextProps,
  WithChildren,
  calculateIsAllDataSelected,
  calculatedGroupingIsDisabled,
  groupingOnSelect,
  groupingOnSelectAll,
  initialListView
} from '../../../../../../_duhope/helpers';
import { useQueryResponse, useQueryResponseData } from './QueryResponseProvider';

const ListViewContext = createContext<ListViewContextProps>(initialListView);

const ListViewProvider: FC<WithChildren> = ({ children }) => {
  const [selected, setSelected] = useState<Array<ID>>(initialListView.selected);
  const [item_for_delete, set_item_for_delete] = useState<ID>(initialListView.item_for_delete);
  const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate);
  const [itemIdForActivate, setItemIdForActivate] = useState<ID>(initialListView.itemIdForActivate);
  const { isLoading } = useQueryResponse();
  const data = useQueryResponseData();
  const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data]);
  const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected]);
  const [itemIdForAddProduct, setItemIdForAddProduct] = useState<ID>(initialListView.itemIdForAddProduct);
  const [itemToRemove, setItemToRemove] = useState<ID>(initialListView.itemToRemove);

  return (
    <ListViewContext.Provider
      value={{
        selected,
        itemIdForUpdate,
        setItemIdForUpdate,
        itemIdForActivate,
        setItemIdForActivate,
        item_for_delete,
        itemToRemove,
        setItemToRemove,
        itemIdForAddProduct,
        set_item_for_delete,
        disabled,
        setItemIdForAddProduct,
        isAllSelected,
        onSelect: (id: ID) => {
          groupingOnSelect(id, selected, setSelected);
        },
        onSelectAll: () => {
          groupingOnSelectAll(isAllSelected, setSelected, data);
        },
        clearSelected: () => {
          setSelected([]);
        }
      }}
    >
      {children}
    </ListViewContext.Provider>
  );
};

const useListView = () => useContext(ListViewContext);

export { ListViewProvider, useListView };
