import BottomSheet from './BottomSheet';
import useBottomSheetStore from '~/stores/useBottomSheetStore';

const BottomSheetProvider = () => {
  const { visible, onCancel, items } = useBottomSheetStore();

  return <BottomSheet visible={visible} onCancel={onCancel} items={items} />;
};

export default BottomSheetProvider;
