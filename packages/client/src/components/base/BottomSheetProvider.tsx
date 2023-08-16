import useBottomSheetStore from '~/stores/useBottomSheetStore';

import BottomSheet from './BottomSheet';

const BottomSheetProvider = () => {
  const { visible, closeBottomSheet, items } = useBottomSheetStore();

  return (
    <BottomSheet visible={visible} onCancel={closeBottomSheet} items={items} />
  );
};

export default BottomSheetProvider;
